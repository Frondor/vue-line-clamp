const truncateText = function (el, lines, needsFallback) {
  if (needsFallback) {
    let lineHeight = parseFloat(window.getComputedStyle(el).lineHeight),
    maxHeight = lineHeight * lines
    el.style.maxHeight = maxHeight ? maxHeight+'px' : ''
    el.style.overflowX = 'hidden'
  }
  else {
    el.style.webkitLineClamp = lines
  }
}

export default const lineClamp = {
  install (Vue, options) {
    if (options.includeCss !== false) {
      window.document.styleSheets[0].insertRule(cssContent)
    }

    let needsFallback = 'webkitLineClamp' in document.body.style ? false : true

    Vue.directive('line-clamp', {
      bind (el) {
        el.classList.add('vue-line-clamp')
      },
      inserted (el, bindings) {
        truncateText(el, bindings.value, needsFallback)
      },
      updated (el, bindings) {
        truncateText(el, bindings.value, needsFallback)
      }
    })
  }
}