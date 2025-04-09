import { useState, useRef, useEffect, memo, useMemo, useCallback } from 'react';
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

// Memoize transformation data to prevent recreation on re-renders
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

// Memoized components for better performance
const Transformations = memo(() => {
  const { t } = useLanguage();

  return (
    <SectionAnimator
      id="transformations"
      title={t('transformations.title')}
      subtitle={t('transformations.subtitle')}
      highlightedText={t('transformations.title')}
    >
      <div className="grid md:grid-cols-2 gap-10 px-2">
        {transformations.map((transformation) => (
          <TransformationCard 
            key={transformation.id} 
            transformation={transformation} 
            t={t}
          />
        ))}
      </div>
    </SectionAnimator>
  );
});

// Memoized styled components for reduced re-renders
const BeforeLabel = memo(({ t }) => (
  <div 
    style={{
      position: 'absolute',
      left: '1rem',
      bottom: '1rem',
      zIndex: 30,
      background: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(4px)',
      padding: '0.375rem 0.75rem',
      borderRadius: '9999px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(255,255,255,0.1)'
    }}
    className="before-label"
    dir="ltr"
  >
    <span 
      style={{
        fontSize: '0.875rem',
        color: 'white',
        fontFamily: "'Chakra Petch', sans-serif",
        fontWeight: 500,
        direction: 'ltr',
        display: 'inline-block'
      }}
    >
      {t('transformations.before')}
    </span>
  </div>
));

const AfterLabel = memo(({ t }) => (
  <div 
    style={{
      position: 'absolute',
      right: '1rem',
      bottom: '1rem',
      zIndex: 30,
      background: 'rgba(182, 13, 13, 0.8)',
      backdropFilter: 'blur(4px)',
      padding: '0.375rem 0.75rem',
      borderRadius: '9999px',
      boxShadow: '0 10px 15px -3px rgba(182, 13, 13, 0.3)',
      border: '1px solid rgba(182, 13, 13, 0.3)'
    }}
    className="after-label"
    dir="ltr"
  >
    <span 
      style={{
        fontSize: '0.875rem',
        color: 'white',
        fontFamily: "'Chakra Petch', sans-serif",
        fontWeight: 500,
        direction: 'ltr',
        display: 'inline-block'
      }}
    >
      {t('transformations.after')}
    </span>
  </div>
));

const ViewToggleButton = memo(({ onClick }) => (
  <motion.button
    onClick={onClick}
    className="absolute top-6 left-6 z-10 w-14 h-14 bg-black/60 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-black/80 hover:border-white/40"
    aria-label="Switch view"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4M16 17H4m0 0l4 4m-4-4l4-4" />
    </svg>
  </motion.button>
));

// Optimized TransformationCard component
const TransformationCard = memo(({ transformation, t }) => {
  const [activeView, setActiveView] = useState('front');
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(50);
  const cardRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState({});

  // Optimized toggle view with useCallback
  const toggleView = useCallback(() => {
    setActiveView(prev => prev === 'front' ? 'back' : 'front');
  }, []);

  // Check if device is mobile - optimized with useCallback
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    
    // Throttle resize events
    let resizeTimeout;
    const handleResize = () => {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
          checkMobile();
          resizeTimeout = null;
        }, 250);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, []);

  // Optimized image loading with better caching
  useEffect(() => {
    const imageUrls = [
      transformation.images.frontBefore,
      transformation.images.frontAfter,
      transformation.images.backBefore,
      transformation.images.backAfter
    ];
    
    // Only load images we haven't loaded yet
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
    
    // Load all images in parallel
    Promise.all(imagesToLoad.map(loadImage))
      .then(() => setIsLoading(false))
      .catch(error => {
        console.error('Error loading images:', error);
        setIsLoading(false);
      });
  }, [transformation.images, imagesLoaded]);

  // Event handlers optimized with useCallback
  const handleTouchStart = useCallback((e) => {
    setIsDragging(true);
    updatePosition(e);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    updatePosition(e);
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    updatePosition(e);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    updatePosition(e);
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Memoize the updatePosition function to prevent recreating on every render
  const updatePosition = useCallback((e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percentage);
  }, []);

  // Memoize image styles to prevent recreation on each render
  const beforeImageStyle = useMemo(() => ({ 
    backgroundImage: `url(${activeView === 'front' ? transformation.images.frontBefore : transformation.images.backBefore})`,
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    filter: 'contrast(1.15) brightness(0.85) saturate(0.9)'
  }), [activeView, transformation.images]);

  const afterImageStyle = useMemo(() => ({ 
    backgroundImage: `url(${activeView === 'front' ? transformation.images.frontAfter : transformation.images.backAfter})`,
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    clipPath: `inset(0 ${100 - position}% 0 0)`,
    filter: 'contrast(1.25) brightness(0.9) saturate(1.05)'
  }), [activeView, transformation.images, position]);

  const dividerStyle = useMemo(() => ({ 
    left: `${position}%` 
  }), [position]);

  return (
    <motion.div 
      className="relative group h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="bg-gradient-to-br from-black/90 to-black/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-300 group-hover:shadow-primary/40 group-hover:border-primary/40 h-full">
        {/* Card Header with Achievement Badge */}
        <div className="relative">
          {/* Achievement Badge */}
          <div className="absolute top-4 right-4 z-10 bg-primary/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg shadow-primary/20 border border-primary/30">
            <span className="text-white text-xs font-medium">{t(transformation.achievementKey)}</span>
          </div>
          
          {/* Image Comparison */}
          <div 
            ref={cardRef}
            className="relative aspect-[4/3] cursor-col-resize touch-none select-none overflow-hidden ltr"
            style={{ direction: 'ltr' }}
            dir="ltr"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Loading State */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-20">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            {/* Before Image (Full Width) with filter */}
            <div 
              className="absolute inset-0 bg-cover bg-center will-change-transform"
              style={beforeImageStyle}
            >
              {/* Overlay for consistent color tone */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-black/15 mix-blend-multiply"></div>
              <div className="absolute inset-0 bg-primary/5 mix-blend-color"></div>
              
              {/* "Before" label with fixed position */}
              <BeforeLabel t={t} />
            </div>
            
            {/* After Image (Clipped) with filter */}
            <div 
              className="absolute inset-0 bg-cover bg-center overflow-hidden will-change-transform"
              style={afterImageStyle}
            >
              {/* Overlay with primary color tint */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-black/10 mix-blend-multiply"></div>
              <div className="absolute inset-0 bg-primary/5 mix-blend-color"></div>
              
              {/* "After" label with fixed position */}
              <AfterLabel t={t} />
            </div>
            
            {/* Master overlay for consistent app color - reduced opacity */}
            <div className="absolute inset-0 bg-black/15 mix-blend-multiply z-10 pointer-events-none"></div>
            
            {/* Divider Line */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg shadow-white/40 will-change-transform"
              style={dividerStyle}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-black border-2 border-white rounded-full flex items-center justify-center shadow-lg shadow-black/40">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* View Toggle Button */}
            <ViewToggleButton onClick={toggleView} />
          </div>
        </div>
        
        {/* Card Content */}
        <div className="p-6 pt-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-white">{t(transformation.nameKey)}</h3>
              <p className="text-gray-300 text-sm">{t(transformation.roleKey)}</p>
            </div>
            <div className="flex items-center gap-1 bg-gradient-to-r from-primary/20 to-primary/10 px-3 py-1 rounded-full border border-primary/30">
              <span className="text-primary text-sm font-medium">{t(transformation.durationKey)}</span>
            </div>
          </div>
          
          <p className="text-gray-300 text-sm">
            {t(transformation.storyKey)}
          </p>
        </div>
      </div>
    </motion.div>
  );
});

export default Transformations; 