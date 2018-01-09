#Vue Line Clamp
### A simple, fast and lightweight directive for truncating multi line texts using "cross-browser" CSS strategies.

## Demo:

## Installation

```js
import lineClamp from 'vue-line-clamp'

Vue.use(lineClamp, {
  // plugin options
})
```

## Usage

```
<p v-line-clamp="2">Some long text with multiple lines that needs to be truncated to a fixed number, which is 2 in this case.</p>
```

### Plugin options

*includeCss* (`type: Boolean, default: true`)

Set to false if you're providing your own style, or just importing it from within your style bundler or pre-processor

### Importing styles (optional)

If you're installing it with `includeCss: false`, you may want to `import` the css file in your main entry file:

```css
@import 'vue-line-clamp/style.css'
```

### Caveats

Probably there may be problems when using custom fonts. I've done some tests and couldn't detect any inconsistence so far, so feel free to open an issue and provide code to reproduce any bug or glitch you find.