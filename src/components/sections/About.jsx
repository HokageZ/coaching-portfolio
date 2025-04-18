import { useState, useContext, useEffect, useMemo, memo } from 'react';
import { ScrollContext } from '../../App';
import SectionAnimator from '../animations/SectionAnimator';
import coachPic from '../../assets/profile-photo.jpg';
import { useLanguage } from '../../context/LanguageContext';

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
    <div 
      className="flex items-center gap-3 text-xl text-gray-300"
    >
      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
      <span>{qualification}</span>
    </div>
  );
});

// Memoized AboutContent component
const AboutContent = memo(({ qualifications, t }) => {
  const content = useMemo(() => (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="aspect-w-4 aspect-h-5 rounded-lg overflow-hidden shadow-red border border-gray-800">
            <img
              src={coachPic}
              alt={t('about.image_alt')}
              className="object-cover w-full h-full"
              loading="lazy" 
              decoding="async"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-primary p-4 rounded-lg shadow-red pulse-glow">
            <p 
              className="text-white text-lg font-bold english-text ltr brand-name" 
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
        </div>

        <div>
          <h2 className="text-4xl font-bold text-white mb-6">
            {t('about.title')} <span className="gradient-text">{t('about.me')}</span>
          </h2>
          
          <div className="space-y-4 mb-8">
            {qualifications.map((qualification, index) => (
              <Qualification 
                key={index}
                qualification={qualification}
              />
            ))}
          </div>

          <p className="text-gray-300 mb-6 text-lg">
            {t('about.description')}
          </p>
        </div>
      </div>
    </div>
  ), [qualifications, t]);

  return content;
});

const About = () => {
  const { visibleSections } = useContext(ScrollContext);
  const isVisible = visibleSections['about'] !== false;
  const { t } = useLanguage();

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
      className="bg-black relative"
    >
      <div className="content-padding">
        <AboutContent 
          qualifications={qualifications}
          t={t}
        />
      </div>
    </SectionAnimator>
  );
};

export default About; 