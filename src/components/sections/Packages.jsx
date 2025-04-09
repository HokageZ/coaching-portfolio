import { useState, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import SectionAnimator from '../animations/SectionAnimator';

const PackageCard = ({ pkg, index, selectedPackage, setSelectedPackage }) => {
  const isSelected = selectedPackage === pkg.title;
  const isHighlighted = pkg.highlighted;
  const { t } = useLanguage();
  
  return (
    <motion.div 
      className={`relative ${isHighlighted ? 'md:-mt-6 z-10' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Selection indicator - Top position */}
      {isSelected && (
        <motion.div 
          className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs font-bold py-1 px-3 rounded-full z-20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {t('packages.bestvalue')}
        </motion.div>
      )}
      
      <motion.div 
        className={`rounded-xl overflow-hidden relative backdrop-blur-sm h-full flex flex-col ${
          isHighlighted 
            ? 'bg-black/80 shadow-lg shadow-primary/20 border border-primary/30' 
            : 'bg-black/60 border border-white/10'
        }`}
        whileHover={{ 
          y: -5,
          boxShadow: isHighlighted 
            ? '0 25px 50px -12px rgba(182, 13, 13, 0.35)'
            : '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
        }}
        onMouseEnter={() => setSelectedPackage(pkg.title)}
        onMouseLeave={() => setSelectedPackage(null)}
        transition={{ duration: 0.2 }}
      >
        {/* Popular tag - repositioned to top-left corner */}
        {isHighlighted && (
          <motion.div 
            className="absolute top-0 left-0 z-10 bg-primary text-white text-xs font-bold py-1 px-3 rounded-tr-md rounded-bl-md shadow-lg flex items-center justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {t('packages.popular')}
          </motion.div>
        )}
        
        {/* Glowing background effect */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${
            isHighlighted 
              ? 'from-primary/10 via-primary/5 to-transparent' 
              : 'from-white/5 via-white/2 to-transparent'
          } opacity-0`}
          animate={{ opacity: isSelected ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Card Header */}
        <div className={`p-8 ${isHighlighted ? 'bg-gradient-to-r from-primary/80 to-primary/60' : 'bg-gradient-to-br from-neutral-800/90 to-black/80'} relative overflow-hidden`}>
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                  <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        
          <h3 className="text-2xl font-bold text-white mb-2 relative">
            <span dir="auto" className="rtl:mr-2 inline-block">{pkg.title}</span>
          </h3>
          <div className="flex items-end mb-1 relative">
            <span className="flex items-center text-lg text-white/90">
              <svg className="w-5 h-5 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span dir="auto" className="rtl:mr-3 inline-block">{pkg.duration}</span>
            </span>
          </div>
          
          {/* Animated accent */}
          <motion.div 
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isSelected ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Features List */}
        <div className="p-8 pt-4 flex flex-col flex-grow relative">
          <div className="mb-3">
            <h4 className="font-semibold text-white/90 flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span dir="auto" className="rtl:mr-3 inline-block">{t('packages.features')}</span>
            </h4>
          </div>
          <ul className="space-y-3 mb-6 flex-grow">
            {pkg.features.map((feature, idx) => (
              <motion.li 
                key={idx} 
                className="flex items-start"
                initial={{ opacity: 0.7, x: 0 }}
                animate={{ 
                  opacity: isSelected ? 1 : 0.7,
                  x: isSelected ? 5 : 0
                }}
                transition={{ delay: idx * 0.05, duration: 0.2 }}
              >
                <motion.div 
                  className={`flex-shrink-0 w-5 h-5 mr-3 rounded-full flex items-center justify-center ${
                    isHighlighted ? 'bg-primary/20 text-primary' : 'bg-primary/20 text-primary'
                  }`}
                  animate={{ 
                    scale: isSelected ? [1, 1.2, 1] : 1,
                    backgroundColor: isSelected ? 'rgba(182, 13, 13, 0.3)' : undefined
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <svg 
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <span dir="auto" className={`rtl:mr-3 text-gray-300 ${isHighlighted ? 'text-white/90' : ''}`}>{feature}</span>
              </motion.li>
            ))}
          </ul>

          {pkg.suitableFor && (
            <div className="mb-5 text-sm text-white/90 bg-gradient-to-r from-black/40 to-black/20 p-3 rounded-lg border border-white/10 italic flex items-start">
              <svg className="w-5 h-5 mr-2 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span dir="auto" className="rtl:mr-3">{pkg.suitableFor}</span>
            </div>
          )}

          <div className="mb-4">
            <h4 className="font-semibold text-white/90 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span dir="auto" className="rtl:mr-3 inline-block">{t('packages.tier')}</span>
            </h4>
          </div>

          {/* Plan Options */}
          <div className="grid grid-cols-1 gap-4 mb-2">
            {pkg.tiers.map((tier, idx) => (
              <motion.div
                key={idx}
                className={`p-4 rounded-lg ${
                  idx === 0 
                    ? 'bg-gradient-to-br from-gray-800/40 to-black/50 hover:from-gray-800/50 hover:to-black/60 border border-white/10' 
                    : 'bg-gradient-to-br from-primary/20 to-primary/5 hover:from-primary/30 hover:to-primary/10 border border-primary/30'
                } transition-colors duration-300`}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="text-xl mr-2.5">{idx === 0 ? '🥈' : '🥇'}</span>
                    <span dir="auto" className="font-bold text-lg text-white rtl:mr-2">{tier.name}</span>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <div className="flex items-center">
                      <span className="text-sm text-white/60 line-through mr-2">{parseInt(tier.price) * 2}</span>
                      <span className="text-xs px-1.5 py-0.5 bg-primary/80 text-white rounded-sm -mt-3 font-medium">{t('packages.discount')}</span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-white">{tier.price}</span>
                      <span className="text-sm ml-1 text-white/60">{t('packages.egp')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-3"></div>
                
                <ul className="mb-3 space-y-2">
                  {tier.benefits.map((benefit, bidx) => (
                    <li key={bidx} className="text-sm text-gray-300 flex items-start">
                      <span className="text-primary mr-2 mt-0.5">•</span>
                      <span dir="auto" className="rtl:mr-3">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                {/* WhatsApp button for each tier */}
                <motion.a 
                  href={`https://wa.me/201099488562?text=${encodeURIComponent(t('whatsapp.package').replace('{0}', pkg.title).replace('{1}', tier.name))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-2 w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 relative overflow-hidden flex items-center justify-center ${
                    idx === 0
                      ? 'bg-white/10 hover:bg-white/20 text-white border border-white/10' 
                      : 'bg-primary hover:bg-primary-hover text-white'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z" />
                  </svg>
                  <span className="relative z-10 font-medium">
                    {t('packages.get_plan').replace('{0}', tier.name)}
                  </span>
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Packages = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const { t, language } = useLanguage();
  
  const packages = [
    {
      title: t('packages.testing.title'),
      duration: t('packages.testing.duration'),
      tiers: [
        {
          name: t('packages.silver'),
          price: "350",
          benefits: [
            t('packages.silver.benefit.1'),
            t('packages.silver.benefit.2')
          ]
        },
        {
          name: t('packages.gold'),
          price: "600",
          benefits: [
            t('packages.gold.benefit.1'),
            t('packages.gold.benefit.2'),
            t('packages.gold.benefit.3')
          ]
        }
      ],
      features: [
        t('packages.feature.1'),
        t('packages.feature.2'),
        t('packages.feature.3'),
        t('packages.feature.4'),
        t('packages.feature.5'),
        t('packages.feature.6'),
        t('packages.feature.7')
      ],
      suitableFor: t('packages.testing.suitableFor'),
      highlighted: false
    },
    {
      title: t('packages.development.title'),
      duration: t('packages.development.duration'),
      tiers: [
        {
          name: t('packages.silver'),
          price: "700",
          benefits: [
            t('packages.silver.benefit.1'),
            t('packages.silver.benefit.2')
          ]
        },
        {
          name: t('packages.gold'),
          price: "1000",
          benefits: [
            t('packages.gold.benefit.1'),
            t('packages.gold.benefit.2'),
            t('packages.gold.benefit.3')
          ]
        }
      ],
      features: [
        t('packages.feature.1'),
        t('packages.feature.2'),
        t('packages.feature.3'),
        t('packages.feature.4'),
        t('packages.feature.5'),
        t('packages.feature.6'),
        t('packages.feature.7')
      ],
      suitableFor: t('packages.development.suitableFor'),
      highlighted: true
    },
    {
      title: t('packages.journey.title'),
      duration: t('packages.journey.duration'),
      tiers: [
        {
          name: t('packages.silver'),
          price: "1100",
          benefits: [
            t('packages.silver.benefit.1'),
            t('packages.silver.benefit.2')
          ]
        },
        {
          name: t('packages.gold'),
          price: "1500",
          benefits: [
            t('packages.gold.benefit.1'),
            t('packages.gold.benefit.2'),
            t('packages.gold.benefit.3')
          ]
        }
      ],
      features: [
        t('packages.feature.1'),
        t('packages.feature.2'),
        t('packages.feature.3'),
        t('packages.feature.4'),
        t('packages.feature.5'),
        t('packages.feature.6'),
        t('packages.feature.7')
      ],
      suitableFor: t('packages.journey.suitableFor'),
      highlighted: false
    }
  ];

  const handleContactClick = () => {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="packages" className="py-20 bg-neutral-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-radial opacity-30"></div>
      <div className="absolute inset-0 opacity-5" 
        style={{ 
          backgroundImage: `radial-gradient(circle, rgba(182, 13, 13, 0.2) 1px, transparent 1px)`, 
          backgroundSize: '20px 20px' 
        }}>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('packages.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('packages.subtitle')}
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <PackageCard 
              key={index}
              pkg={pkg}
              index={index}
              selectedPackage={selectedPackage}
              setSelectedPackage={setSelectedPackage}
            />
          ))}
        </div>
        
        {/* Bottom CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="text-gray-400 mb-4">
            {t('packages.free_consultation')}
          </p>
          <motion.a
            href={`https://wa.me/201099488562?text=${encodeURIComponent(t('whatsapp.general'))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z" />
            </svg>
            <span className={language === 'ar' ? 'font-arabic' : ''}>
              {t('packages.contact_us')}
            </span>
          </motion.a>
        </motion.div>
      </div>
      
      {/* Bottom accent */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />
    </section>
  );
};

export default Packages; 