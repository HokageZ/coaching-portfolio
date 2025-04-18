import { useState, useContext, useEffect, memo, useMemo, useCallback } from 'react';
import { ScrollContext } from '../../App';
import SectionAnimator from '../animations/SectionAnimator';
import { useLanguage } from '../../context/LanguageContext';

// Further optimized FAQItem with useCallback for toggle
const FAQItem = memo(({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Use callback to prevent recreating function on every render
  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);
  
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;
  
  // Precalculate styles to avoid object recreation in render
  const panelStyle = {
    maxHeight: isOpen ? '1000px' : '0',
    opacity: isOpen ? 1 : 0,
    transform: 'translateZ(0)',
    willChange: 'max-height, opacity'
  };
  
  const iconClass = `w-6 h-6 min-w-[24px] text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`;
  const titleClass = `text-lg sm:text-xl font-semibold transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-white'}`;
  
  return (
    <div className="mb-4 last:mb-0">
      <button 
        id={buttonId}
        onClick={toggleOpen}
        className="w-full flex justify-between items-start p-4 rounded-lg bg-black/20 hover:bg-black/40 backdrop-blur-sm border border-white/10 transition-all duration-300"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={`${faq.question} ${isOpen ? 'Collapse' : 'Expand'}`}
      >
        <span className={titleClass}>{faq.question}</span>
        <svg 
          className={iconClass} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div 
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
        style={panelStyle}
      >
        <div className="p-4 pt-2 text-gray-300 bg-black/10 rounded-b-lg border-t-0 border border-white/5">
          {faq.answer}
        </div>
      </div>
    </div>
  );
});

// Main FAQ component
const FAQ = () => {
  const { t } = useLanguage();
  
  // Memoize FAQ data to prevent recalculation
  const faqs = useMemo(() => [
    { 
      id: 'faq1', 
      question: t('faq.q1'),
      answer: t('faq.a1')
    },
    { 
      id: 'faq2', 
      question: t('faq.q2'),
      answer: t('faq.a2')
    },
    { 
      id: 'faq3', 
      question: t('faq.q3'),
      answer: t('faq.a3')
    },
    { 
      id: 'faq4', 
      question: t('faq.q4'),
      answer: t('faq.a4')
    },
    { 
      id: 'faq5', 
      question: t('faq.q5'),
      answer: t('faq.a5')
    },
    { 
      id: 'faq6', 
      question: t('faq.q6'),
      answer: t('faq.a6')
    },
    { 
      id: 'faq7', 
      question: t('faq.q7'),
      answer: t('faq.a7')
    }
  ], [t]);

  return (
    <section id="faq" className="relative overflow-hidden bg-black">
      {/* Modern glass/blur overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black to-black/95 backdrop-blur-sm z-0"></div>
      
      {/* Dynamic grid pattern */}
      <div className="absolute inset-0 z-0 opacity-8" 
        style={{ 
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)`, 
          backgroundSize: '30px 30px',
          backgroundPosition: 'center center'
        }}
      />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="py-24">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('faq.title')}</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">{t('faq.subtitle')}</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <FAQItem 
                  key={faq.id} 
                  faq={faq} 
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ; 