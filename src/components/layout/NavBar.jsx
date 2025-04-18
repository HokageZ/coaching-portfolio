import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeaderLogo from './HeaderLogo';
import { useLanguage } from '../../context/LanguageContext';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const { language, setLanguage, t } = useLanguage();
  const navRef = useRef(null);
  const scrollHandlerRef = useRef(null);
  const ticking = useRef(false);
  const scrollTimer = useRef(null);
  const sectionRefs = useRef([]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isMobileMenuOpen]);

  // Cache section elements on mount
  useEffect(() => {
    sectionRefs.current = Array.from(document.getElementsByTagName('section'))
      .filter(section => section.getAttribute('id'));
  }, []);

  const handleScroll = useCallback(() => {
    if (scrollTimer.current) clearTimeout(scrollTimer.current);

    if (!ticking.current) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        
        // Hide/show navbar on scroll with debounce
        if (scrollY > 300) {
          if (scrollY > prevScrollY + 15 && !isMobileMenuOpen) {
            setIsNavVisible(false);
          } else if (scrollY < prevScrollY - 5 || isMobileMenuOpen) {
            setIsNavVisible(true);
          }
        } else {
          setIsNavVisible(true);
        }
        
        setPrevScrollY(scrollY);
        setIsScrolled(scrollY > 20);
      
        // Detect which section is in view
        scrollTimer.current = setTimeout(() => {
          const viewportHeight = window.innerHeight;
          const scrollPosition = window.pageYOffset;
          const scrollBottom = scrollPosition + viewportHeight;
          
          let currentSectionId = null;
          let maxVisibleArea = 0;
          
          sectionRefs.current.forEach(section => {
            const sectionId = section.getAttribute('id');
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionBottom = sectionTop + sectionHeight;
            
            const visibleTop = Math.max(scrollPosition, sectionTop);
            const visibleBottom = Math.min(scrollBottom, sectionBottom);
            const visibleArea = Math.max(0, visibleBottom - visibleTop);
            
            const topProximityBonus = Math.max(0, 1 - (Math.abs(scrollPosition - sectionTop) / viewportHeight));
            const weightedVisibleArea = visibleArea * (1 + topProximityBonus);
            
            if (weightedVisibleArea > maxVisibleArea) {
              maxVisibleArea = weightedVisibleArea;
              currentSectionId = sectionId;
            }
          });
          
          if (currentSectionId && currentSectionId !== activeSection) {
            setActiveSection(currentSectionId);
            window.history.replaceState(null, null, `#${currentSectionId}`);
          }
        }, 100);
        
        ticking.current = false;
      });
      
      ticking.current = true;
    }
  }, [activeSection, isMobileMenuOpen, prevScrollY]);

  useEffect(() => {
    scrollHandlerRef.current = handleScroll;
    
    const onScroll = () => scrollHandlerRef.current();
    window.addEventListener('scroll', onScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, [handleScroll]);

  // Check for URL hash on initial load
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(hash);
        }, 500);
      }
    }
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = navRef.current?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      // First close the mobile menu
      setIsMobileMenuOpen(false);
      
      // Wait for the menu to close before scrolling
      setTimeout(() => {
        window.scrollTo({
          top: id === 'footer' ? document.body.scrollHeight : offsetPosition,
          behavior: 'smooth'
        });
        
        window.history.pushState(null, null, `#${id}`);
        setActiveSection(id);
      }, 300); // Wait for the menu animation to complete
    }
  };

  // Toggle language function
  const toggleLanguage = useCallback(() => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    // Local storage is now handled in the context
  }, [language, setLanguage]);

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Tab' && !e.shiftKey && navItems.length > 0) {
        const activeIndex = navItems.findIndex(item => item.id === activeSection);
        if (activeIndex >= 0 && activeIndex < navItems.length - 1) {
          document.querySelector(`[data-section="${navItems[activeIndex + 1].id}"]`)?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection]);

  // Navigation item data
  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'services', label: t('nav.services') },
    { id: 'transformations', label: t('nav.transformations') },
    { id: 'feedback', label: t('nav.feedback') },
    { id: 'packages', label: t('nav.packages') },
    { id: 'faq', label: t('nav.faq') },
    { id: 'footer', label: t('nav.contact') }
  ];

  // Common animation properties
  const animations = {
    desktop: {
      initial: { opacity: 0, y: -10 },
      animate: { opacity: 1, y: 0 },
      hover: { scale: 1.05 }
    },
    mobile: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      tap: { scale: 0.98 }
    }
  };

  // Common navigation item component
  const NavItem = ({ item, index, isMobile }) => {
    const anim = isMobile ? animations.mobile : animations.desktop;
    const classes = isMobile
      ? `w-full py-4 flex items-center justify-between border-b border-white/10 ${
          activeSection === item.id ? 'text-primary' : 'text-white'
        }`
      : `text-sm font-medium transition-all duration-200 relative overflow-hidden py-2 px-1 ${
          activeSection === item.id ? 'text-white' : 'text-gray-400 hover:text-white'
        }`;

    return (
      <motion.button
        onClick={() => scrollToSection(item.id)}
        className={classes}
        initial={anim.initial}
        animate={anim.animate}
        transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
        whileHover={!isMobile ? anim.hover : undefined}
        whileTap={isMobile ? anim.tap : undefined}
        aria-label={`Navigate to ${item.label} section`}
        aria-current={activeSection === item.id ? 'page' : undefined}
        data-section={item.id}
        tabIndex={!isMobile ? 0 : undefined}
        onKeyDown={!isMobile ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') scrollToSection(item.id);
        } : undefined}
      >
        {isMobile ? (
          <>
            <span className="text-xl font-medium">{item.label}</span>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activeSection === item.id ? 'bg-primary/20 text-primary' : 'text-gray-400'
              }`}
              aria-hidden="true"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </>
        ) : (
          <>
            {item.label}
            <span 
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform duration-200 ${
                activeSection === item.id ? 'scale-x-100' : 'scale-x-0'
              } origin-left`}
              aria-hidden="true"
            ></span>
          </>
        )}
      </motion.button>
    );
  };

  // Language toggle button component
  const LanguageToggle = ({ isMobile }) => {
    const anim = isMobile ? animations.mobile : animations.desktop;
    const classes = isMobile
      ? "w-full py-4 flex items-center justify-between border-b border-white/10 mt-4 relative overflow-hidden"
      : "text-sm font-medium transition-all duration-200 relative py-2 px-3 ml-2 rounded-full bg-white/5 hover:bg-white/10 flex items-center gap-2 overflow-hidden";
    
    return (
      <motion.button
        onClick={toggleLanguage}
        className={classes}
        initial={anim.initial}
        animate={anim.animate}
        transition={{ delay: 0.3 + navItems.length * 0.1, duration: 0.3 }}
        whileHover={!isMobile ? anim.hover : undefined}
        whileTap={isMobile ? anim.tap : undefined}
        aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'} language`}
      >
        {isMobile ? (
          <>
            <span className="text-xl font-medium">
              {language === 'en' ? 'English' : 'العربية'}
            </span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/20 text-primary">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
          </>
        ) : (
          <div className="relative z-10 flex items-center gap-2">
            <span>
              {language === 'en' ? 'EN' : 'عربي'}
            </span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </div>
        )}
        <motion.div 
          className={`absolute inset-0 ${isMobile ? 'bg-primary/5' : 'bg-primary/10'} z-0`}
          initial={{ x: language === 'en' ? '100%' : '-100%' }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    );
  };

  const toggleMobileMenu = () => {
    if (!isMobileMenuOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.overflow = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Cleanup effect for mobile menu
  useEffect(() => {
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY) * -1);
      }
    };
  }, []);

  return (
    <>
      <motion.nav 
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-black ${
          isScrolled ? 'py-2 shadow-lg border-b border-gray-800/30' : 'py-3'
        } ltr`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isNavVisible ? 0 : -100, opacity: isNavVisible ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        role="navigation"
        aria-label="Main navigation"
        style={{ direction: 'ltr' }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: 0.3,
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
            >
              <HeaderLogo isScrolled={isScrolled} />
            </motion.div>
            
            {/* Skip to content link for accessibility */}
            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-1/2 focus:transform focus:-translate-x-1/2 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:z-50"
            >
              Skip to main content
            </a>
            
            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.4 + index * 0.1,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  <NavItem item={item} index={index} isMobile={false} />
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.4 + navItems.length * 0.1,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <LanguageToggle isMobile={false} />
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button 
              onClick={toggleMobileMenu}
              className="md:hidden relative z-50 flex items-center justify-center w-10 h-10 rounded-full overflow-hidden bg-primary/10 border border-primary/10"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.6,
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }}
              whileTap={{ scale: 0.95 }}
              style={{ marginRight: '-4px' }}
            >
              <span className="sr-only">{isMobileMenuOpen ? "Close menu" : "Open menu"}</span>
              <div className="w-5 h-5 flex flex-col items-center justify-center">
                <span
                  className={`block h-0.5 w-5 bg-white transform transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-5 bg-white transform transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-5 bg-white transform transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
                  }`}
                ></span>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Interactive background indicator */}
        {isScrolled && (
          <motion.div 
            className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        )}

        {/* Glowing line for landing section */}
        {activeSection === 'home' && !isScrolled && (
          <motion.div 
            className="absolute bottom-0 left-0 w-full h-[3px] z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"
              style={{
                boxShadow: '0 0 15px 2px rgba(182, 13, 13, 0.7), 0 0 25px 4px rgba(182, 13, 13, 0.5)'
              }}
            />
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm"
              style={{
                boxShadow: '0 0 20px 3px rgba(182, 13, 13, 0.4)'
              }}
            />
          </motion.div>
        )}
      </motion.nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            id="mobile-menu"
            className="fixed inset-0 bg-black/95 backdrop-blur-lg z-40 flex flex-col md:hidden ltr"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            role="dialog"
            aria-label="Mobile navigation menu"
            style={{ direction: 'ltr' }}
          >
            <div className="h-16 mt-2" aria-hidden="true" /> {/* Space for navbar */}
            
            <div className="flex flex-col flex-1 px-6 pt-8 pb-10">
              <div 
                className="w-12 h-1 bg-primary/30 rounded-full mx-auto mb-8"
                aria-hidden="true"
              />
              
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <NavItem key={item.id} item={item} index={index} isMobile={true} />
                ))}
                <LanguageToggle isMobile={true} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar; 