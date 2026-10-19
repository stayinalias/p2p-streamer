# P2P Streamer — simplest GitHub Pages setup

Two files, both at the repo root. No hidden folders, no build step, no Actions.

## Publish it (no git needed)

1. Create a **public** repo on GitHub.
2. Repo page → **Add file → Upload files** → drag in `index.html` and `config.js` → **Commit**.
3. Repo → **Settings → Pages** → **Build and deployment** → **Source: Deploy from a branch**
   → Branch: **main**, Folder: **/ (root)** → **Save**.
4. Wait ~1 minute, then open:

   `https://<your-username>.github.io/<repo-name>/`

You should see the player. It works immediately in **Browser P2P** mode (try the Creative-Commons
sample films).

Ignore the "There are no verified domains" message on the Pages page — it's unrelated and optional.

## Optional: stream any magnet link

Browser-only mode can't reach normal torrent seeders (browsers can't open TCP sockets). To stream
arbitrary magnets you need the Node backend (`server.mjs`) deployed to a host that runs Node —
Render, Railway, Fly.io or a VPS. Then set its URL in `config.js`:

```js
window.SITE_CONFIG = { backendUrl: "https://your-backend.onrender.com" };
```

## Notes

- Use only content you have the right to stream. Unlicensed streaming of copyrighted films is
  illegal in India under the Copyright Act.
- MKV files won't play in most browsers — pick an MP4 (H.264) or WebM.
