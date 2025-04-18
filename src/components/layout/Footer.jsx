import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const { t, dir, language } = useLanguage();
  
  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
      setShowScrollButton(position > 300);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
      const padding = 20;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight - padding;
      
      const duration = 800;
      const start = window.pageYOffset;
      const distance = offsetPosition - start;
      const startTime = performance.now();
      
      function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeInOutCubic = progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        window.scrollTo(0, start + distance * easeInOutCubic);
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      }
      
      window.requestAnimationFrame(step);
      
      window.history.pushState(null, null, `#${id}`);
    }
  };
  
  const scrollToPackages = () => {
    handleScrollToSection('packages');
  };
  
  const navLinks = [
    { name: t('nav.home'), url: "home", ariaLabel: "Navigate to home section" },
    { name: t('nav.services'), url: "services", ariaLabel: "Learn about our services" },
    { name: t('nav.transformations'), url: "transformations", ariaLabel: "See transformation stories" },
    { name: t('nav.packages'), url: "packages", ariaLabel: "View our pricing packages" },
    { name: t('nav.faq'), url: "faq", ariaLabel: "Frequently asked questions" }
  ];
  
  const legalLinks = [
    { name: t('footer.privacy'), url: "#" },
    { name: t('footer.terms'), url: "#" },
    { name: t('footer.cookies'), url: "#" }
  ];
  
  const socialLinks = [
    { name: "Instagram", url: "https://www.instagram.com/dr_fares_coaching", icon: "instagram" },
    { name: "TikTok", url: "https://www.tiktok.com/@faresrezk94", icon: "tiktok" },
    { name: "YouTube", url: "https://www.youtube.com/@drfaresrezq", icon: "youtube" },
    { 
      name: "WhatsApp", 
      url: `https://wa.me/201099488562?text=${encodeURIComponent(t('whatsapp.general'))}`, 
      icon: "whatsapp" 
    }
  ];
  
  // Social media icon components
  const SocialIcon = ({ type }) => {
    switch(type) {
      case 'instagram':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        );
      case 'tiktok':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
          </svg>
        );
      case 'youtube':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      case 'whatsapp':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  // Handle keyboard navigation in footer links
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.classList.contains('footer-nav-link') && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        const sectionId = e.target.getAttribute('data-section');
        handleScrollToSection(sectionId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Social Icon Card Component
  const SocialIconCard = ({ link, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <a 
        href={link.url}
        className="relative"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={`Visit our ${link.name} page`}
      >
        {/* Glass Card Style */}
        <div className="glass-card w-14 h-14 flex items-center justify-center rounded-xl overflow-hidden relative"
          style={{
            boxShadow: isHovered ? '0 10px 20px -5px rgba(182, 13, 13, 0.2)' : 'none'
          }}
        >
          {/* Background glow effect */}
          <div 
            className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-primary/0 via-primary/20 to-primary/0 z-0 blur-xl"
            style={{ opacity: isHovered ? 0.7 : 0 }}
          />
          
          {/* Card accent */}
          <div 
            className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/30 via-primary to-primary/30"
            style={{ transform: isHovered ? 'scaleX(1)' : 'scaleX(0)' }}
          />
          
          {/* Icon Container */}
          <div 
            className="relative z-10"
            style={{ 
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              color: isHovered ? '#B60D0D' : '#ffffff'
            }}
          >
            <SocialIcon type={link.icon} />
          </div>
          
          {/* Corner accent */}
          <div 
            className="absolute bottom-0 right-0 w-6 h-6 z-0 opacity-20"
            style={{ 
              background: 'radial-gradient(circle at bottom right, rgba(182, 13, 13, 0.5), transparent 70%)',
              opacity: isHovered ? 0.4 : 0.1,
              transform: isHovered ? 'scale(1.2)' : 'scale(1)'
            }}
          />
        </div>
      </a>
    );
  };

  return (
    <footer id="footer" className="relative overflow-hidden bg-black">
      {/* Modern glass/blur overlay */}
      <div className="absolute inset-0 bg-black z-0"></div>
      
      {/* Glowing red line at top */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_10px_rgba(182,13,13,0.5)]"></div>
      
      {/* Dynamic grid pattern */}
      <div className="absolute inset-0 z-0 opacity-8" 
        style={{ 
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)`, 
          backgroundSize: '30px 30px',
          backgroundPosition: 'center center'
        }}
      />
      
      {/* Red accent lighting effects - stronger look */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full h-40 bg-primary/40 rounded-full blur-[120px] opacity-50"></div>
      
      <div className="container mx-auto px-6 relative z-10 py-10">
        {/* Main content area */}
        <div className="flex flex-col items-center">
          {/* Logo with shadow effect - Completely independent of language context */}
          <div 
            className="mb-6 text-center brand-name english-text ltr dr-fares-coaching-container"
            style={{ 
              direction: 'ltr',
              fontFamily: 'var(--font-english) !important'
            }}
            lang="en"
            dir="ltr"
          >
            <h2 
              className="text-4xl font-bold tracking-wide leading-none dr-fares-title font-english" 
              lang="en" 
              dir="ltr"
              style={{ fontFamily: 'var(--font-english) !important' }}
            >
              <span 
                className="text-primary drop-shadow-[0_0_8px_rgba(182,13,13,0.3)] mr-2 dr-text"
                style={{ fontFamily: 'var(--font-english) !important' }}
              >
                DR
              </span> 
              <span 
                className="text-white fares-text"
                style={{ fontFamily: 'var(--font-english) !important' }}
              >
                FARES
              </span>
            </h2>
            <p 
              className="text-white/80 text-lg font-light mt-1 tracking-wider coaching-text font-english" 
              lang="en" 
              dir="ltr"
              style={{ fontFamily: 'var(--font-english) !important' }}
            >
              COACHING
            </p>
          </div>
          
          {/* Social Media Icons - Glass Card Style */}
          <div className="flex flex-col items-center mb-4">
            <p className={`text-gray-400 text-sm font-light mb-4 ${language === 'en' ? 'font-english' : ''}`} 
               style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>{t('footer.connect')}</p>
            <div className="flex justify-center gap-4">
              {socialLinks.map((link, index) => {
                return (
                  <SocialIconCard key={index} link={link} index={index} />
                );
              })}
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-center text-gray-600 text-sm">
            <span className={`${language === 'en' ? 'font-english' : ''}`} style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
              &copy; {new Date().getFullYear()} 
            </span> 
            <span className="font-english ltr dr-fares-coaching-text brand-name" style={{ direction: 'ltr', display: 'inline-block' }} lang="en">
              DR FARES COACHING
            </span>
            <span className={`${language === 'en' ? 'font-english' : ''}`} style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
              . {t('footer.rights')}
            </span>
          </div>
        </div>
      </div>
      
      {/* Back to top button - Premium Glass Style */}
      {showScrollButton && (
        <button
          className="fixed bottom-6 right-6 w-12 h-12 glass-card rounded-xl flex items-center justify-center text-white z-50 overflow-hidden group"
          onClick={handleScrollToTop}
          aria-label="Back to top"
        >
          <div className="relative z-10">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </div>
        </button>
      )}
    </footer>
  );
};

export default Footer; 