# bruingames

Daily puzzle games for Bruins. Three games, one person per game.

| Game | URL | Owner |
|---|---|---|
| Home Page | `/home` | Anastasia |
| Undercovel | `/undercovel` | Carter |
| UCLA Weaver | `/uclaweaver` | Adhit |
| Bruindle | `/bruindle` | Lucy |

## Rules for everyone

1. **Stay in your folder** (`src/games/<your-game>/`). See [docs/ROLES.md](docs/ROLES.md).
2. **Never push to `main`.** Make a branch and open a Pull Request. See [docs/GIT.md](docs/GIT.md).
3. **Never commit `.env`.** It holds secret keys.
4. **Answers stay on the server.** If players could see it and cheat with it, it goes in an API route.

## Getting started

You need [Node.js](https://nodejs.org) installed. Check with `node -v`.

```bash
npm install            # download the project's packages into node_modules/
cp .env.example .env   # make your own secrets file, then ask a lead for the values
npm run dev            # start the site at http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Runs the site locally. It auto-reloads when you save a file. |
| `npm run build` | Builds the site the way Vercel will. Run this before opening a PR. |
| `npm run typecheck` | Checks for TypeScript mistakes without building. |

## How the project is organized

```
bruingames/
├── .github/CODEOWNERS     who reviews which folder
├── .env.example           list of secret keys you need (no real values)
├── docs/                  ROLES.md (who owns what), GIT.md (how to branch + PR)
├── supabase/migrations/   database tables (leads only)
├── public/                images, sounds, icons. Served as-is.
└── src/
    ├── home/              the site homepage (not a game)
    ├── games/             ⭐ YOUR CODE. One folder per person.
    │   ├── undercovel-/   Carter (URL: /undercovel)
    │   │   ├── frontend/  what players see
    │   │   └── backend/   secret stuff (answers, saving data)
    │   ├── uclaweaver/    Adhit   (same frontend/ + backend/ inside)
    │   └── bruindle/      Lucy    (same frontend/ + backend/ inside)
    ├── app/               connectors: one line each, links a URL to its page or game code. Don't edit.
    └── shared/            Header, Footer, GameBar, Supabase, etc. Import it, don't edit it.
```

The site homepage lives in `src/home/`; `src/app/page.tsx` connects it to `/`.

### Frontend vs. backend

| Folder | Runs in... | Put here... |
|---|---|---|
| `src/games/<game>/frontend/` | the player's browser | anything on screen, plus clicks and typing |
| `src/games/<game>/backend/` | our server only | anything players could cheat with, or that saves data |

The frontend never imports backend files. It **asks** the backend using `fetch`:

```
Player types a guess  →  bruindle/frontend/Board.tsx
                      →  fetch("/api/wordle/guess")
                      →  bruindle/backend/guess.ts   (compares it to the secret answer)
                      →  sends back green / yellow / gray  →  Board shows the colors
```

### What's `src/app/`?

Next.js only finds pages inside `src/app/`, and it uses **folder names as URLs**:
`src/app/bruindle/page.tsx` becomes `/bruindle`. Each file there is a one-line **connector**
pointing to the homepage or a game folder, so you never need to touch it. The full list is in [docs/ROLES.md](docs/ROLES.md).

## Tech stack

| Tool | What it's for |
|---|---|
| **TypeScript** | JavaScript with types. It catches mistakes before you run the code. |
| **Next.js** | The framework: pages, routing and API routes in one project. |
| **CSS** | Styling. Site-wide styles in `src/app/globals.css`; game styles in your game folder. |
| **GLSL / WGSL** | Shader languages for GPU graphics effects (Undercovel). |
| **Supabase** | Postgres database + logins. Stores profiles, plays and pins. |
| **Upstash Redis** | Very fast counters (e.g. how many people gave each answer). |
| **Vercel** | Hosts the site. Every PR gets its own preview link automatically. |
| **Figma** | Designs. Build what's in Figma. |
