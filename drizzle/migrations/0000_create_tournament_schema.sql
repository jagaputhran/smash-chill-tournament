-- ===== Roles =====
create type public.app_role as enum ('admin');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles where user_id = _user_id and role = _role
  )
$$;

create or replace function public.claim_admin()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer;
begin
  if auth.uid() is null then
    return false;
  end if;
  select count(*) into v_count from public.user_roles where role = 'admin';
  if v_count > 0 then
    return false;
  end if;
  insert into public.user_roles (user_id, role) values (auth.uid(), 'admin');
  return true;
end;
$$;

revoke all on function public.claim_admin() from public, anon;
grant execute on function public.claim_admin() to authenticated;

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "users read own role" on public.user_roles
  for select to authenticated
  using (auth.uid() = user_id);

-- ===== updated_at helper =====
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ===== Tournaments =====
create table public.tournaments (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Smash & Chill Badminton Tournament',
  tagline text not null default 'Play Hard. Chill Harder.',
  event_date date,
  venue text,
  instagram_url text,
  status text not null default 'upcoming' check (status in ('upcoming','live','completed')),
  format text check (format in ('groups_knockout','knockout','round_robin')),
  points_to_win integer not null default 21 check (points_to_win >= 1),
  cap_points integer not null default 30 check (cap_points >= 2),
  win_by integer not null default 2 check (win_by >= 1),
  best_of integer not null default 3 check (best_of in (1,3,5)),
  expected_teams integer not null default 24 check (expected_teams >= 2),
  num_groups integer,
  qualifiers_per_group integer,
  tie_breakers jsonb not null default '["points_diff","points_for","games_diff","games_won","team_name"]'::jsonb,
  fixtures_generated boolean not null default false,
  teams_locked boolean not null default false,
  setup_complete boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ===== Groups =====
create table public.groups (
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid not null references public.tournaments(id) on delete cascade,
  name text not null,
  position integer not null,
  unique (tournament_id, name)
);

-- ===== Teams =====
create table public.teams (
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid not null references public.tournaments(id) on delete cascade,
  name text not null,
  player1 text,
  player2 text,
  seed integer,
  group_id uuid references public.groups(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index teams_unique_name on public.teams (tournament_id, lower(name));
create unique index teams_unique_seed on public.teams (tournament_id, seed) where seed is not null;
create index teams_tournament_idx on public.teams (tournament_id);

-- ===== Matches =====
create table public.matches (
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid not null references public.tournaments(id) on delete cascade,
  match_no integer not null,
  stage text not null check (stage in ('group','round_of_32','round_of_16','quarterfinal','semifinal','third_place','final')),
  stage_label text,
  group_id uuid references public.groups(id) on delete set null,
  bracket_position integer,
  team_a_id uuid references public.teams(id) on delete set null,
  team_b_id uuid references public.teams(id) on delete set null,
  next_match_id uuid references public.matches(id) on delete set null,
  next_slot text check (next_slot in ('a','b')),
  loser_next_match_id uuid references public.matches(id) on delete set null,
  loser_next_slot text check (loser_next_slot in ('a','b')),
  court integer,
  scheduled_at timestamptz,
  status text not null default 'upcoming' check (status in ('upcoming','live','completed','walkover')),
  current_game integer not null default 1,
  server_team text check (server_team in ('a','b')),
  notes text,
  result_type text check (result_type in ('normal','walkover','retirement')),
  reason text,
  winner_team_id uuid references public.teams(id) on delete set null,
  finalized_at timestamptz,
  version integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tournament_id, match_no),
  check ((next_slot is null) = (next_match_id is null)),
  check ((loser_next_slot is null) = (loser_next_match_id is null))
);
create index matches_tournament_idx on public.matches (tournament_id);
create index matches_status_idx on public.matches (tournament_id, status);
create index matches_group_idx on public.matches (group_id);
create index matches_stage_idx on public.matches (tournament_id, stage);

-- ===== Game scores =====
create table public.game_scores (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.matches(id) on delete cascade,
  game_no integer not null,
  team_a_points integer not null default 0 check (team_a_points >= 0),
  team_b_points integer not null default 0 check (team_b_points >= 0),
  updated_at timestamptz not null default now(),
  unique (match_id, game_no)
);
create index game_scores_match_idx on public.game_scores (match_id);

-- ===== Audit log =====
create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  match_id uuid references public.matches(id) on delete cascade,
  admin_id uuid,
  action text not null,
  before_state jsonb,
  after_state jsonb,
  reason text,
  created_at timestamptz not null default now()
);
create index audit_logs_match_idx on public.audit_logs (match_id);

-- ===== Triggers =====
create trigger tournaments_updated_at before update on public.tournaments
  for each row execute function public.set_updated_at();
create trigger teams_updated_at before update on public.teams
  for each row execute function public.set_updated_at();
create trigger matches_updated_at before update on public.matches
  for each row execute function public.set_updated_at();

-- ===== GRANTS =====
grant select on public.tournaments to anon, authenticated;
grant update, delete on public.tournaments to authenticated;
grant all on public.tournaments to service_role;

grant select on public.groups to anon, authenticated;
grant update, delete on public.groups to authenticated;
grant all on public.groups to service_role;

grant select on public.teams to anon, authenticated;
grant insert, update, delete on public.teams to authenticated;
grant all on public.teams to service_role;

grant select on public.matches to anon, authenticated;
grant update, delete on public.matches to authenticated;
grant all on public.matches to service_role;

grant select on public.game_scores to anon, authenticated;
grant insert, update, delete on public.game_scores to authenticated;
grant all on public.game_scores to service_role;

grant select on public.audit_logs to authenticated;
grant all on public.audit_logs to service_role;

-- ===== RLS =====
alter table public.tournaments enable row level security;
alter table public.groups enable row level security;
alter table public.teams enable row level security;
alter table public.matches enable row level security;
alter table public.game_scores enable row level security;
alter table public.audit_logs enable row level security;

create policy "public read tournaments" on public.tournaments for select to anon, authenticated using (true);
create policy "admin insert tournaments" on public.tournaments for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "admin update tournaments" on public.tournaments for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "admin delete tournaments" on public.tournaments for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

create policy "public read groups" on public.groups for select to anon, authenticated using (true);
create policy "admin write groups" on public.groups for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create policy "public read teams" on public.teams for select to anon, authenticated using (true);
create policy "admin write teams" on public.teams for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create policy "public read matches" on public.matches for select to anon, authenticated using (true);
create policy "admin write matches" on public.matches for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create policy "public read game_scores" on public.game_scores for select to anon, authenticated using (true);
create policy "admin write game_scores" on public.game_scores for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create policy "admin read audit_logs" on public.audit_logs for select to authenticated using (public.has_role(auth.uid(), 'admin'));

-- ===== Realtime =====
alter publication supabase_realtime add table public.tournaments;
alter publication supabase_realtime add table public.teams;
alter publication supabase_realtime add table public.matches;
alter publication supabase_realtime add table public.game_scores;
