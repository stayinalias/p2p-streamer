// Site configuration. Edit this file and commit — no build step needed.
//
// backendUrl: the public URL of your deployed server.mjs (see the main README).
//   - Leave it "" to default to Browser P2P mode (works standalone on GitHub Pages,
//     but only reaches WebRTC peers, i.e. WebTorrent-seeded torrents).
//   - Set it to your backend to enable full magnet streaming of any swarm, e.g.
//       backendUrl: "https://p2p-streamer.onrender.com"
//     The backend must send CORS headers (server.mjs already does) and should set
//     ALLOW_ORIGIN to your Pages URL in production.
window.SITE_CONFIG = {
  backendUrl: ""
};
