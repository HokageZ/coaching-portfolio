import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';

const Landing = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { t, language } = useLanguage();
  const landingRef = useRef(null);
  const videoRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  // Track scroll position and handle navigation
  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      setLastScrollPosition(currentPosition);

      // Update URL hash based on scroll position
      const sections = ['landing', 'about', 'services', 'transformations', 'packages', 'faq', 'footer'];
      const viewportHeight = window.innerHeight;
      const currentSection = sections.find((section, index) => {
        const element = document.getElementById(section) || document.querySelector(`[data-section="${section}"]`);
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        const sectionTop = currentPosition + rect.top;
        const sectionBottom = sectionTop + rect.height;
        
        return currentPosition >= sectionTop - viewportHeight/2 && currentPosition < sectionBottom - viewportHeight/2;
      });

      if (currentSection && window.location.hash !== `#${currentSection}`) {
        window.history.replaceState(null, null, `#${currentSection}`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle initial location and smooth scroll
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

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

  // Enhanced parallax effect for performance
  useEffect(() => {
    if (isSmallScreen) return;
    
    const handleMouseMove = (e) => {
      if (!landingRef.current) return;
      
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 2 - 1;
      const y = (clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isSmallScreen]);

  // Animation variants optimized for mobile - simpler animations on small screens
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isSmallScreen ? 0.1 : 0.15,
        delayChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const textItemVariants = {
    hidden: { 
      opacity: 0,
      y: isSmallScreen ? 20 : 30
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        type: isSmallScreen ? "ease-out" : "spring",
        stiffness: 100,
        damping: 12,
        duration: isSmallScreen ? 0.3 : 0.5
      }
    }
  };

  // Handle smooth scrolling for navigation
  const handleNavigation = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const targetPosition = targetElement.offsetTop;
      setLastScrollPosition(targetPosition);
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      window.history.replaceState(null, null, `#${targetId}`);
    }
  };

  return (
    <section ref={landingRef} className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center py-16 sm:py-20" id="landing" data-section="landing">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-primary/10" />
        
        {/* Animated Patterns */}
        <motion.div
          className="absolute inset-0 opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255, 0, 0, 0.15) 0%, transparent 60%),
                            radial-gradient(circle at 0% 0%, rgba(255, 0, 0, 0.1) 0%, transparent 40%),
                            radial-gradient(circle at 100% 100%, rgba(255, 0, 0, 0.1) 0%, transparent 40%)`,
            transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * 25}px)`
          }} />
        </motion.div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.2]" style={{
          backgroundImage: `linear-gradient(rgba(255, 0, 0, 0.15) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255, 0, 0, 0.15) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`
        }} />

        {/* Animated Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              initial={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                scale: 0
              }}
              animate={{
                x: [
                  Math.random() * 100 + '%',
                  Math.random() * 100 + '%',
                  Math.random() * 100 + '%'
                ],
                y: [
                  Math.random() * 100 + '%',
                  Math.random() * 100 + '%',
                  Math.random() * 100 + '%'
                ],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 10 + 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Glowing Lines */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute h-px w-1/3 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            style={{
              left: '33%',
              top: '40%',
              filter: 'blur(3px)',
              transform: `translateX(${mousePosition.x * -40}px)`
            }}
          />
          <motion.div
            className="absolute h-px w-1/3 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          style={{
              left: '33%',
              top: '60%',
              filter: 'blur(3px)',
              transform: `translateX(${mousePosition.x * 40}px)`
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
            <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="text-white block">{t('landing.title.break')} </span>
              <span className="text-primary block">{t('landing.title.your')} </span>
              <span className="text-white block">{t('landing.title.limits')}</span>
            </motion.h1>
            
            <motion.p
              className="text-lg sm:text-xl text-gray-300 mb-8 relative max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {t('landing.subtitle')}
              
                {!isSmallScreen && (
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-40 -z-10" 
                    style={{ filter: 'blur(8px)' }}></span>
                )}
              </motion.p>
              
              {!isSmallScreen && (
                <div className="flex items-center justify-center mt-8 gap-6">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '60px' }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                    className="h-[1px] bg-white/20"
                  />
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.0, duration: 0.4 }}
                    className="w-2 h-2 bg-primary rounded-full"
                  />
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '60px' }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                    className="h-[1px] bg-white/20"
                  />
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-10 justify-center">
                <motion.a
                href="#footer"
                className="group bg-primary hover:bg-primary-hover text-white font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 overflow-hidden relative tracking-wider"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  onClick={(e) => handleNavigation(e, 'footer')}
                >
                  {!isSmallScreen && (
                    <>
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-tr from-primary-hover to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                      <span className="absolute inset-0 w-full h-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 bg-white/10"></span>
                    </>
                  )}
                  
                <span className="font-bold tracking-wider relative z-10">{t('nav.contact')}</span>
                  <svg className="w-5 h-5 ml-2 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                </motion.a>
            </div>
            </motion.div>
          </div>

          <motion.div 
          className="relative w-full max-w-4xl mx-auto mt-8 sm:mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6, 
              delay: 1.0,
              type: isSmallScreen ? "ease-out" : "spring",
              stiffness: 50
            }}
          >
            {!isSmallScreen && (
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 blur-xl opacity-30 transform -translate-y-2 translate-x-2"></div>
            )}
            
            <div 
              className="relative rounded-xl overflow-hidden shadow-xl border border-white/10 transform transition-transform duration-500 hover:scale-[1.01]"
              style={{ 
                boxShadow: isSmallScreen ? 
                  "0 10px 30px -5px rgba(0, 0, 0, 0.5)" : 
                "0 20px 40px -10px rgba(255, 0, 0, 0.15), 0 30px 60px -15px rgba(0, 0, 0, 0.8)"
              }}
            >
              {!isVideoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 border-3 sm:border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              
              <div className="relative w-full pt-[56.25%] bg-black">
                <iframe
                  ref={videoRef}
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/3hIJBqjWYxQ?controls=1&modestbranding=1&showinfo=0&rel=0&t=0"
                  title="Transformation Stories"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  onLoad={() => setIsVideoLoaded(true)}
                />
              </div>
              
              {!isSmallScreen && (
                <>
                  <div className="absolute top-0 left-0 w-8 sm:w-10 h-8 sm:h-10 border-t-2 border-l-2 border-primary/60"></div>
                  <div className="absolute top-0 right-0 w-8 sm:w-10 h-8 sm:h-10 border-t-2 border-r-2 border-primary/60"></div>
                  <div className="absolute bottom-0 left-0 w-8 sm:w-10 h-8 sm:h-10 border-b-2 border-l-2 border-primary/60"></div>
                  <div className="absolute bottom-0 right-0 w-8 sm:w-10 h-8 sm:h-10 border-b-2 border-r-2 border-primary/60"></div>
                </>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-2 bg-gradient-to-r from-transparent via-primary/50 to-transparent transform"></div>
            </div>
          </motion.div>
      </div>
      
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24">
        <svg 
          className="absolute bottom-0 left-0 w-full text-background" 
          viewBox="0 0 1440 50" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M0,0 C240,50 480,50 720,25 C960,0 1200,0 1440,25 L1440,50 L0,50 Z" 
            fill="currentColor"
          />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-t from-background to-transparent"></div>
      </div>
    </section>
  );
};

export default Landing; 