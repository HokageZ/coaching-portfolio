import { useRef, useMemo, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

/**
 * A lightweight wrapper component that provides basic animations for sections
 * with significant performance optimizations
 * 
 * @param {Object} props
 * @param {string} props.id - The section ID
 * @param {string} props.title - The section title
 * @param {string} props.subtitle - The section subtitle or description
 * @param {string} props.highlightedText - Text in the title to be highlighted with gradient
 * @param {React.ReactNode} props.children - The section content
 */
const SectionAnimator = ({ 
  id, 
  title, 
  subtitle, 
  highlightedText = '',
  titleClassName = '',
  subtitleClassName = '',
  children,
  className = '',
  backgroundClassName = '',
  showTitle = true
}) => {
  const sectionRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { dir } = useLanguage();
  
  const isInView = useInView(sectionRef, { 
    once: true, 
    margin: "-10% 0px",
    amount: 0.1 
  });
  
  // Handle loading state
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isInView]);
  
  // Minimal title formatting logic
  const formattedTitle = useMemo(() => {
    if (!highlightedText || !title) return title;
    
    const parts = title.split(highlightedText);
    if (parts.length === 1) return title;
    
    return (
      <>
        {parts[0]}
        <span className="gradient-text">{highlightedText}</span>
        {parts[1]}
      </>
    );
  }, [title, highlightedText]);

  return (
    <section 
      id={id} 
      ref={sectionRef}
      className={`py-16 md:py-24 relative overflow-hidden ${className}`}
    >
      {/* Background element */}
      {backgroundClassName && (
        <div className={`absolute inset-0 -z-10 ${backgroundClassName}`} />
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section header with minimal animations */}
          {showTitle && title && (
            <div className="text-center mb-12 md:mb-16">
              <motion.h2 
                className={`text-3xl md:text-4xl font-bold mb-4 ${titleClassName}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ 
                  opacity: isInView ? 1 : 0, 
                  y: isInView ? 0 : 15 
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {formattedTitle}
              </motion.h2>
              
              {subtitle && (
                <motion.p 
                  className={`text-gray-300 text-lg max-w-2xl mx-auto ${subtitleClassName}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isInView ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                >
                  {subtitle}
                </motion.p>
              )}
              
              <motion.div 
                className="w-24 h-1 bg-primary/30 rounded-full mx-auto mt-6"
                initial={{ width: 0 }}
                animate={{ width: isInView ? '6rem' : 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              />
            </div>
          )}
          
          {/* Section content with single animation */}
          <AnimatePresence>
            {isLoaded && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1,
                  y: 0
                }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                style={{ direction: dir }}
                className={dir === 'rtl' ? 'rtl' : ''}
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SectionAnimator; 