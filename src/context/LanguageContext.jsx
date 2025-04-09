import { createContext, useState, useContext, useEffect } from 'react';

// Create language context
export const LanguageContext = createContext({
  language: 'ar',
  setLanguage: () => {},
  t: (key) => key,
  dir: 'rtl',
  isChangingLanguage: false
});

// Import translations from separate files for better organization
import enTranslations from './translations/en';
import arTranslations from './translations/ar';

// Translation lookup object
const translations = {
  en: enTranslations,
  ar: arTranslations
};

export const LanguageProvider = ({ children }) => {
  // Get initial language from local storage or use default (ar)
  const [language, setLanguage] = useState(() => {
    const savedLanguage = typeof window !== 'undefined' 
      ? localStorage.getItem('language') 
      : null;
      return savedLanguage || 'ar';
  });
  
  // Add state to track language transition
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);

  // Handle language change with transition
  const handleLanguageChange = (newLang) => {
    if (newLang === language) return;
    
    // Save current scroll position
    const scrollPosition = window.scrollY;
    
    // Start transition
    setIsChangingLanguage(true);
    
    // Delay the actual language change for transition effect
    setTimeout(() => {
      setLanguage(newLang);
      localStorage.setItem('language', newLang);
      
      // End transition after DOM updates
      setTimeout(() => {
        // Restore scroll position
        window.scrollTo(0, scrollPosition);
        setIsChangingLanguage(false);
      }, 300);
    }, 200);
  };

  // Set document direction based on language
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
      document.body.classList.toggle('rtl', language === 'ar');
      document.body.classList.toggle('ltr', language === 'en');
    }
  }, [language]);
  
  // Memoized translation function
  const t = (key) => {
    const currentTranslations = translations[language] || {};
    return currentTranslations[key] || key;
  };

  const contextValue = {
    language,
    setLanguage: handleLanguageChange,
    t,
    dir: language === 'ar' ? 'rtl' : 'ltr',
    isChangingLanguage
  };
  
  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
      {/* Language transition overlay */}
      {isChangingLanguage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-[100] flex items-center justify-center transition-opacity duration-300">
          <div className="flex flex-col items-center gap-4">
            {/* Loading spinner */}
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            
            {/* Message with appropriate font based on target language */}
            <div className={`text-white text-2xl ${language === 'ar' ? 'font-chakra' : 'font-arabic'}`}>
              {language === 'ar' ? 'Changing to English...' : 'جاري التغيير للعربية...'}
            </div>
          </div>
        </div>
      )}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext); 