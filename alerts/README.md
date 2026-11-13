# Email alerts

Per-firm alert emails ("Alert me" on firm pages) go out through Kit from GitHub Actions (`.github/workflows/email-alerts.yml`), after each push to main that changes `public/news/` or `public/firms/`.

- Switch: sending happens only while `alerts/alerts-send.on` exists. Without it the job does a dry run.
- Key: the repo secret `KIT_API_KEY` (Settings > Secrets and variables > Actions).
- `alerts-state.json` records what was already sent; the job commits it back after a send.
- Before switching on after a long pause: `python3 alerts/alerts_send.py public --mark-seen` and commit the state, so old items never send.
- Manual run: Actions > Email alerts > Run workflow.
