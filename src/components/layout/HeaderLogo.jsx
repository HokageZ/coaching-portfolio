import React from 'react';

/**
 * HeaderLogo component with DR FARES COACHING branding
 * Always using English font regardless of the current language
 */
const HeaderLogo = ({ isScrolled = false }) => {
  return (
    <div className="flex items-center justify-center ltr">
      <div className="logo-area mx-4 flex flex-col items-center">
        <h2 className={`font-chakra ${isScrolled ? 'text-xl' : 'text-2xl md:text-3xl'} transition-all duration-300 leading-none`}>
          <span className="text-primary mr-1">DR</span>
          <span>FARES</span> 
        </h2>
        <span className={`${isScrolled ? 'text-xs' : 'text-sm'} font-light transition-all duration-300 tracking-wider`}>COACHING</span>
      </div>
    </div>
  );
}

export default HeaderLogo;