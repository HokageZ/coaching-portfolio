import { useState, useContext, useEffect, useMemo, memo } from 'react';
import { ScrollContext } from '../../App';
import SectionAnimator from '../animations/SectionAnimator';
import coachPic from '../../assets/profile-photo.jpg';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';

/**
 * This is a placeholder component since the About section has been 
 * integrated directly into the Landing component for a more 
 * seamless design and better user experience.
 * 
 * We keep this file for backward compatibility with the router
 * and other components that might reference it.
 */

// Memoized Qualification component
const Qualification = memo(({ qualification }) => {
  return (
    <div className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl text-gray-300">
      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full flex-shrink-0" />
      <span>{qualification}</span>
    </div>
  );
});

// Memoized AboutContent component
const AboutContent = memo(({ qualifications, t, isSmallScreen }) => {
  // Simplified animations for mobile
  const imageVariants = {
    hidden: { opacity: 0, y: isSmallScreen ? 20 : 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: isSmallScreen ? 0.4 : 0.6,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: isSmallScreen ? 20 : 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: isSmallScreen ? 0.4 : 0.6,
        delay: isSmallScreen ? 0.2 : 0.3,
        ease: "easeOut"
      }
    }
  };

  const qualificationVariants = {
    hidden: { opacity: 0 },
    visible: (index) => ({
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.4 + (index * (isSmallScreen ? 0.1 : 0.15))
      }
    })
  };

  const content = useMemo(() => (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <motion.div 
          className="relative"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        >
          <div className="aspect-w-4 aspect-h-5 rounded-lg overflow-hidden shadow-red border border-gray-800">
            <img
              src={coachPic}
              alt={t('about.image_alt')}
              className="object-cover w-full h-full"
              loading="lazy" 
              decoding="async"
              width="600"
              height="750"
            />
          </div>
          <div className="absolute -bottom-3 sm:-bottom-6 -right-3 sm:-right-6 bg-primary p-3 sm:p-4 rounded-lg shadow-red">
            <p 
              className="text-white text-base sm:text-lg font-bold english-text ltr brand-name" 
              style={{ 
                direction: 'ltr',
                fontFamily: 'var(--font-english) !important',
                fontWeight: '700'
              }}
              lang="en"
              dir="ltr"
            >
              {t('about.certified_coach')}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
            {t('about.title')} <span className="gradient-text">{t('about.me')}</span>
          </h2>
          
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            {qualifications.map((qualification, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={qualificationVariants}
              >
                <Qualification qualification={qualification} />
              </motion.div>
            ))}
          </div>

          <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6">
            {t('about.description')}
          </p>
        </motion.div>
      </div>
    </div>
  ), [qualifications, t, imageVariants, textVariants, qualificationVariants, isSmallScreen]);

  return content;
});

const About = () => {
  const { visibleSections } = useContext(ScrollContext);
  const isVisible = visibleSections['about'] !== false;
  const { t } = useLanguage();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Check for small screen size
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

  const qualifications = useMemo(() => [
    t('about.qualification.1'),
    t('about.qualification.2'),
    t('about.qualification.3'),
    t('about.qualification.4')
  ], [t]);

  return (
    <SectionAnimator
      id="about"
      showTitle={false}
      className="bg-black relative py-10 sm:py-16 md:py-20"
    >
      <div className="content-padding">
        <AboutContent 
          qualifications={qualifications}
          t={t}
          isSmallScreen={isSmallScreen}
        />
      </div>
    </SectionAnimator>
  );
};

export default About; 