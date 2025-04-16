import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import heroBackground from '../../assets/videos/hero-background.mp4';

const Landing = () => {
  const bgVideoRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const { t } = useLanguage();

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  useEffect(() => {
    if (bgVideoRef.current) {
      const playVideo = async () => {
        try {
          // Set a timeout to handle cases where video fails to load
          const timeoutId = setTimeout(() => {
            if (!videoLoaded) {
              console.warn("Video loading timeout - switching to fallback");
              setVideoError(true);
            }
          }, 5000);

          // Ensure video is ready to play
          if (bgVideoRef.current.readyState < 3) {
            await new Promise((resolve) => {
              bgVideoRef.current.addEventListener('canplaythrough', resolve, { once: true });
            });
          }

          bgVideoRef.current.playbackRate = 1.15;
          await bgVideoRef.current.play();
          clearTimeout(timeoutId);
          console.log("Background video started playing at 1.15x speed");
        } catch (error) {
          console.error("Background video autoplay failed:", error);
          setVideoError(true);
        }
      };

      if (videoLoaded) {
        playVideo();
      }
    }
  }, [videoLoaded]);

  const handleVideoError = (e) => {
    console.error("Video error:", e);
    setVideoError(true);
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    console.log("Video loaded successfully");
  };

  return (
    <section id="home" className="relative min-h-screen w-full bg-background overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        {!videoError ? (
          <video
            ref={bgVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ 
              filter: 'brightness(0.6) contrast(1.1) sepia(0.3) hue-rotate(-30deg)',
              opacity: videoLoaded ? 1 : 0,
              transform: 'scale(1.1)', // Slightly zoom to prevent edges
              objectPosition: 'center'
            }}
          >
            <source src={heroBackground} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-background/50 to-background/30" />
        )}
      </div>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-background/30 to-background z-0"></div>
      
      {/* Texture overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.1]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}
        ></div>
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23B60D0D' fill-opacity='0.1'%3E%3Cpath d='M0 0h20L0 20z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '20px 20px'
          }}
        ></div>
      </div>
      
      {/* Main content container */}
      <div className="container relative z-10 min-h-screen flex flex-col items-center justify-center">
        
        {/* Hero Text Section */}
        <div className="w-full max-w-[800px] mx-auto px-4 sm:px-6 text-center mb-8 sm:mb-12 md:mt-20">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white uppercase tracking-tighter mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t('landing.title.break')}
            </motion.span>
            <motion.span 
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="text-primary">{t('landing.title.your')}</span> {t('landing.title.limits')}
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {t('landing.subtitle')}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.a
              href="#footer"
              className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white text-lg font-bold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, backgroundColor: "#950B0B" }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                const footer = document.getElementById('footer');
                if (footer) {
                  footer.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span className="font-bold tracking-wide">{t('nav.contact')}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </motion.a>
            
            <motion.a
              href="#services"
              className="w-full sm:w-auto bg-transparent text-white border-2 border-white/30 hover:border-white/50 text-lg font-bold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.8)" }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-bold tracking-wide">{t('services.title')}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
        
        {/* Simplified Video Section */}
        <motion.div
          className="w-full px-4 sm:px-6 mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="w-full max-w-[900px] mx-auto">
            <div className="relative rounded-2xl overflow-hidden">
              <div className="relative w-full pt-[56.25%]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/3hIJBqjWYxQ?controls=1&modestbranding=1&showinfo=0&rel=0&t=0"
                  title="Transformation Stories"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Landing; 