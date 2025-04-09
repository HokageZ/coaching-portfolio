import { useState, useEffect, useRef, memo, useMemo, useCallback } from 'react';
import SectionAnimator from '../animations/SectionAnimator';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

// Optimized feature item component
const FeatureItem = memo(({ feature, index, isHovered }) => (
  <motion.li 
    key={index} 
    className="flex items-start text-gray-300"
    initial={{ opacity: 0.7, x: 0 }}
    animate={{ 
      opacity: isHovered ? 1 : 0.7,
      x: isHovered ? 5 : 0
    }}
    transition={{ delay: index * 0.05, duration: 0.2 }}
  >
    <motion.span 
      className="text-primary mr-2 transition-colors"
      animate={{ color: isHovered ? '#B60D0D' : 'rgba(182, 13, 13, 0.8)' }}
    >
      ✓
    </motion.span>
    <span dir="auto" className="rtl:mr-3">{feature}</span>
  </motion.li>
));

// Memoized service card button
const ServiceCtaButton = memo(({ ctaText, isHovered }) => (
  <motion.button 
    className="w-full py-3 rounded-lg font-medium transition duration-300 relative overflow-hidden mt-auto"
    whileTap={{ scale: 0.98 }}
    animate={{
      backgroundColor: isHovered ? 'rgba(182, 13, 13, 0.2)' : 'rgba(182, 13, 13, 0.1)',
      borderColor: isHovered ? 'rgba(182, 13, 13, 0.3)' : 'rgba(182, 13, 13, 0.2)'
    }}
    style={{ border: '1px solid' }}
    onClick={() => {
      const packages = document.getElementById('packages');
      if (packages) {
        packages.scrollIntoView({ behavior: 'smooth' });
      }
    }}
  >
    <motion.span 
      className="relative z-10 text-primary font-medium"
      animate={{ color: isHovered ? '#B60D0D' : 'rgba(182, 13, 13, 0.9)' }}
    >
      {ctaText}
    </motion.span>
    <motion.span 
      className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-r from-primary/20 to-primary/30 z-0"
      initial={{ y: '100%' }}
      animate={{ y: isHovered ? '0%' : '100%' }}
      transition={{ duration: 0.3 }}
    />
  </motion.button>
));

// Optimized service card with memoization
const ServiceCard = memo(({ service, index, hoveredCard, setHoveredCard }) => {
  const isHovered = hoveredCard === service.id;
  
  const handleMouseEnter = useCallback(() => {
    setHoveredCard(service.id);
  }, [service.id, setHoveredCard]);
  
  const handleMouseLeave = useCallback(() => {
    setHoveredCard(null);
  }, [setHoveredCard]);
  
  // Memoize style objects to prevent recreation on each render
  const cardStyle = useMemo(() => ({
    boxShadow: isHovered ? '0 15px 30px -10px rgba(182, 13, 13, 0.15)' : 'none'
  }), [isHovered]);
  
  const iconAnimation = useMemo(() => ({ 
    backgroundColor: isHovered ? 'rgba(182, 13, 13, 0.2)' : 'rgba(182, 13, 13, 0.1)',
    scale: isHovered ? 1.05 : 1
  }), [isHovered]);
  
  const titleAnimation = useMemo(() => ({ 
    color: isHovered ? '#ffffff' : '#f0f0f0',
    x: isHovered ? 5 : 0
  }), [isHovered]);
  
  const cornerAccentAnimation = useMemo(() => ({ 
    opacity: isHovered ? 0.4 : 0.1,
    scale: isHovered ? 1.2 : 1
  }), [isHovered]);
  
  const cornerAccentStyle = useMemo(() => ({ 
    background: 'radial-gradient(circle at bottom right, rgba(182, 13, 13, 0.5), transparent 70%)',
  }), []);
  
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div
        className="glass-card p-6 md:p-8 relative flex flex-col h-full rounded-xl overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        style={cardStyle}
      >
        {/* Background glow effect */}
        <motion.div 
          className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-primary/0 via-primary/20 to-primary/0 opacity-0 z-0 blur-xl"
          animate={{ opacity: isHovered ? 0.7 : 0 }}
          transition={{ duration: 0.4 }}
        />
          
        {/* Card accent */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/30 via-primary to-primary/30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Service Icon */}
        <div className="flex items-center gap-4 mb-5">
          <motion.div 
            className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-2xl"
            animate={iconAnimation}
            transition={{ duration: 0.3 }}
          >
            {service.icon}
          </motion.div>
          
          {/* Service Header */}
          <motion.h3 
            className="text-xl md:text-2xl font-bold text-white font-chakra"
            animate={titleAnimation}
            transition={{ duration: 0.3 }}
          >
            {service.title}
          </motion.h3>
        </div>
          
        <motion.p 
          className="text-gray-300 mb-6 flex-grow"
          animate={{ opacity: isHovered ? 1 : 0.9 }}
        >
          {service.description}
        </motion.p>
        
        {/* Features List */}
        <ul className="space-y-2 text-sm mb-6">
          {service.features.map((feature, featureIndex) => (
            <FeatureItem 
              key={featureIndex}
              feature={feature}
              index={featureIndex}
              isHovered={isHovered}
            />
          ))}
        </ul>
        
        {/* CTA Button */}
        <ServiceCtaButton ctaText={service.ctaText} isHovered={isHovered} />
        
        {/* Corner accent */}
        <motion.div 
          className="absolute bottom-0 right-0 w-12 h-12 z-0 opacity-20"
          style={cornerAccentStyle}
          animate={cornerAccentAnimation}
        />
      </motion.div>
    </motion.div>
  );
});

// Enhanced CTA component
const EnhancedCta = memo(({ t }) => (
  <motion.div 
    className="mt-16 text-center"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.4 }}
    viewport={{ once: true, margin: "-100px" }}
  >
    <motion.p 
      className="text-gray-300 mb-6 max-w-2xl mx-auto"
      animate={{ opacity: [0.9, 1, 0.9] }}
      transition={{ duration: 8, repeat: Infinity }}
    >
      {t('services.cta.looking')}
    </motion.p>
    <motion.div
      className="inline-block"
      whileHover={{ scale: 1.03 }}
    >
      <motion.button 
        className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-lg relative overflow-hidden group"
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          const footer = document.getElementById('footer');
          if (footer) {
            footer.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <span className="relative z-10">{t('contact.title')}</span>
        <motion.svg 
          className="w-5 h-5 relative z-10"
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
        <motion.span 
          className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-80 z-0" 
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    </motion.div>
  </motion.div>
));

// Main Services component - optimized with memoization
const Services = memo(() => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const { t } = useLanguage();

  // Memoize services array to prevent recreation on re-renders
  const services = useMemo(() => [
    {
      id: 1,
      title: t('services.diet.title'),
      description: t('services.diet.description'),
      icon: "🥗",
      ctaText: t('services.cta.view'),
      features: [
        t('services.diet.feature.1'),
        t('services.diet.feature.2'),
        t('services.diet.feature.3')
      ]
    },
    {
      id: 2,
      title: t('services.workout.title'),
      description: t('services.workout.description'),
      icon: "💪",
      ctaText: t('services.cta.view'),
      features: [
        t('services.workout.feature.1'),
        t('services.workout.feature.2'),
        t('services.workout.feature.3')
      ]
    },
    {
      id: 3,
      title: t('services.tools.title'),
      description: t('services.tools.description'),
      icon: "🎯",
      ctaText: t('services.cta.view'),
      features: [
        t('services.tools.feature.1'),
        t('services.tools.feature.2'),
        t('services.tools.feature.3'),
        t('services.tools.feature.4')
      ]
    }
  ], [t]);
  
  // Optimization: Use a callback for hover state changes
  const setHoveredCardCallback = useCallback((id) => {
    setHoveredCard(id);
  }, []);
  
  return (
    <SectionAnimator 
      id="services"
      title={t('services.title')}
      highlightedText={t('services.title')}
      subtitle={t('services.subtitle')}
      showPatterns={true}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {services.map((service, index) => (
          <ServiceCard 
            key={service.id}
            service={service}
            index={index}
            hoveredCard={hoveredCard}
            setHoveredCard={setHoveredCardCallback}
          />
        ))}
      </div>
      
      {/* Enhanced CTA */}
      <EnhancedCta t={t} />
    </SectionAnimator>
  );
});

export default Services; 