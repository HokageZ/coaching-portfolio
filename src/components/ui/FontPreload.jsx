import { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

/**
 * FontPreload Component
 * 
 * This component ensures both Readex Pro and Chakra Petch fonts are preloaded
 * to support mixed language content, with Arabic text using Readex Pro
 * and English content using Chakra Petch.
 */
const FontPreload = () => {
  const { language } = useLanguage();
  
  useEffect(() => {
    // Always maintain Chakra Petch as the base font
    document.documentElement.style.fontFamily = "'Chakra Petch', sans-serif";
    
    // Both fonts are loaded from Google Fonts
    // This component is kept for compatibility
  }, [language]);
  
  // This component doesn't render anything visible
  return null;
};

export default FontPreload; 