# SVG pattern creator

Create SVGs from a handful of patterns and transformations.

## quick rundown

- The application is hosted at https://josho.dev/svg-patterns.
- The patterns are implemented using [SVG pattern elements](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Patterns).
- The SVGs have a viewBox of `0 0 1 1`. In other words, the aspect ratio is 1/1.
- The SVGs are intended to be used as backgrounds so `width` and `height` are not specified. If you need to limit the size of the SVG, you can always add explicit dimensions after copying it.
- The SVGs are copied to your system clipboard. The easiest way to view one is to create a new file say `background.svg` and paste the contents of the clipboard into the new file, save it, and then view it with an application that can display SVG files like your browser or IDE. You may need to download an extension for your IDE to view SVGs.

```console
firefox background.svg
```

- You can create your own patterns. The coordinate system for a pattern square ranges from `(0, 0)` in the top-left corner to `(1, 1)` in the bottom-right. You can draw outside these limits but the pattern will be clipped.
- This is a work-in-progress. If you have suggestions, please open a github issue.

![polkadots pattern](./static/examples/polkadots.svg)
![waves pattern](./static/examples/waves.svg)
