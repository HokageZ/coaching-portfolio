import { useRef, useMemo, useState, useEffect, memo } from 'react';
import { useInView } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

/**
 * A lightweight wrapper component that provides basic section structure
 * without animations for better performance
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
  const { dir, language } = useLanguage();
  
  // More reliable InView detection with better fallback
  const isInView = useInView(sectionRef, { 
    once: true, 
    margin: "-50px",
    amount: 0.1
  });
  
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
      className={`relative overflow-hidden ${className}`}
    >
      {/* Background element - only render if needed */}
      {backgroundClassName && (
        <div className={`absolute inset-0 -z-10 ${backgroundClassName}`} />
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto content-padding">
          {/* Section header without animations */}
          {showTitle && title && (
            <div className="text-center mb-12 md:mb-16">
              <h2 
                className={`text-3xl md:text-4xl font-bold mb-4 ${titleClassName}`}
              >
                {formattedTitle}
              </h2>
              
              {subtitle && (
                <p 
                  className={`text-gray-300 text-lg max-w-2xl mx-auto ${subtitleClassName}`}
                >
                  {subtitle}
                </p>
              )}
              
              {/* Removed underline
              <div 
                className="w-24 h-1 bg-primary/30 rounded-full mx-auto mt-6"
              />
              */}
            </div>
          )}
          
          {/* Main content without animation */}
          <div 
            style={{ 
              direction: dir
            }}
            className={dir === 'rtl' ? 'rtl' : ''}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
});

export default SectionAnimator; 