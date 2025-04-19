import React from 'react';
import { motion } from 'framer-motion';

/**
 * HeaderLogo component with DR FARES COACHING branding
 * Always using Chakra Petch font regardless of the current language
 */
const HeaderLogo = () => {
  // Explicitly define the font to ensure consistency
  const logoFontStyle = {
    fontFamily: "'Chakra Petch', system-ui, sans-serif !important",
    direction: 'ltr !important',
  };

  return (
    <motion.div 
      className="flex items-center justify-center ltr font-english" 
      lang="en" 
      dir="ltr"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={logoFontStyle}
    >
      <motion.div 
        className="logo-area flex flex-col items-center relative font-english"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2 }}
        style={logoFontStyle}
      >
        <motion.div 
          className="font-english english-text text-2xl md:text-3xl leading-none relative z-10 brand-name"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
          style={logoFontStyle}
        >
          <motion.span 
            className="text-primary mr-1 brand-name dr-text relative font-english"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={logoFontStyle}
          >
            DR
            {/* Red glow effect */}
            <span className="absolute -inset-1 rounded-md bg-primary/10 filter blur-sm -z-10"></span>
          </motion.span>
          <motion.span 
            className="brand-name fares-text font-english"
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={logoFontStyle}
          >
            FARES
          </motion.span> 
        </motion.div>
        
        <motion.span 
          className="text-sm font-light tracking-wider brand-name coaching-text relative font-english"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={logoFontStyle}
        >
          <span className="relative font-english" style={logoFontStyle}>
            COACHING
            {/* Underline effect */}
            <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"></span>
          </span>
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

export default HeaderLogo;