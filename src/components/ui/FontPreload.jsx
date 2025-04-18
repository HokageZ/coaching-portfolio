import { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

/**
 * FontPreload Component
 * 
 * This component ensures the document has the right language attributes
 * to trigger font changes via CSS. Font selection is handled by the global CSS rules.
 */
const FontPreload = () => {
  const { language } = useLanguage();
  
  useEffect(() => {
    // Set document language and direction attributes
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);
  
  // This component doesn't render anything visible
  return null;
};

export default FontPreload; 