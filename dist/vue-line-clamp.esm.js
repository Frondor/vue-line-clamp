const currentValueProp = "vLineClampValue";

function defaultFallbackFunc(el, bindings, lines) {
  if (lines) {
    let lineHeight = parseInt(bindings.arg);
    if (isNaN(lineHeight)) {
      console.warn(
        "line-height argument for vue-line-clamp must be a number (of pixels), falling back to 16px"
      );
      lineHeight = 16;
    }

    let maxHeight = lineHeight * lines;

    el.style.maxHeight = maxHeight ? maxHeight + "px" : "";
    el.style.overflowX = "hidden";
    el.style.lineHeight = lineHeight + "px"; // to ensure consistency
  } else {
    el.style.maxHeight = el.style.overflowX = "";
  }
}

const truncateText = function(el, bindings, useFallbackFunc) {
  let lines = parseInt(bindings.value);
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

const VueLineClamp = {
  install(Vue, options) {
    options = Object.assign(
      { importCss: false, textOverflow: "ellipsis" },
      options
    );
    const styles =
      "display:block;display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden;text-overflow:" +
      options.textOverflow;

    if (options.importCss) {
      const stylesheets = window.document.styleSheets,
        rule = `.vue-line-clamp{${styles}}`;
      if (stylesheets && stylesheets[0] && stylesheets.insertRule) {
        stylesheets.insertRule(rule);
      } else {
        let link = window.document.createElement("style");
        link.id = "vue-line-clamp";
        link.appendChild(window.document.createTextNode(rule));
        window.document.head.appendChild(link);
      }
    }

    const useFallbackFunc =
      "webkitLineClamp" in document.body.style
        ? undefined
        : options.fallbackFunc || defaultFallbackFunc;

    Vue.directive("line-clamp", {
      currentValue: 0,
      bind(el) {
        if (!options.importCss) {
          el.style.cssText += styles;
        } else {
          el.classList.add("vue-line-clamp");
        }
      },
      inserted: (el, bindings) => truncateText(el, bindings, useFallbackFunc),
      updated: (el, bindings) => truncateText(el, bindings, useFallbackFunc),
      componentUpdated: (el, bindings) =>
        truncateText(el, bindings, useFallbackFunc)
    });
  }
};

export default VueLineClamp;
