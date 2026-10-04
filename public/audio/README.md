# Audio assets

Place audio assets for the site here. The national anthem player on
`/{locale}/symbols/national-anthem` expects:

```
public/audio/hymne-cherifien.mp3
```

The `Hymne Chérifien` is protected by copyright. This repository deliberately
does **not** bundle the recording — the site operator must provide a file for
which they hold the rights (or an instrumental/royalty-free rendition).

The player component (`src/components/content/audio-player.tsx`) only renders
once the file is reachable, so the anthem page works correctly with or without
the asset present.
