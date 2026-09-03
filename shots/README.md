# App screenshots

Drop real Coast screenshots here, then wire them into `index.html`.

## How to add one

In `index.html`, find the `<section class="shots">` block. Replace:

```html
<div class="shot">
  <span class="shot-word">Coast</span>
  <span class="shot-tag">Screenshot</span>
</div>
```

with:

```html
<img src="shots/map.png" alt="Coast — nearby trips on the map" loading="lazy">
```

That's the whole change — the phone frame and its styling stay.

## Image specs

- **Aspect ratio:** 9 : 19.2 (the `.phone-frame` is locked to this). A standard Android portrait screenshot (e.g. 1080 × 2340, or 1080 × 2400 lightly cropped) fits.
- **Format:** `.webp` preferred (`.png` fine). Keep each under ~200 KB.
- **Content:** use the real app screens — the map with the "Nearby now" sheet is the strongest single shot.

## Suggested filenames

`map.png` · `detail.png` · `match.png` · `rating.png` · `profile.png`

(Only `map` is referenced today. Add more phones in the section if you want a set.)
