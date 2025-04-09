import { useState, useContext, useEffect } from 'react';
import { ScrollContext } from '../../App';
import SectionAnimator from '../animations/SectionAnimator';
import coachPic from '../../assets/profile-photo.jpg';
import { useLanguage } from '../../context/LanguageContext';

const About = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const { visibleSections } = useContext(ScrollContext);
  const isVisible = visibleSections['about'];
  const { t } = useLanguage();
  
  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isVisible, hasAnimated]);

  const qualifications = [
    t('about.qualification.1'),
    t('about.qualification.2'),
    t('about.qualification.3'),
    t('about.qualification.4')
  ];

  const AboutContent = () => (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative" 
          style={{
            transitionDelay: '200ms',
            opacity: hasAnimated ? 1 : 0,
            transform: hasAnimated ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease'
          }}>
          <div className="aspect-w-4 aspect-h-5 rounded-lg overflow-hidden shadow-red border border-gray-800">
            <img
              src={coachPic}
              alt="Professional Coach"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-primary p-4 rounded-lg shadow-red pulse-glow">
            <p className="text-white text-lg font-semibold font-chakra ltr brand-name" style={{ direction: 'ltr' }}>Certified Coach</p>
          </div>
        </div>

        <div style={{
          transitionDelay: '400ms',
          opacity: hasAnimated ? 1 : 0,
          transform: hasAnimated ? 'translateX(0)' : 'translateX(40px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}>
          <h2 className="text-4xl font-bold text-white mb-6 font-chakra">{t('about.title')} <span className="gradient-text">{t('about.me')}</span></h2>
          
          {/* Qualifications List */}
          <div className="space-y-4 mb-8">
            {qualifications.map((qualification, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 text-xl text-gray-300 font-chakra"
                style={{
                  transitionDelay: `${600 + index * 100}ms`,
                  opacity: hasAnimated ? 1 : 0,
                  transform: hasAnimated ? 'translateX(0)' : 'translateX(20px)',
                  transition: 'opacity 0.8s ease, transform 0.8s ease'
                }}
              >
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                <span>{qualification}</span>
              </div>
            ))}
          </div>

          <p className="text-gray-300 mb-6 font-chakra text-lg">
            {t('about.description')}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <SectionAnimator
      id="about"
      showTitle={false}
    >
      <AboutContent />
    </SectionAnimator>
  );
};

export default About; 