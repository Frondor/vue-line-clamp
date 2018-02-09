## Vue Line Clamp

A simple, fast and lightweight directive for truncating multi line texts using "cross-browser" CSS strategies.

### Demo: https://codepen.io/Frondor/pen/ypvPEQ

### Install

```bash
npm install --save vue-line-clamp
```

```javascript
import Vue       from 'vue'
import lineClamp from 'vue-line-clamp'

Vue.use(lineClamp, {
  // plugin options
})
```

### Usage

```html
<p v-line-clamp="2">Some long text with multiple lines that needs to be truncated to a fixed number, which is 2 in this case.</p>
```

### Plugin options

| property  | type  | default  | description |
| --- | --- | --- | --- |
| includeCss  | Boolean | true  | Set to false if you're providing your own style, or just importing it from within your style bundler or pre-processor



### Caveats

Probably there may be problems when loading custom fonts. I've done some tests and couldn't detect any inconsistence so far, so feel free to open an issue and provide code to reproduce any bug or glitch you find.
