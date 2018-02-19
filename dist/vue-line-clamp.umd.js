(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueLineClamp = factory());
}(this, (function () { 'use strict';

const warn = window.console.error; // to-do use vue warn() utility instead

const css = 'display:block;display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis';
const currentValueProp = "vLineClampValue";

function defaultFallbackFunc (el, bindings, lines) {
  if(lines){
    let lineHeight = parseInt(bindings.arg);
    if (isNaN(lineHeight)) {
      warn('line-height argument for vue-line-clamp must be a number (of pixels), falling back to 16px');
      lineHeight = 16;
    }

    let maxHeight = lineHeight * lines;

    el.style.maxHeight = maxHeight ? maxHeight+'px' : '';
    el.style.overflowX = 'hidden';
    el.style.lineHeight = lineHeight+'px'; // to ensure consistency
  } else {
    el.style.maxHeight = el.style.overflowX = '';
  }
}

const VueLineClamp = {
  options: {},
  install (Vue, options) {
    this.options = Object.assign({
      importCss: false
    }, options);

    if (this.options.importCss) {
      const stylesheets = window.document.styleSheets,
        rule = `.vue-line-clamp{${css}}`;
      if (stylesheets && stylesheets[0] && stylesheets.insertRule) {
        stylesheets.insertRule(rule);
      } else {
        let link = window.document.createElement('style');
        link.id = 'vue-line-clamp';
        link.appendChild(window.document.createTextNode(rule));
        window.document.head.appendChild(link);
      }
    }

    const useFallbackFunc =
    "webkitLineClamp" in document.body.style
        ? undefined
        : this.options.fallbackFunc || defaultFallbackFunc;

    Vue.directive('line-clamp', {
      bind: (el, bindings) =>  this.applyBaseStyles(el, bindings.value),
      inserted: (el, bindings) => this.truncateText(el, bindings, useFallbackFunc),
      updated: (el, bindings) => this.truncateText(el, bindings, useFallbackFunc),
      componentUpdated: (el, bindings) => this.truncateText(el, bindings, useFallbackFunc)
    });
  },
  applyBaseStyles (el, value) {
  	if (el[currentValueProp] !== undefined) return true

    value = parseInt(value);

    if (isNaN(value)) return false

    if (!this.options.importCss) {
      el.style.cssText += css;
    }
    else {
      el.classList.add('vue-line-clamp');
    }

    // element is succesfully initialized
    this.applyLineStyles(el, value);
  },
  applyLineStyles (el, lines, useFallbackFunc) {
    if (useFallbackFunc) {
      useFallbackFunc.call(this, el, bindings, lines);
    }
    else {
      el.style.webkitLineClamp = lines ? lines : '';
    }

  	el[currentValueProp] = lines;
  },
  truncateText (el, bindings, useFallbackFunc) {
    let lines = parseInt(bindings.value);
    let elementReady = this.applyBaseStyles(el, lines);

    if (elementReady && lines !== el[currentValueProp]) {
      this.applyLineStyles(el, lines, useFallbackFunc);
    }
  }
};

return VueLineClamp;

})));
