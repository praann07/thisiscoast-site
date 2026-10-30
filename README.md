# Coast: marketing site

Static site for [coastapp.in](https://coastapp.in), served by GitHub Pages
(Settings → Pages → Deploy from a branch → `main` / root).

- `index.html`: home page (uses `css/site.css`, `css/home.css`, `js/home.js`)
- `privacy-policy.html`, `terms-of-service.html`, `cookie-policy.html`, `delete-account.html`: legal pages (Play Store requires these URLs)
- `fonts/`: Bricolage Grotesque, self-hosted. The site makes no third-party requests.
- `play-qr.svg`: QR code for the Play Store listing
- `CNAME`: custom domain

The waitlist was retired when the app launched on Google Play. The site no
longer talks to Supabase.

Local preview: `node serve.js`, then open http://localhost:3000

Source of truth for the site is the `website/` folder in the private app repo.
