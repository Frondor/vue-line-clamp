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
<p v-line-clamp:20="2">Some long text that needs to be truncated to a fixed number, which is 2 in this case. And if the browser doesn't support `-webkit-line-clamp`, then a line-height of 20px is going to be used in order to truncate this text, thus calculating its max-height.</p>
```
**NOTE:** the argument passed to the directive must be a number, and its used as the `line-height` value for non-webkit browsers, as part of the fallback method.
In some upcoming version it may be able to detect this value automatically.

### Plugin options

| property  | type  | default  | description |
| --- | --- | --- | --- |
| importCss  | Boolean | false  | Set to `true` in order to import styles into `<head>` automatically, element.style is used by default


### Caveats

Probably there may be problems when loading custom fonts. I've done some tests and couldn't detect any inconsistence so far, so feel free to open an issue and provide code to reproduce any bug or glitch you find.

### Changelog

**v1.2** - Lines parameter passed to `v-line-clamp` is now reactive.
