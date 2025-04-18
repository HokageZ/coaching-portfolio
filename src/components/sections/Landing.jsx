import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Landing = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { t, language } = useLanguage();
  const landingRef = useRef(null);

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

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: `
            linear-gradient(to bottom right, rgba(0,0,0,0.95), rgba(20,20,20,0.98)),
            radial-gradient(circle at 20% 30%, rgba(50,50,50,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(50,50,50,0.1) 0%, transparent 50%)
          `,
          backgroundBlendMode: 'normal',
        }}
      >
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(40,40,40,0.05) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(40,40,40,0.05) 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, rgba(40,40,40,0.05) 75%),
              linear-gradient(-45deg, transparent 75%, rgba(40,40,40,0.05) 75%)
            `,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px',
          }}
        />
        {/* Web-inspired grid overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 z-10 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight uppercase tracking-wide">
              {t('landing.title.break').toUpperCase()} 
              <span className="text-primary block mt-1 sm:mt-2">{t('landing.title.your').toUpperCase()}</span> 
              {t('landing.title.limits').toUpperCase()}
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              {t('landing.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center mt-4 sm:mt-8">
              <a
                href="#footer"
                className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:shadow-xl text-base sm:text-lg"
                onClick={(e) => {
                  e.preventDefault();
                  const footer = document.getElementById('footer');
                  if (footer) {
                    footer.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span className="font-bold tracking-wide">{t('nav.contact')}</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </a>
              
              <a
                href="#about"
                className="w-full sm:w-auto bg-transparent text-white border-2 border-white/30 hover:border-white/50 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg"
                onClick={(e) => {
                  e.preventDefault();
                  const about = document.getElementById('about');
                  if (about) {
                    about.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span className="font-bold tracking-wide">{t('about.title')}</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>

          {/* YouTube Video Section */}
          <div className="w-full max-w-[900px] mx-auto mt-8 sm:mt-12">
            <div className="relative rounded-lg sm:rounded-2xl overflow-hidden shadow-2xl border border-white/5">
              <div className="relative w-full pt-[56.25%]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/3hIJBqjWYxQ?controls=1&modestbranding=1&showinfo=0&rel=0&t=0"
                  title="Transformation Stories"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom wave/gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-12 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Landing; 