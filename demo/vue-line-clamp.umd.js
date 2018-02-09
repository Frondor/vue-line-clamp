(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueLineClamp = factory());
}(this, (function () { 'use strict';

const css = 'display:block;display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis';

const truncateText = function (el, lines, needsFallback) {
  if (needsFallback) {
    let lineHeight = parseFloat(window.getComputedStyle(el).lineHeight),
    maxHeight = lineHeight * lines;
    el.style.maxHeight = maxHeight ? maxHeight+'px' : '';
    el.style.overflowX = 'hidden';
  }
  else {
    el.style.webkitLineClamp = lines;
  }
};

const VueLineClamp = {
  install (Vue, options) {
    options = Object.assign({
      importCss: null
    }, options);

    if (options.importCss === true) {
      let stylesheet = window.document.styleSheets[0],
        rule = `.vue-line-clamp{${css}}`;
      if (stylesheet && stylesheet.insertRule) {
        stylesheets.insertRule(rule);
      } else {
        let link = window.document.createElement('style');
        link.id = 'vue-line-clamp';
        link.appendChild(window.document.createTextNode(rule));
        window.document.head.appendChild(link);
      }
    }

    let needsFallback = 'webkitLineClamp' in document.body.style ? false : true;
    Vue.directive('line-clamp', {
      bind (el) {
        if (!options.importCss) {
          el.style.cssText += css;
        }
        else {
          el.classList.add('vue-line-clamp');
        }

      },
      inserted (el, bindings) {
        truncateText(el, bindings.value, needsFallback);
      },
      updated (el, bindings) {
        truncateText(el, bindings.value, needsFallback);
      }
    });
  }
};

return VueLineClamp;

})));
