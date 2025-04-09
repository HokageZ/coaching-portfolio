import { useRef, useMemo, useState, useEffect, memo } from 'react';
import { motion, useInView } from 'framer-motion';
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
const SectionAnimator = memo(({ 
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
  
  // More efficient InView detection with lower sensitivity
  const isInView = useInView(sectionRef, { 
    once: true, 
    margin: "-5% 0px",
    amount: 0.05,
    fallback: true // Ensure element is considered in view if detection fails
  });
  
  // Simplified loading state management
  useEffect(() => {
    if (isInView && !isLoaded) {
      setIsLoaded(true);
    }
    
    // Fallback timer with longer delay to reduce unnecessary state changes
    const timer = setTimeout(() => {
      if (!isLoaded) {
        setIsLoaded(true);
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [isInView, isLoaded]);
  
  // Minimal title formatting logic with memoization
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

  // Only log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`Section ${id} - isInView: ${isInView}, isLoaded: ${isLoaded}`);
  }

  // Memoize animation controls for better performance
  const titleAnimation = useMemo(() => ({
    opacity: isInView || isLoaded ? 1 : 0,
    y: isInView || isLoaded ? 0 : 15
  }), [isInView, isLoaded]);

  const contentAnimation = useMemo(() => ({
    opacity: isLoaded || isInView ? 1 : 0,
    y: isLoaded || isInView ? 0 : 20
  }), [isInView, isLoaded]);

  return (
    <section 
      id={id} 
      ref={sectionRef}
      className={`py-16 md:py-24 relative overflow-hidden ${className}`}
    >
      {/* Background element - only render if needed */}
      {backgroundClassName && (
        <div className={`absolute inset-0 -z-10 ${backgroundClassName}`} />
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section header with minimal animations - only render if needed */}
          {showTitle && title && (
            <div className="text-center mb-12 md:mb-16">
              <motion.h2 
                className={`text-3xl md:text-4xl font-bold mb-4 ${titleClassName}`}
                initial={{ opacity: 0, y: 15 }}
                animate={titleAnimation}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {formattedTitle}
              </motion.h2>
              
              {subtitle && (
                <motion.p 
                  className={`text-gray-300 text-lg max-w-2xl mx-auto ${subtitleClassName}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: titleAnimation.opacity }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {subtitle}
                </motion.p>
              )}
              
              <motion.div 
                className="w-24 h-1 bg-primary/30 rounded-full mx-auto mt-6"
                initial={{ width: 0 }}
                animate={{ width: isInView || isLoaded ? '6rem' : 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          )}
          
          {/* Main content with optimized animation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={contentAnimation}
            transition={{ 
              duration: 0.4, 
              ease: "easeOut",
              // Use optimized hardware acceleration
              willChange: "opacity, transform"
            }}
            style={{ 
              direction: dir,
              // Force hardware acceleration
              transform: 'translateZ(0)'
            }}
            className={dir === 'rtl' ? 'rtl' : ''}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default SectionAnimator; 