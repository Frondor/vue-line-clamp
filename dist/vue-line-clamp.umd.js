(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueLineClamp = factory());
}(this, (function () { 'use strict';

var currentValueProp = "vLineClampValue";

function defaultFallbackFunc(el, bindings, lines) {
  if (lines) {
    var lineHeight = parseInt(bindings.arg);
    if (isNaN(lineHeight)) {
      console.warn("line-height argument for vue-line-clamp must be a number (of pixels), falling back to 16px");
      lineHeight = 16;
    }

    var maxHeight = lineHeight * lines;

    el.style.maxHeight = maxHeight ? maxHeight + "px" : "";
    el.style.overflowX = "hidden";
    el.style.lineHeight = lineHeight + "px"; // to ensure consistency
  } else {
    el.style.maxHeight = el.style.overflowX = "";
  }
}

var truncateText = function truncateText(el, bindings, useFallbackFunc) {
  var lines = parseInt(bindings.value);
  if (isNaN(lines)) {
    console.error("Parameter for vue-line-clamp must be a number");
    return;
  } else if (lines !== el[currentValueProp]) {
    el[currentValueProp] = lines;

    if (useFallbackFunc) {
      useFallbackFunc(el, bindings, lines);
    } else {
      el.style.webkitLineClamp = lines ? lines : "";
    }
  }
};

var VueLineClamp = {
  install: function install(Vue, options) {
    options = Object.assign({ importCss: false, textOverflow: "ellipsis" }, options);
    var styles = "display:block;display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden;text-overflow:" + options.textOverflow;

    if (options.importCss) {
      var stylesheets = window.document.styleSheets,
          rule = ".vue-line-clamp{" + styles + "}";
      if (stylesheets && stylesheets[0] && stylesheets.insertRule) {
        stylesheets.insertRule(rule);
      } else {
        var link = window.document.createElement("style");
        link.id = "vue-line-clamp";
        link.appendChild(window.document.createTextNode(rule));
        window.document.head.appendChild(link);
      }
    }

    var useFallbackFunc = "webkitLineClamp" in document.body.style ? undefined : options.fallbackFunc || defaultFallbackFunc;

    Vue.directive("line-clamp", {
      currentValue: 0,
      bind: function bind(el) {
        if (!options.importCss) {
          el.style.cssText += styles;
        } else {
          el.classList.add("vue-line-clamp");
        }
      },

      inserted: function inserted(el, bindings) {
        return truncateText(el, bindings, useFallbackFunc);
      },
      updated: function updated(el, bindings) {
        return truncateText(el, bindings, useFallbackFunc);
      },
      componentUpdated: function componentUpdated(el, bindings) {
        return truncateText(el, bindings, useFallbackFunc);
      }
    });
  }
};

return VueLineClamp;

})));
