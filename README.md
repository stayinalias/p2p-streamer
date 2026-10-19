# P2P Streamer

Stream video from a magnet link. The frontend is a static site that runs on **GitHub Pages**;
the torrent engine is a small **Node backend** you deploy anywhere that runs Node with open
outbound UDP (Render, Railway, Fly.io, a VPS).

> **Why the split?** GitHub Pages serves static files only — it cannot run Node or open the
> TCP/UDP sockets BitTorrent needs. So the site lives on Pages, and the engine lives on a
> Node host. The site's "My Server" mode talks to that engine.

## Layout

```
.
├── site/                 # the static frontend  -> GitHub Pages
│   ├── index.html
│   ├── config.js         # <-- set your backend URL here
│   └── .nojekyll
├── server/               # the torrent engine   -> Render / Railway / Fly / VPS
│   ├── server.mjs
│   └── package.json
└── .github/workflows/pages.yml   # auto-deploys site/ to Pages on push
```

---

## Part A — Put the site on GitHub Pages

### 1. Create the repo

On GitHub: **New repository** → name it (e.g. `p2p-streamer`) → **Create**.

### 2. Push these files

Unzip this folder, then from inside it:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/p2p-streamer.git
git push -u origin main
```

(No `git` handy? On the repo page use **Add file → Upload files**, drag everything in, and
commit. Keep the folder structure — `.github/`, `site/`, `server/` must stay as folders.)

### 3. Turn on Pages

Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The included workflow runs on every push and publishes the `site/` folder. After the first
run (watch it under the **Actions** tab), your site is live at:

```
https://<your-username>.github.io/p2p-streamer/
```

At this point the site works in **Browser P2P** mode — no backend needed, but it only
reaches WebRTC seeders, so most magnet links won't stream. For that, do Part B.

---

## Part B — Deploy the backend (for full magnet streaming)

Pick a host that runs Node and allows outbound UDP. Render and Railway both have free tiers.

**Render example**
1. New → **Web Service** → connect this same repo.
2. Root directory: `server`
3. Build command: `npm install`
4. Start command: `node server.mjs`
5. Environment variables:
   - `ALLOW_ORIGIN` = `https://<your-username>.github.io`  (so only your site can call it)
   - `PORT` is set by the host automatically.
6. Deploy, then note the public URL, e.g. `https://p2p-streamer.onrender.com`.

> A plain static host (Netlify, Vercel static, GitHub Pages) will **not** work for the
> backend — it needs a real Node process.

---

## Part C — Wire them together

Edit `site/config.js`:

```js
window.SITE_CONFIG = {
  backendUrl: "https://p2p-streamer.onrender.com"
};
```

Commit and push. The site now defaults to **My Server** mode and streams arbitrary magnets.

---

## Running the backend locally (optional)

```bash
cd server
npm install
npm start
# open http://localhost:8080
```

## Notes and caveats

- **Legal:** host this only for material you have the right to distribute. A site whose main
  purpose is streaming copyrighted films can be taken down, and the backend operator is the
  one actually distributing bytes — the more exposed position legally.
- **Backend cost/abuse:** a public backend spends your bandwidth and CPU on every visitor's
  stream. Add rate limiting or an allowlist before sharing the link.
- **MKV** won't play in most browsers — pick an MP4 (H.264) or WebM file.
- **Dead swarms:** if metadata never resolves, that magnet simply has no reachable seeders.
- **Free tiers sleep:** Render's free tier spins down when idle; the first request after a
  nap can take ~30s to wake.
