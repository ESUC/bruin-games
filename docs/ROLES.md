# Roles

**One person, one folder. Only edit files inside your own game folder.**
If you need something changed anywhere else, ask Carter.

| Person | Game | Your folder | Stack you'll use |
|---|---|---|---|
| **Carter** (lead) | Undercovel | `src/games/undercovel-/` + `public/krillion/` | TypeScript, CSS, GLSL/WGSL, Upstash Redis |
| **Adhit** | UCLA Weaver | `src/games/uclaweaver/` | TypeScript, CSS |
| **Lucy** | Bruindle | `src/games/bruindle/` | TypeScript, CSS |
| **Carter** (lead) / **Anastasia** (lead) | Site & shared stuff | `src/home/`, `src/shared/`, `src/app/`, `supabase/`, `.github/`, config files | Next.js, Supabase, Vercel |

## Inside your folder: `frontend/` and `backend/`

```
src/games/bruindle/
├── frontend/   ← what players SEE. Runs in the browser.
│   ├── BruindlePage.tsx   the whole page
│   └── Board.tsx          pieces of the page
└── backend/    ← the secret stuff. Runs on the server only.
    ├── guess.ts           handles requests to /api/wordle/guess
    ├── check.ts           game rules
    ├── daily.ts           picks today's puzzle
    └── words.ts           the answer list (players must never see this)
```

| Put it in... | If it's... | Examples |
|---|---|---|
| `frontend/` | something on screen, or something you click or type | the board, tiles, buttons, animations |
| `backend/` | something players could cheat with, or that saves data | the answer, checking a guess, counting answers |

### How frontend and backend talk

The frontend **never imports** backend files. It **asks** the backend over the internet with `fetch`:

```ts
// in frontend/Board.tsx
const res = await fetch("/api/wordle/guess", { method: "POST", body: JSON.stringify({ guess }) });
const data = await res.json();   // the backend's answer, e.g. green/yellow/gray
```

Every backend file starts with `import "server-only"`. If a browser component (any file that
starts with `"use client"`, which is every component with buttons or typing) imports one by mistake,
the build fails with `You're importing a module that depends on "server-only"`. That's on purpose:
it keeps the answer secret. The fix is to use `fetch` instead of `import`.

## What's `src/app/` then?

Next.js only looks for pages inside `src/app/`, so those files are **connectors**: one line
that says "this URL shows that person's code." **Nobody edits them.** Carter sets them up.

| URL | Connector | Points to |
|---|---|---|
| `/` | `src/app/page.tsx` | `src/home/HomePage.tsx` |
| `/bruindle` | `src/app/bruindle/page.tsx` | `src/games/bruindle/frontend/BruindlePage.tsx` |
| `/api/wordle/guess` | `src/app/api/wordle/guess/route.ts` | `src/games/bruindle/backend/guess.ts` |
| `/uclaweaver` | `src/app/uclaweaver/page.tsx` | `src/games/uclaweaver/frontend/WeaverPage.tsx` |
| `/api/weaver/puzzle` | `src/app/api/weaver/puzzle/route.ts` | `src/games/uclaweaver/backend/puzzle.ts` |
| `/undercovel` | `src/app/undercovel/page.tsx` | `src/games/undercovel-/frontend/UndercovelPage.tsx` |
| `/undercovel-` (legacy alias) | `src/app/undercovel-/page.tsx` | `src/games/undercovel-/frontend/UndercovelPage.tsx` |
| `/api/krillion/answer` | `src/app/api/krillion/answer/route.ts` | `src/games/undercovel-/backend/answer.ts` |

Need a new URL (like a second API route)? Ask Carter to add a connector.

## Using shared code

You can **import** from `src/shared/` (e.g. `GameBar`, `dailyPick`), but don't **edit** it.
That way one game can't accidentally break another.
