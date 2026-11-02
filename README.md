# propdesknews.com

Static site for Prop Desk (@PropDeskNews). Files in `public/` are served by Cloudflare Workers (static assets).

- `public/index.html`: links page (live deals, edited by hand)
- `public/firms/index.html`: prop firm directory, rebuilt every morning from the Prop Desk directory check by `build_site.py` (kept in the project files, not here)

Pushing to `main` redeploys the site.
