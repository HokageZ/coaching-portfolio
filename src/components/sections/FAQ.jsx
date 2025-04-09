import { useState, useContext, useEffect, memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ScrollContext } from '../../App';
import SectionAnimator from '../animations/SectionAnimator';
import { useLanguage } from '../../context/LanguageContext';

// Memoize FAQItem to prevent re-renders when parent re-renders
const FAQItem = memo(({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="mb-4 border border-gray-800 rounded-lg overflow-hidden shadow-red hover:shadow-lg transition-all duration-300">
      {/* Question Button */}
      <button
        className="w-full flex justify-between items-center p-5 sm:p-6 text-left bg-black/60 backdrop-blur-sm hover:bg-primary/10 transition-colors duration-300"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <h3 
          className={`text-lg sm:text-xl font-semibold transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-white'}`}
        >
          {faq.question}
        </h3>
        <div className="flex items-center justify-center">
          <svg 
            className={`w-6 h-6 min-w-[24px] text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      {/* Answer Panel */}
      <div 
        id={`faq-answer-${index}`}
        className="overflow-hidden transition-all duration-300 ease-in-out will-change-[max-height]"
        style={{ 
          maxHeight: isOpen ? '1000px' : '0',
          opacity: isOpen ? 1 : 0,
          transform: 'translateZ(0)'
        }}
        aria-hidden={!isOpen}
      >
        <div className="p-5 sm:p-6 bg-black/40 backdrop-blur-sm text-gray-300 font-chakra border-t border-gray-800">
          <p>{faq.answer}</p>
        </div>
      </div>
    </div>
  );
});

// Memoize the FAQContent component to prevent re-renders
const FAQContent = memo(({ faqs, hasAnimated }) => {
  const { t } = useLanguage();
  
  // Memoize animation variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }), []);
  
  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }), []);

  return (
    <>
      {/* FAQ Accordion */}
      <motion.div 
        className="max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={hasAnimated ? "visible" : "hidden"}
      >
        {faqs.map((faq, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
          >
            <FAQItem faq={faq} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
});

const FAQ = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const { visibleSections } = useContext(ScrollContext);
  const isVisible = visibleSections['faq'];
  const { t, language } = useLanguage();
  
  // Only set hasAnimated once to prevent re-renders
  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isVisible, hasAnimated]);

  // Memoize the faqs array to prevent re-creation on re-render
  const faqs = useMemo(() => {
    if (language === 'en') {
      return [
        {
          question: t('faq.q1'),
          answer: t('faq.a1')
        },
        {
          question: t('faq.q2'),
          answer: t('faq.a2')
        },
        {
          question: t('faq.q3'),
          answer: t('faq.a3')
        },
        {
          question: t('faq.q4'),
          answer: t('faq.a4')
        },
        {
          question: t('faq.q5'),
          answer: t('faq.a5')
        },
        {
          question: t('faq.q6'),
          answer: t('faq.a6')
        },
        {
          question: t('faq.q7'),
          answer: t('faq.a7')
        }
      ];
    } else {
      // For Arabic, use the original Arabic questions and answers from the FAQS constant
      return [
        {
          question: 'مين يقدر ينضم للبرنامج؟',
          answer: 'اي حد حابب يوصل لهدفك ويخلي حياتك افضل'
        },
        {
          question: 'هل بتمرن بنات؟',
          answer: 'ايوا بس المتابعه بدون صور ولو حبيتي ممكن يبقي التواصل من خلال الوالد او الأخ'
        },
        {
          question: 'بستلم البرنامج فى قد اية؟',
          answer: 'من يوم ل ٣ أيام كحد اقصي'
        },
        {
          question: 'إيه سياسة الاسترجاع؟',
          answer: 'يمكنك استرداد كامل مبلغ الاشتراك اذا لم يتم استلام اى خطط , لاكن اذا تم استلام البرنامج لا يسمح باسترداد المبلغ'
        },
        {
          question: 'هل يوجد متابعة و فحوصات؟',
          answer: 'طبعا في الباقه الفضيه بتابعك كل أسبوع وفالباقه الذهبيه متابعه يوميه'
        },
        {
          question: 'الاشتراك بيبدأ امتى؟',
          answer: 'اول ما يوصلك جداول الشغل'
        },
        {
          question: 'هل لازم أنشر تحول العميل؟',
          answer: 'يفضل بس لو العميل مش حابب فا دي خصوصيه وأنا مقدرش أتعداها'
        }
      ];
    }
  }, [t, language]);

  return (
    <SectionAnimator
      id="faq"
      title={t('faq.title')}
      highlightedText={language === 'en' ? "Questions" : "الأسئلة"}
      subtitle={t('faq.subtitle')}
    >
      <FAQContent faqs={faqs} hasAnimated={hasAnimated} />
    </SectionAnimator>
  );
};

export default FAQ; 