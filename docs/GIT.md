# Git & Pull Requests (beginner steps)

**The golden rule:** never work directly on `main`. Everyone has their **own dev branch**
(`carter-dev`, `anastasia-dev`, `adhit-dev`, `lucy-dev`). You always work on yours, then open a
Pull Request (PR) so someone can review it before it goes into `main`.

## The first time

```bash
git clone https://github.com/ESUC/bruin-games.git
cd bruin-games
npm install
cp .env.example .env         # then ask a lead for the values
git checkout -b lucy-dev     # make YOUR dev branch (use your own name)
npm run dev                  # open http://localhost:3000
```

## Every time you sit down to work

```bash
git checkout lucy-dev        # make sure you're on YOUR branch
git pull origin main         # bring in everyone else's latest work from main
```

## While you work (save points)

```bash
git status                   # what did I change? (check you only touched YOUR folder)
git add src/games/bruindle   # stage your folder
git commit -m "Add letter tiles to the Bruindle board"
```

Commit often, with short messages that say **what** changed.

## When you're ready for review

```bash
git push -u origin lucy-dev  # upload your branch (after the first time, just: git push)
```

Then on GitHub: click **"Compare & pull request"**, make sure it says `lucy-dev → main`,
describe what you did, and click **Create pull request**. Ask Carter or Anastasia to review it.

## If someone asks for changes

Stay on your same dev branch, make the changes, then `git add`, `git commit`, `git push` again.
The PR updates by itself. After it's merged, keep using the same dev branch: just
`git pull origin main` before you start again.

## Glossary

| Word | Meaning |
|---|---|
| **repo** | The project folder, tracked by git. |
| **commit** | A save point with a message. |
| **branch** | Your own copy of the code to work on. Yours is `<name>-dev`. |
| **push / pull** | Upload to / download from GitHub. |
| **PR** | "Please review my dev branch and merge it into main." |
| **merge conflict** | Two people changed the same lines. Ask a lead. Staying in your folder avoids most of these. |

## Never commit

- `.env` (it has secret keys). It's already in `.gitignore`.
- `node_modules/` (huge, and rebuilt by `npm install`).
