import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionAnimator from '../animations/SectionAnimator';
import { useLanguage } from '../../context/LanguageContext';

// Import transformation images
import client1FrontBefore from '../../assets/transformations/client_1_front_before.jpg';
import client1FrontAfter from '../../assets/transformations/client_1_front_after.jpg';
import client1BackBefore from '../../assets/transformations/client_1_back_before.jpg';
import client1BackAfter from '../../assets/transformations/client_1_back_after.jpg';
import client2FrontBefore from '../../assets/transformations/client_2_front_before.jpg';
import client2FrontAfter from '../../assets/transformations/client_2_front_after.jpg';
import client2BackBefore from '../../assets/transformations/client_2_back_before.jpg';
import client2BackAfter from '../../assets/transformations/client_2_back_after.jpg';

// Memoize transformation data
const transformations = [
  {
    id: 1,
    nameKey: 'transformations.client.1.name',
    roleKey: 'transformations.client.1.role',
    durationKey: 'transformations.client.1.duration',
    achievementKey: 'transformations.client.1.achievement',
    storyKey: 'transformations.client.1.story',
    weightBefore: 63,
    weightAfter: 69.5,
    images: {
      frontBefore: client1FrontBefore,
      frontAfter: client1FrontAfter,
      backBefore: client1BackBefore,
      backAfter: client1BackAfter,
    }
  },
  {
    id: 2,
    nameKey: 'transformations.client.2.name',
    roleKey: 'transformations.client.2.role',
    durationKey: 'transformations.client.2.duration',
    achievementKey: 'transformations.client.2.achievement',
    storyKey: 'transformations.client.2.story',
    weightBefore: 93,
    weightAfter: 85,
    images: {
      frontBefore: client2FrontBefore,
      frontAfter: client2FrontAfter,
      backBefore: client2BackBefore,
      backAfter: client2BackAfter,
    }
  }
];

// Class to modify only in a single place
const getWeightChangeClass = (before, after) => {
  return before > after ? "text-green-500" : "text-primary";
};

// Animation variants for image reveal
const imageRevealVariants = {
  initial: { 
    opacity: 0,
    scale: 1.1,
    filter: "blur(10px) brightness(0.5) grayscale(1)"
  },
  animate: { 
    opacity: 1,
    scale: 1,
    filter: "blur(0px) brightness(1) grayscale(0.3)",
    transition: { 
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const TransformationGrid = memo(({ transformation, t, language }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState({});

  useEffect(() => {
    const imageUrls = [
      transformation.images.frontBefore,
      transformation.images.frontAfter,
      transformation.images.backBefore,
      transformation.images.backAfter
    ];
    
    const imagesToLoad = imageUrls.filter(url => !imagesLoaded[url]);
    
    if (imagesToLoad.length === 0) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    
    const loadImage = async (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          setImagesLoaded(prev => ({ ...prev, [url]: true }));
          resolve();
        };
        img.onerror = reject;
        img.src = url;
      });
    };
    
    Promise.all(imagesToLoad.map(loadImage))
      .then(() => setIsLoading(false))
      .catch(error => {
        console.error('Error loading images:', error);
        setIsLoading(false);
      });
  }, [transformation.images, imagesLoaded]);

  // Determine text color for weight change
  const weightChangeClass = getWeightChangeClass(transformation.weightBefore, transformation.weightAfter);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.15 }}
        className="relative overflow-hidden rounded-xl"
      >
        {/* Loading State */}
        <AnimatePresence>
          {isLoading && (
            <motion.div 
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-20"
              initial={{ opacity: 1 }}
              exit={{ 
                opacity: 0,
                transition: { duration: 0.5, ease: "easeOut" }
              }}
            >
              <div className="w-16 h-16 relative">
                <motion.div 
                  className="absolute inset-0 border-4 border-primary/30 border-t-primary rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                />
              </div>
              <motion.p 
                className="mt-4 text-white/70 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {t('transformations.loading')}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 gap-1 p-1">
          {/* Front View */}
          <div className="relative aspect-[3/2] overflow-hidden">
            <div className="absolute inset-0">
              {/* Blurred background */}
              <div className="absolute inset-0">
                <motion.img 
                  src={transformation.images.frontBefore} 
                  alt=""
                  className="w-full h-full object-cover scale-110 grayscale brightness-90"
                  initial="initial"
                  animate={!isLoading ? "animate" : "initial"}
                  variants={imageRevealVariants}
                />
              </div>
              {/* Main image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.img 
                  src={transformation.images.frontBefore} 
                  alt="Before front view"
                  className="max-w-full max-h-full object-contain grayscale contrast-125 brightness-90"
                  initial="initial"
                  animate={!isLoading ? "animate" : "initial"}
                  variants={imageRevealVariants}
                />
              </div>
              {/* Before label */}
              <div className="absolute bottom-2 left-2">
                <span className="px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-sm rounded-full border border-white/10">
                  {t('transformations.before')}
                </span>
              </div>
            </div>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden">
            <div className="absolute inset-0">
              {/* Blurred background */}
              <div className="absolute inset-0">
                <motion.img 
                  src={transformation.images.frontAfter} 
                  alt=""
                  className="w-full h-full object-cover scale-110 grayscale brightness-90"
                  initial="initial"
                  animate={!isLoading ? "animate" : "initial"}
                  variants={imageRevealVariants}
                />
              </div>
              {/* Main image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.img 
                  src={transformation.images.frontAfter} 
                  alt="After front view"
                  className="max-w-full max-h-full object-contain grayscale contrast-125 brightness-90"
                  initial="initial"
                  animate={!isLoading ? "animate" : "initial"}
                  variants={imageRevealVariants}
                />
              </div>
              {/* After label */}
              <div className="absolute bottom-2 right-2">
                <span className="px-2 py-1 bg-primary/80 backdrop-blur-sm text-white text-sm rounded-full border border-primary/30">
                  {t('transformations.after')}
                </span>
              </div>
            </div>
          </div>
          
          {/* Back View */}
          <div className="relative aspect-[3/2] overflow-hidden">
            <div className="absolute inset-0">
              {/* Blurred background */}
              <div className="absolute inset-0">
                <motion.img 
                  src={transformation.images.backBefore} 
                  alt=""
                  className="w-full h-full object-cover scale-110 grayscale brightness-90"
                  initial="initial"
                  animate={!isLoading ? "animate" : "initial"}
                  variants={imageRevealVariants}
                />
              </div>
              {/* Main image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.img 
                  src={transformation.images.backBefore} 
                  alt="Before back view"
                  className="max-w-full max-h-full object-contain grayscale contrast-125 brightness-90"
                  initial="initial"
                  animate={!isLoading ? "animate" : "initial"}
                  variants={imageRevealVariants}
                />
              </div>
              {/* Before label */}
              <div className="absolute bottom-2 left-2">
                <span className="px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-sm rounded-full border border-white/10">
                  {t('transformations.before')}
                </span>
              </div>
            </div>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden">
            <div className="absolute inset-0">
              {/* Blurred background */}
              <div className="absolute inset-0">
                <motion.img 
                  src={transformation.images.backAfter} 
                  alt=""
                  className="w-full h-full object-cover scale-110 grayscale brightness-90"
                  initial="initial"
                  animate={!isLoading ? "animate" : "initial"}
                  variants={imageRevealVariants}
                />
              </div>
              {/* Main image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.img 
                  src={transformation.images.backAfter} 
                  alt="After back view"
                  className="max-w-full max-h-full object-contain grayscale contrast-125 brightness-90"
                  initial="initial"
                  animate={!isLoading ? "animate" : "initial"}
                  variants={imageRevealVariants}
                />
              </div>
              {/* After label */}
              <div className="absolute bottom-2 right-2">
                <span className="px-2 py-1 bg-primary/80 backdrop-blur-sm text-white text-sm rounded-full border border-primary/30">
                  {t('transformations.after')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Client Info */}
        <div className="p-6 bg-gradient-to-b from-black/60 to-black/90">
          <div className="flex flex-wrap items-center justify-between mb-3">
            <div>
              <h4 className="text-xl font-bold text-white">{t(transformation.nameKey)}</h4>
              <p className="text-gray-300 text-sm">{t(transformation.roleKey)}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-gradient-to-r from-primary/20 to-primary/10 px-3 py-1 rounded-full border border-primary/30">
                <span className="text-primary text-sm font-medium">{t(transformation.durationKey)}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                  <span className={`text-white text-sm font-medium ${language === 'ar' ? 'font-arabic' : 'font-english'}`}>
                    {transformation.weightBefore} {language === 'ar' ? 'كجم' : 'kg'}
                  </span>
                </div>
                <div className="relative w-4 h-4">
                  <svg 
                    className={`w-4 h-4 text-white/50 absolute transition-all duration-300 ${language === 'ar' ? 'rotate-180' : 'rotate-0'}`}
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                  <span className={`text-white text-sm font-medium ${language === 'ar' ? 'font-arabic' : 'font-english'}`}>
                    {transformation.weightAfter} {language === 'ar' ? 'كجم' : 'kg'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <span className="inline-block bg-primary/90 text-white text-sm px-3 py-1 rounded-full">
              {t(transformation.achievementKey)}
            </span>
          </div>
          <p className="text-gray-300 text-sm">
            {t(transformation.storyKey)}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
});

const Transformations = memo(() => {
  const { t, language } = useLanguage();

  return (
    <SectionAnimator
      id="transformations"
      title={t('transformations.title')}
      subtitle={t('transformations.subtitle')}
      highlightedText={t('transformations.title')}
      className="bg-black relative"
    >
      <div className="content-padding">
        <div className="grid md:grid-cols-2 gap-8 px-4" style={{ 
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          touchAction: 'pan-y pinch-zoom'
        }}>
          {transformations.map((transformation) => (
            <TransformationGrid 
              key={transformation.id} 
              transformation={transformation} 
              t={t}
              language={language}
            />
          ))}
        </div>
      </div>
    </SectionAnimator>
  );
});

export default Transformations; 