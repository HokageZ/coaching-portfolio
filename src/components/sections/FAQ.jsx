import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../context/LanguageContext';

const faqVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};

const contentVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.4,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.4,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const { t } = useLanguage();

  const faqs = [
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

  const handleKeyPress = (event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setActiveIndex(activeIndex === index ? null : index);
    }
  };

  return (
    <section ref={ref} id="faq" className="relative py-16 bg-black">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl font-bold mb-6 text-white"
          >
            {t('faq.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            {t('faq.subtitle')}
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={faqVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: index * 0.15 }}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              tabIndex={0}
              role="button"
              aria-expanded={activeIndex === index}
              aria-controls={`faq-content-${index}`}
              className={`
                bg-zinc-900/80 rounded-lg p-6 cursor-pointer
                transition-all duration-300 ease-in-out
                border border-zinc-800
                hover:border-red-800 hover:bg-zinc-900
                focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50
                transform hover:scale-[1.01]
                ${activeIndex === index ? 'border-red-800 bg-zinc-900' : ''}
              `}
            >
              <div className="flex justify-between items-center">
                <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                  activeIndex === index ? 'text-red-600' : 'text-white'
                }`}>
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={`w-5 h-5 relative ${
                    activeIndex === index ? 'text-red-600' : 'text-gray-400'
                  }`}
                >
                  <svg
                    className="absolute inset-0 transition-colors duration-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </motion.div>
              </div>

              <AnimatePresence mode="wait">
                {activeIndex === index && (
                  <motion.div
                    id={`faq-content-${index}`}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="mt-4 text-gray-400 overflow-hidden"
                  >
                    <div className="pt-2">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ; 