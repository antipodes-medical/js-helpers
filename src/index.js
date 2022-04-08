/**
 * Is touch device ?
 *
 * @type {boolean}
 * @formatter:off
 */
export const isTouchDevice = (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
//@formatter:on

/**
 * Return top and left offset of an element depending on a parent
 *
 * @param el
 * @param parent
 * @returns {{top: number, left: number}}
 */
export const childOffset = (el, parent) => {
  const childrenOffset = offsetOf(el),
        parentOffset   = offsetOf(parent);

  return {
    top: childrenOffset.top - parentOffset.top,
    left: childrenOffset.left - parentOffset.left
  };
};

/**
 * Add multiple events to an element
 *
 * @param element
 * @param events
 * @param handler
 */
export const addMultipleEventListener = (element, events, handler) => events.forEach(e => element.addEventListener(e, handler));

/**
 * Call callback function after a certain delay
 *
 * @param callback
 * @param delay
 * @returns {function(...[*]=)}
 */
export const debounce = (callback, delay) => {
  let timer;
  return function () {
    const args = arguments;
    const context = this;

    clearTimeout(timer);
    timer = setTimeout(() => callback.apply(context, args), delay);
  };
};

/**
 * Hide an element on click outside
 *
 * @param element
 * @param className
 */
export const hideOnClickOutside = (element, className = 'hover') => {
  const outsideClickListener = event => {
    if (!element.contains(event.target) && isVisible(element)) {
      element.classList.remove(className);
      removeClickListener();
    }
  };

  const removeClickListener = () => {
    document.removeEventListener('click', outsideClickListener);
  };

  document.addEventListener('click', outsideClickListener);
};

/**
 * Is the element visible ?
 *
 * @param elem
 * @returns {boolean}
 */
//@formatter:off
export const isVisible = elem => !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
//@formatter:on

/**
 * Avoid callback call too many time
 *
 * @param callback
 * @param delay
 * @returns {function(...[*]=)}
 */
export const throttle = (callback, delay) => {
  let last;
  let timer;

  return function () {
    const context = this;
    const now = +new Date();
    const args = arguments;

    if (last && now < last + delay) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        callback.apply(context, args);
      }, delay);
    } else {
      last = now;
      callback.apply(context, args);
    }
  };
};

/**
 * Get an array of the focusable elements
 *
 * @returns {string[]}
 */
export const getFocusableElements = () =>
  [
    'a',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ];

/**
 * Return top and left offset of an element
 *
 * @param el
 * @returns {{top: number, left: number}}
 */
export const offsetOf = el => {
  const rect = el.getBoundingClientRect();
  const bodyEl = document.body;

  return {
    top: rect.top + bodyEl.scrollTop,
    left: rect.left + bodyEl.scrollLeft
  };
};

/**
 * Unwrap an element
 *
 * @param wrapper
 */
export const unwrap = wrapper => {
  // place childNodes in document fragment
  const docFrag = document.createDocumentFragment();
  while (wrapper.firstChild) {
    const child = wrapper.removeChild(wrapper.firstChild);
    docFrag.appendChild(child);
  }

  // replace wrapper with document fragment
  wrapper.parentNode.replaceChild(docFrag, wrapper);
};

/**
 * Wrap and HTML structure around an element
 *
 * @param el
 * @param wrapper
 */
export const wrap = (el, wrapper) => {
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
};

/**
 * Returns true if the element or one of its parents has the selector
 *
 * @param target
 * @param selector
 * @returns {boolean}
 */
export const hasParentWithMatchingSelector = (target, selector) => [...document.querySelectorAll(selector)].some(el => el !== target && el.contains(target));