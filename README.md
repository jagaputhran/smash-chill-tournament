# Smash & Chill Tournament

# Build a Complete Live Badminton Tournament Website — Smash & Chill



Build a production-ready, mobile-first tournament management website for **Smash & Chill Badminton Tournament**, an upcoming badminton event featuring 24 doubles teams (48 players in total).



The website must look like an international badminton tournament platform, with a premium sports aesthetic, live scores, automatic fixture management, team rankings, and a simple admin dashboard.



This is a real tournament taking place tomorrow, so prioritize reliability, ease of use, fast score entry, and a fully functional application over unnecessary animations or complexity.



## 1. Technology Stack and Architecture



Use the following architecture:



- Frontend: React + TypeScript + Vite.

- Styling: Tailwind CSS with shadcn/ui components.

- Backend and database: Supabase PostgreSQL.

- Authentication: Supabase Auth with a single authorized administrator.

- Live updates: Supabase Realtime for scores, results, standings, and match status.

- Deployment: Vercel.

- Icons: Lucide React.

- Notifications: Toast notifications for successful updates and errors.



The application must work on mobile phones, tablets, and desktop browsers.



All teams, fixtures, scores, results, and standings must be persisted in Supabase. Every visitor must see the same current tournament data.



Do not use localStorage as the primary database. Do not build a frontend-only mockup. Every button and feature must work.



## 2. Visual Design and Branding



Create a premium, international badminton tournament experience.



Brand name: **SMASH & CHILL**



Tagline: **Play Hard. Chill Harder.**



Visual direction:

- Dark charcoal and deep navy backgrounds.

- Electric lime green and vibrant yellow accents.

- White typography with strong visual hierarchy.

- Modern sports typography, bold match cards, subtle gradients, and clean spacing.

- Professional tournament scoreboard styling inspired by international sports broadcasts.

- Badminton court graphics, shuttlecock motifs, and court-line patterns.

- High-contrast score displays that can be read from a distance.

- Smooth but lightweight animations for live matches and completed games.



Avoid a generic business dashboard appearance. This should feel like an actual sports tournament website.



Use responsive layouts and large touch-friendly buttons because the administrator will operate the system courtside using a phone.



## 3. Public Website — No Login Required



Create the following public pages.



### A. Home / Tournament Dashboard



The homepage should display:



- Smash & Chill logo and tournament branding.

- Tournament date and venue, configurable by the administrator.

- Total teams: 24.

- Total players: 48.

- Matches completed.

- Matches currently live.

- Upcoming matches.

- Current tournament stage.

- A prominent live scoreboard.

- Recently completed matches.

- Latest winners and results.

- A link to the fixtures page.

- A link to the leaderboard and standings.

- An Instagram button linking to the official tournament Instagram account.



Use a prominent LIVE indicator for matches currently in progress.



Display a tournament status such as UPCOMING, LIVE, or COMPLETED.



### B. Teams and Players



Create a page showing all 24 registered teams.



Each team must contain:

- Team name.

- Player 1 name.

- Player 2 name.

- Team number or seed.

- Group, if the selected format uses groups.

- Matches played.

- Wins and losses.

- Points difference or other applicable ranking statistics.

- Current qualification status.



Provide team search and filters.



Display teams in attractive cards with team names and both players clearly visible.



### C. Fixtures and Match Schedule



Create a complete fixtures page.



Every match must display:

- Match ID.

- Round or stage.

- Team A and Team B.

- Scheduled date and time.

- Court number.

- Match status: Upcoming, Live, Completed, or Walkover.

- Current game scores.

- Winner, when applicable.



Provide filters for:

- All matches.

- Live matches.

- Upcoming matches.

- Completed matches.

- Court.

- Round or group.



Sort matches by scheduled time and allow visitors to find matches easily.



### D. Live Scoreboard



Create a dedicated live scoreboard page with a premium broadcast-style layout.



Display:

- Both team names and player names.

- Current game number.

- Points scored by each team.

- Game-by-game scores.

- Current server, if entered by the administrator.

- Match status.

- Court number.

- Winner when the match ends.



Scores must update automatically across visitors' devices using Supabase Realtime.



If real-time connectivity is interrupted, show the last successfully received score, indicate that the connection is stale, and retry synchronization. Never show unsaved scores as confirmed results.



### E. Standings and Leaderboard



Create automatically calculated standings appropriate to the selected tournament format.



For group-based tournaments, display:

- Position.

- Team.

- Matches played.

- Wins.

- Losses.

- Games won and lost.

- Points scored and conceded.

- Point difference.

- Qualification status.



Ranking and qualification rules must be configurable and deterministic. Apply the configured tie-breakers consistently, including head-to-head where applicable.



Do not invent qualification rules or silently qualify teams based only on points scored.



### F. Knockout Bracket



Create a professional visual bracket for the knockout stage.



Display quarterfinals, semifinals, finals, and third-place playoff if enabled.



Each bracket match must show team names, scores, winner, and the next-round progression.



Automatically advance a team when an eligible match is finalized. Do not create a bracket with invalid or duplicate participants.



### G. Instagram and Social Links



Include a prominent Instagram icon in the header and footer.



Use a configurable official Instagram URL. If it has not been supplied, display a placeholder configuration value and do not invent an account.



Open the Instagram link in a new tab.



Add a share button that uses the Web Share API where supported and a copy-link fallback elsewhere.



## 4. Admin Dashboard — Private and Easy to Use



Create a separate admin route: `/admin`.



The public website must remain view-only. Visitors must never see admin controls.



### Admin authentication



Use Supabase Auth with one authorized administrator.



Requirements:

- Simple email/password login.

- No public registration.

- No admin signup link.

- No hardcoded credentials in frontend code.

- Protect every admin operation using server-side authorization and Supabase Row Level Security.

- Unauthorized visitors must be unable to modify tournament data through direct API requests.

- Provide a logout button.

- Use environment variables for deployment configuration.



The login should be minimal and quick to use.



### Admin dashboard overview



After login, display:



- Total teams.

- Registered teams.

- Matches completed.

- Matches in progress.

- Matches remaining.

- Current tournament stage.

- Quick actions for entering scores, managing teams, and generating fixtures.



### Team management



Allow the administrator to:



- Create, edit, and delete teams before the tournament starts.

- Enter two player names per team.

- Import teams using CSV.

- Validate that exactly 24 teams are registered before fixture generation.

- Prevent accidental duplicate teams.

- Lock team registration once the tournament begins, with an explicit override for the administrator.



Provide a CSV template and validation errors for missing names or malformed data.



### Fixture generation



Support configurable tournament formats:



1. Group stage followed by knockout.

2. Single-elimination knockout.

3. Round-robin league.



The administrator must choose the format before generating fixtures.



For group-based tournaments, allow configuration of:

- Number of groups.

- Teams per group.

- Qualification rules.

- Number of knockout qualifiers.

- Seeding method.

- Tie-breakers.



For 24 teams, support a suggested default of six groups of four, but do not force it. Let the administrator choose and confirm the actual competition rules before generating fixtures.



Generate all required matches without duplicate pairings or missing teams. Use deterministic seeding and balanced group distribution where applicable.



Allow the administrator to assign match times and courts. If exact scheduling information is unavailable, generate the fixtures without inventing confirmed times.



Before generation, show a preview and ask for confirmation. Regenerating fixtures must never silently overwrite scores or finalized results.



### Fast score entry — highest priority



This is the most important admin feature.



Build a dedicated, mobile-friendly score-entry screen.



For each match, provide:

- Team A and Team B names.

- Large numeric score inputs.

- Game 1, Game 2, and Game 3 score entry.

- Increment and decrement buttons for fast courtside use.

- Current match status.

- Court number.

- Optional match notes.

- Save Draft button.

- Finalize Result button.



The administrator must be able to update scores in seconds.



Do not require navigating through multiple pages to enter a result.



Implement a score editor with these actions:

- Start Match.

- Update Score.

- Save Draft.

- Finalize Match.

- Reopen Match, with confirmation and an audit record.



Only finalized results should affect standings and knockout progression.



### Badminton scoring rules



Use rally-point badminton scoring as the default.



Default match rules:

- Best of three games.

- Each game normally played to 21 points.

- A team must win by two clear points.

- The game ends at 30 points, with the side reaching 30 winning if the score is tied at 29–29.



Make these rules configurable before the tournament begins.



Validation requirements:

- Scores cannot be negative.

- Scores must be integers.

- Do not allow impossible game-ending scores.

- A team cannot win a match without winning the required number of games.

- Do not allow a match to be finalized while incomplete.

- Do not count draft scores in standings.

- Prevent duplicate finalization and conflicting updates.

- Require explicit confirmation before publishing a final result.



Support walkovers and retirements through dedicated result types rather than fabricating normal game scores. Make the administrator enter a reason and apply explicitly configured tournament rules.



When a match is finalized, automatically calculate the winner and update the standings, match history, and next eligible knockout match.



### Results and audit history



Keep a record of:

- Previous scores.

- Updated scores.

- Administrator who made the change.

- Timestamp.

- Reason for corrections.

- Result finalization and reopening.



Require a confirmation before modifying an already finalized result. Recalculate dependent standings and knockout progression transactionally.



## 5. Tournament Data Model



Design a proper relational database.



Suggested tables:



- `profiles`: authorized administrators and roles.

- `tournaments`: tournament metadata and scoring configuration.

- `teams`: team names, seeds, and registration status.

- `players`: two players associated with each team.

- `groups`: group definitions, when applicable.

- `matches`: participants, stage, court, scheduled time, and status.

- `game_scores`: game-by-game scores.

- `standings`: calculated standings or a database view derived from finalized results.

- `audit_logs`: score corrections and administrative actions.



Use foreign keys, unique constraints, transactions, indexes, and appropriate database constraints.



The database must enforce authorization through Row Level Security. Never rely only on hiding admin buttons in React.



Store score updates atomically. Use a database transaction or a secure database function for finalizing matches, updating standings, and advancing the bracket.



Prevent concurrent updates from overwriting each other silently.



## 6. Reliability and Deployment



Prepare the application for deployment to Vercel.



Requirements:

- Include a working Vite production build.

- Configure SPA routing correctly for Vercel.

- Use Supabase environment variables.

- Provide a complete `.env.example` without real secrets.

- Include SQL migrations for all database tables, constraints, functions, policies, and indexes.

- Document how to create the Supabase project, apply migrations, configure the administrator, and deploy to Vercel.

- Ensure the production build does not depend on local development files.

- Provide useful error messages and loading states.

- Include an empty state when no matches or results exist.

- Add a last-updated timestamp to the public scoreboard.

- Ensure the site remains readable on low-resolution phones and unstable mobile networks.



Use optimistic updates only when rollback is handled correctly. Never report a score as saved if the database operation failed.



Do not expose the Supabase service-role key to the browser.



## 7. Sample Data and Initial Setup



Provide a one-time setup wizard for the administrator.



The wizard should guide the administrator through:

1. Creating the tournament.

2. Entering the tournament date and venue.

3. Configuring the official Instagram URL.

4. Registering or importing 24 teams.

5. Selecting the tournament format.

6. Configuring scoring rules.

7. Generating and previewing fixtures.

8. Confirming the tournament is ready to start.



Include optional demo data for testing, but ensure demo data can be removed before production. Do not mix demo results with real tournament results.



## 8. Quality and Acceptance Criteria



Before considering the application complete, verify the following:



- The public website works without authentication.

- The admin dashboard requires authentication.

- Unauthorized users cannot update scores through direct API calls.

- All 24 teams can be registered and displayed.

- Fixture generation creates the correct number of matches for the chosen format.

- Valid scores can be entered and saved from a phone.

- Invalid scores cannot be finalized.

- A completed match produces the correct winner.

- Standings and qualification update correctly.

- Knockout winners advance to the correct next-round slots.

- Live updates appear on other devices without manual refresh.

- Refreshing the page does not lose saved data.

- Editing a finalized result triggers confirmation and preserves audit history.

- Vercel production builds and routes work correctly.

- The application has no nonfunctional placeholder buttons or mocked production data.



## Final Instruction



Build the complete working application, not just a design prototype.



Prioritize the score-entry workflow, database correctness, authorization, and live scoreboard. Make the website visually polished but operationally simple enough for one person to manage the entire 24-team tournament from a mobile phone.



First create the complete application structure and database schema. Then implement authentication, team management, fixture generation, scoring, standings, live updates, and the public pages. Test the critical tournament workflows before presenting the result.



If any external configuration is missing, clearly identify it and provide the exact setup steps rather than pretending the feature is operational.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1c8e2f83-3ea3-45d9-b864-8861c7ff3e3e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
