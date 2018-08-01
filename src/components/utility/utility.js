export function debounce(fn, delay) {
    let timer = null;
    return function () {
      let context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  }

export function compose(...funcs) {
  return arg => funcs.reduceRight((composed, f) => f(composed), arg);
}

export function isElementInViewport(el) {
  const rect = el.current.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export function httpsConverter(key, value) {
  if (key === 'img_src') {
    value = value.replace(/^http:\/\//i, 'https://');
  }
  return value;
}
