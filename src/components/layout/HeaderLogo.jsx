import React from 'react';

/**
 * HeaderLogo component with DR FARES COACHING branding
 * Always using Chakra Petch font regardless of the current language
 */
const HeaderLogo = ({ isScrolled = false }) => {
  return (
    <div className="flex items-center justify-center ltr" lang="en" dir="ltr">
      <div className="logo-area mx-4 flex flex-col items-center">
        <div className={`font-english english-text ${isScrolled ? 'text-xl' : 'text-2xl md:text-3xl'} transition-all duration-300 leading-none`}>
          <span className="text-primary mr-1 brand-name dr-text">DR</span>
          <span className="brand-name fares-text">FARES</span> 
        </div>
        <span className={`${isScrolled ? 'text-xs' : 'text-sm'} font-light transition-all duration-300 tracking-wider brand-name coaching-text`}>
          COACHING
        </span>
      </div>
    </div>
  );
}

export default HeaderLogo;