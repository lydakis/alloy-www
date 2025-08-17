Alloy Website
================

Static promotional site for the Alloy Python library.

Local preview
- Open `index.html` directly in a browser. No build step.

Deploy to Vercel
- Connect this repository in Vercel and choose “Framework Preset: Other”.
- Build command: none (leave empty). Output directory: `.` (the project root).
- Add a custom domain (e.g., `alloy.fyi`) if desired.

Notes
- `index.html` is fully self-contained (inline CSS, no dependencies).
- GitHub stars are fetched client-side (best-effort; not required).
- Open Graph image is set to `https://alloy.fyi/og.png`; update to your domain or add an image at `/og.png` after the domain is configured.

