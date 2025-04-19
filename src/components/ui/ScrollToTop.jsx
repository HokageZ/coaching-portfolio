import { useEffect } from 'react';

/**
 * ScrollToTop component
 * 
 * This component automatically scrolls the window to top when the route changes.
 * It should be placed near the top of your component tree, inside Router but
 * outside of Routes.
 */
const ScrollToTop = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Add listener for hash changes to handle anchor navigation
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash) {
        window.scrollTo(0, 0);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // This component doesn't render anything
  return null;
};

export default ScrollToTop; 