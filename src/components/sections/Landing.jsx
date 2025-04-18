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
      ref={landingRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-neutral-900"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-background/80 to-background z-0"></div>
      
      {/* Texture overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.2]">
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

      <div className="relative z-10 container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              {t('landing.title.break')} <span className="text-primary">{t('landing.title.your')}</span> {t('landing.title.limits')}
            </h1>
            <p className="text-xl md:text-2xl text-white/80">
              {t('landing.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#footer"
                className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
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
              </a>
              
              <a
                href="#about"
                className="w-full sm:w-auto bg-transparent text-white border-2 border-white/30 hover:border-white/50 font-bold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                onClick={(e) => {
                  e.preventDefault();
                  const about = document.getElementById('about');
                  if (about) {
                    about.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span className="font-bold tracking-wide">{t('about.title')}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* YouTube Video Section */}
        <div className="w-full max-w-[900px] mx-auto mt-16">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/5">
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
      
      {/* Bottom wave/gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Landing; 