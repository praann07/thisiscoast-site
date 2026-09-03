# Coast — marketing site

Static site for [coastnow.in](https://coastnow.in). Served by GitHub Pages
(Settings → Pages → Deploy from a branch → `main` / root).

- `index.html` — landing page (self-contained: inline CSS/JS, Google Fonts)
- `privacy-policy.html`, `terms-of-service.html`, `delete-account.html` — legal pages (Play Store requires the URLs)
- `js/config.js` — Supabase URL + anon (publishable) key for the waitlist form. Public by design; RLS protects the data.
- `CNAME` — custom domain

Local preview: `node serve.js` then open http://localhost:3000

Source of truth for page content is this repo. The main app lives in a separate private repo.
