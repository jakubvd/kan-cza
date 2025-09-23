# kan-cza

Utility by VisionDevs for handling Polish typography rules in web projects. The main feature is preventing orphans ("sieroty") — single-letter words left at the end of a line.

## Features
- Replaces spaces after single-letter words (a, i, o, u, w, z) with non-breaking spaces (&nbsp;).
- Optional `data-nbsp-last="2"` attribute joins the last two words with non-breaking spaces.
- Skips `<script>`, `<style>`, `<code>`, and `<pre>` elements.
- Works on page load and with dynamically injected content via MutationObserver.

## Usage
```html
<p data-nbsp>
  To jest przykład, a oto efekt działania.
</p>

<p data-nbsp data-nbsp-last="2">
  VisionDevs zamienia pomysły w rzeczywistość
</p>

<script src="js/text.js" defer></script>
```

## Development
- `js/text.js` — main script  
- `css/` — styles  
- `fonts/` — font files (check license before publishing)

## License
MIT License — free to use and modify.