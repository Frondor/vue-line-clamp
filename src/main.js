export const cssContent = '.vue-line-clamp {display:block;display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis}'

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

export default {
  install (Vue, options = {}) {
    if (options.includeCss !== false) {
      let stylesheets = window.document.styleSheets[0]
      if (stylesheets) {
        stylesheets.insertRule(cssContent)
      } else {
        let link = window.document.createElement('style')
        link.appendChild(window.document.createTextNode(cssContent))
        window.document.head.appendChild(link)
      }
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