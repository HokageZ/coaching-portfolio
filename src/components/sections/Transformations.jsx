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
    images: {
      frontBefore: client2FrontBefore,
      frontAfter: client2FrontAfter,
      backBefore: client2BackBefore,
      backAfter: client2BackAfter,
    }
  }
];

const TransformationGrid = memo(({ transformation, t }) => {
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

  return (
    <motion.div 
      className="relative bg-black/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-20">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Grid Layout */}
      <div className="grid grid-cols-2 gap-1 p-1">
        {/* Front View */}
        <div className="relative aspect-[3/4]">
          <div className="absolute inset-0">
            <img 
              src={transformation.images.frontBefore} 
              alt="Before front view"
              className="w-full h-full object-cover filter grayscale contrast-125 brightness-90"
            />
            <div className="absolute bottom-2 left-2">
              <span className="px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-sm rounded-full border border-white/10">
                {t('transformations.before')}
              </span>
            </div>
          </div>
        </div>
        <div className="relative aspect-[3/4]">
          <div className="absolute inset-0">
            <img 
              src={transformation.images.frontAfter} 
              alt="After front view"
              className="w-full h-full object-cover filter grayscale contrast-125 brightness-90"
            />
            <div className="absolute bottom-2 right-2">
              <span className="px-2 py-1 bg-primary/80 backdrop-blur-sm text-white text-sm rounded-full border border-primary/30">
                {t('transformations.after')}
              </span>
            </div>
          </div>
        </div>
        
        {/* Back View */}
        <div className="relative aspect-[3/4]">
          <div className="absolute inset-0">
            <img 
              src={transformation.images.backBefore} 
              alt="Before back view"
              className="w-full h-full object-cover filter grayscale contrast-125 brightness-90"
            />
            <div className="absolute bottom-2 left-2">
              <span className="px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-sm rounded-full border border-white/10">
                {t('transformations.before')}
              </span>
            </div>
          </div>
        </div>
        <div className="relative aspect-[3/4]">
          <div className="absolute inset-0">
            <img 
              src={transformation.images.backAfter} 
              alt="After back view"
              className="w-full h-full object-cover filter grayscale contrast-125 brightness-90"
            />
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
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-xl font-bold text-white">{t(transformation.nameKey)}</h4>
            <p className="text-gray-300 text-sm">{t(transformation.roleKey)}</p>
          </div>
          <div className="flex items-center gap-1 bg-gradient-to-r from-primary/20 to-primary/10 px-3 py-1 rounded-full border border-primary/30">
            <span className="text-primary text-sm font-medium">{t(transformation.durationKey)}</span>
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
  );
});

const Transformations = memo(() => {
  const { t } = useLanguage();

  return (
    <SectionAnimator
      id="transformations"
      title={t('transformations.title')}
      highlightedText={t('transformations.title')}
    >
      <div className="grid md:grid-cols-2 gap-8 px-4">
        {transformations.map((transformation) => (
          <TransformationGrid 
            key={transformation.id} 
            transformation={transformation} 
            t={t}
          />
        ))}
      </div>
    </SectionAnimator>
  );
});

export default Transformations; 