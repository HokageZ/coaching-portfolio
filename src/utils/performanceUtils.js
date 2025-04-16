/**
 * Performance monitoring utilities
 */

// Batch performance updates to minimize reflows
let performanceUpdates = [];
let updateTimeout = null;

const batchPerformanceUpdate = (type, value) => {
  performanceUpdates.push({ type, value });
  
  if (!updateTimeout) {
    updateTimeout = requestAnimationFrame(() => {
      if (process.env.NODE_ENV === 'development') {
        performanceUpdates.forEach(({ type, value }) => {
          console.log(`${type}:`, value);
        });
      }
      
      if (process.env.NODE_ENV === 'production') {
        // Batch send to analytics
        // analytics.track('performance', { updates: performanceUpdates });
      }
      
      performanceUpdates = [];
      updateTimeout = null;
    });
  }
};

// Track Largest Contentful Paint (LCP)
export const trackLCP = () => {
  if (typeof window === 'undefined' || !window.performance) return;
  
  const observer = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    
    batchPerformanceUpdate('LCP', {
      time: lastEntry.startTime,
      element: lastEntry.element?.tagName || 'unknown'
    });
  });
  
  observer.observe({ entryTypes: ['largest-contentful-paint'] });
};

// Track First Input Delay (FID)
export const trackFID = () => {
  if (typeof window === 'undefined' || !window.performance) return;
  
  const observer = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const firstEntry = entries[0];
    
    batchPerformanceUpdate('FID', firstEntry.processingStart - firstEntry.startTime);
  });
  
  observer.observe({ entryTypes: ['first-input'] });
};

// Track Cumulative Layout Shift (CLS)
export const trackCLS = () => {
  if (typeof window === 'undefined' || !window.performance) return;
  
  let cumulativeScore = 0;
  let lastUpdate = 0;
  const UPDATE_INTERVAL = 1000; // Only update every second
  
  const observer = new PerformanceObserver((entryList) => {
    const now = performance.now();
    
    for (const entry of entryList.getEntries()) {
      if (!entry.hadRecentInput) {
        cumulativeScore += entry.value;
      }
    }
    
    // Throttle updates to minimize reflows
    if (now - lastUpdate >= UPDATE_INTERVAL) {
      batchPerformanceUpdate('CLS', cumulativeScore);
      lastUpdate = now;
    }
  });
  
  observer.observe({ entryTypes: ['layout-shift'] });
};

// Track component render time
export const trackComponentRender = (componentName) => {
  if (process.env.NODE_ENV !== 'development') return;
  
  const startTime = performance.now();
  
  return () => {
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    batchPerformanceUpdate('Component Render', {
      name: componentName,
      time: renderTime.toFixed(2)
    });
    
    // Flag slow renders
    if (renderTime > 16) { // 16ms = 60fps
      console.warn(`${componentName} took ${renderTime.toFixed(2)}ms to render, which may cause frame drops`);
    }
  };
};

// Initialize all performance tracking
export const initPerformanceTracking = () => {
  trackLCP();
  trackFID();
  trackCLS();
}; 