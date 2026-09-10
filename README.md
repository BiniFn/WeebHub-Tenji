<p align="center">
  <a href="https://weebhub-pearl.vercel.app">
    <img src="assets/weebhub-logo-v2.png" alt="WeebHub logo" width="112" />
  </a>
</p>

<h1 align="center">WeebHub Tenji</h1>

<p align="center">
  Native companion client for the WeebHub media server on Android, Android TV, iOS, and tvOS.
</p>

<p align="center">
  <a href="https://github.com/BiniFn/WeebHub">WeebHub Server</a> ·
  <a href="https://github.com/BiniFn/WeebHub-Tenji/releases">Releases</a> ·
  <a href="https://github.com/BiniFn/WeebHub-Tenji">Source</a>
</p>

## About

WeebHub Tenji is the mobile and TV client in the WeebHub ecosystem. Connect it to a WeebHub server to browse a local anime and manga library, stream supported sources, use the built-in media player, read manga, and keep downloaded media available offline.

WeebHub Tenji does not provide, host, or distribute media. You are responsible for using legally obtained media and complying with local law.

## Features

- Android, Android TV, and tvOS support (iOS build coming soon)
- Built-in libmpv-backed playback and external-player handoff
- Local, torrent, debrid, and online playback sources supported by the server
- Manga reader with local/offline chapters
- Anime episode and manga chapter downloads
- Offline browsing and downloaded-media playback
- Server connection, AniList, library, and download-management screens

## Connect to WeebHub

1. Run [WeebHub](https://github.com/BiniFn/WeebHub) on your computer or use WeebHub Mobile Server on a supported device.
2. In Tenji, enter the server address, for example `http://192.168.1.10:43211`.
3. Authenticate with the credentials configured on your WeebHub server.

For a server running on the same device, use `http://127.0.0.1:43211`.

## Development

```bash
git clone https://github.com/BiniFn/WeebHub-Tenji.git
cd WeebHub-Tenji
npm install
npm test
npx tsc --noEmit
```

Use `npm run dev:start`, `npm run dev:android`, or `npm run dev:ios` for local development. Android TV and tvOS commands are listed in `package.json`.

## Credits and Fork Attribution

**Maintained and branded by BiniFn.**

WeebHub Tenji is a modified fork of [Seanime Tenji](https://github.com/5rahim/seanime-tenji), which in turn belongs to the [Seanime](https://github.com/5rahim/seanime) ecosystem created by 5rahim and contributors. The original authors retain credit for the upstream architecture, client implementation, and included upstream code. WeebHub-specific branding, integration, and changes are maintained by BiniFn.

## License

WeebHub Tenji is licensed under the [GNU General Public License v3.0](LICENSE). See [LICENSES.md](LICENSES.md) for additional attribution and third-party notices.
