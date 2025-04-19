/**
 * Performance optimization utilities
 * This file contains functions to optimize application performance
 */

/**
 * Initializes performance optimizations
 * This should be called once at application startup
 */
export const initPerformanceOptimizations = () => {
  // Disable React DevTools in production
  if (process.env.NODE_ENV === 'production') {
    if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
      for (let key in window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
        window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] = typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] === 'function' 
          ? () => {} 
          : null;
      }
    }
  }
  
  // Add passive event listeners for better scroll performance
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: function() {
        // Signal browser that we'll be using passive events
        window.__SUPPORTS_PASSIVE = true;
        return true;
      }
    });
    window.addEventListener('test', null, opts);
    window.removeEventListener('test', null, opts);
  } catch (e) {}
  
  // Optimize requestAnimationFrame
  window.requestAnimationFrame = window.requestAnimationFrame || 
                                window.webkitRequestAnimationFrame || 
                                window.mozRequestAnimationFrame;
                                
  // Add FastClick to eliminate 300ms tap delay on mobile
  if ('ontouchstart' in document.documentElement) {
    document.body.style.touchAction = 'manipulation';
  }
  
  // Debounce window resize events
  let resizeTimeout;
  const originalAddEventListener = window.addEventListener;
  
  window.addEventListener = function(type, fn, options) {
    if (type === 'resize') {
      const debouncedFn = function(event) {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          fn(event);
        }, 100);
      };
      return originalAddEventListener.call(this, type, debouncedFn, options);
    }
    return originalAddEventListener.call(this, type, fn, options);
  };
  
  // Set initial opacity and avoid layout thrashing
  document.body.style.opacity = '1';
};

/**
 * Helper function to throttle function calls
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Helper function to debounce function calls
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}; 