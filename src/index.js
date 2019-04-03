const currentValueProp = 'vLineClampValue';

function defaultFallbackFunc(el, bindings) {
  let lines = parseInt(bindings.value);
  if (lines) {
    let lineHeight = parseInt(bindings.arg);
    if (isNaN(lineHeight)) {
      console.warn(
        'line-height argument for vue-line-clamp must be a number (of pixels), falling back to 16px'
      );
      lineHeight = 16;
    }

    let maxHeight = lineHeight * lines;

    el.style.maxHeight = maxHeight ? maxHeight + 'px' : '';
    el.style.overflowX = 'hidden';
    el.style.lineHeight = lineHeight + 'px'; // to ensure consistency
  } else {
    el.style.maxHeight = el.style.overflowX = '';
  }
}

const truncateText = function(el, bindings) {
  let lines = parseInt(bindings.value);
  if (isNaN(lines)) {
    console.error('Parameter for vue-line-clamp must be a number');
    return;
  } else if (lines !== el[currentValueProp]) {
    el[currentValueProp] = lines;
    el.style.webkitLineClamp = lines ? lines : '';
  }
};

const VueLineClamp = {
  install(Vue, options) {
    options = Object.assign(
      { importCss: false, textOverflow: 'ellipsis', wordBreak: 'break-word' },
      options
    );

    const styles = `
      display: block;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      word-break: ${options.wordBreak};
      text-overflow: ${options.textOverflow};
    `;

    if (options.importCss) {
      const stylesheets = window.document.styleSheets,
        rule = `.vue-line-clamp{${styles}}`;
      if (stylesheets && stylesheets[0] && stylesheets.insertRule) {
        stylesheets.insertRule(rule);
      } else {
        let link = window.document.createElement('style');
        link.id = 'vue-line-clamp';
        link.appendChild(window.document.createTextNode(rule));
        window.document.head.appendChild(link);
      }
    }

    const clampFunction =
      'webkitLineClamp' in document.body.style
        ? truncateText
        : options.fallbackFunc || defaultFallbackFunc;

    Vue.directive('line-clamp', {
      currentValue: 0,
      bind(el) {
        if (!options.importCss) {
          el.style.cssText += styles;
        } else {
          el.classList.add('vue-line-clamp');
        }
      },
      inserted: (el, bindings) => clampFunction(el, bindings),
      updated: (el, bindings) => clampFunction(el, bindings),
      componentUpdated: (el, bindings) =>
        clampFunction(el, bindings),
    });
  },
};

export default VueLineClamp;
