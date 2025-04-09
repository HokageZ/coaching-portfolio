import React, { useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * AnimatedPatterns component creates a dynamic background with patterns
 * Heavily optimized for smooth scrolling performance
 */
const AnimatedPatterns = ({ 
  count = 12, 
  className = '',
  color = 'primary',
  minSize = 20,
  maxSize = 50,
  minOpacity = 0.03,
  maxOpacity = 0.15,
  animate = true
}) => {
  // Use a fixed seed for random number generation to prevent re-renders
  const initialSeed = useMemo(() => 12345, []); // Using fixed seed for consistent patterns
  
  // Generate deterministic patterns with minimal properties
  const patterns = useMemo(() => {
    // Simple pseudo-random function
    const random = (seed, i) => ((seed * 9301 + 49297 * (i + 1)) % 233280) / 233280;
    
    // Limit pattern count for performance
    const actualCount = Math.min(count, 12);
    
    return Array.from({ length: actualCount }, (_, i) => {
      const r1 = random(initialSeed, i);
      const r2 = random(initialSeed, i + actualCount);
      const r3 = random(initialSeed, i + actualCount * 2);
      
      const size = r1 * (maxSize - minSize) + minSize;
      const opacity = r2 * (maxOpacity - minOpacity) + minOpacity;
      
      return {
        id: i,
        x: r1 * 100,
        y: r2 * 100,
        size,
        opacity,
        rotation: Math.floor(r2 * 360),
        direction: r1 > 0.5 ? 1 : -1,
        type: i % 3, // Three pattern types
        animationDelay: r3 * 2, // Random delay between 0-2s
        animationDuration: 20 + r2 * 10 // Random duration between 20-30s
      };
    });
  }, [count, initialSeed, maxSize, minSize, maxOpacity, minOpacity]);

  // Color for patterns
  const colorValue = color === 'primary' ? '#B60D0D' : color;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {patterns.map(pattern => (
        <motion.div 
          key={pattern.id}
          className="absolute pointer-events-none"
          initial={{ 
            x: `${pattern.x}%`, 
            y: `${pattern.y}%`,
            opacity: 0,
            scale: 0.8
          }}
          animate={{ 
            x: animate ? [`${pattern.x}%`, `${(pattern.x + 5 * pattern.direction)}%`] : `${pattern.x}%`,
            y: animate ? [`${pattern.y}%`, `${(pattern.y + 5 * pattern.direction)}%`] : `${pattern.y}%`,
            opacity: pattern.opacity,
            scale: 1,
            rotate: animate ? [pattern.rotation, pattern.rotation + (360 * pattern.direction)] : pattern.rotation
          }}
          transition={{
            duration: pattern.animationDuration,
            delay: pattern.animationDelay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
          style={{
            width: `${pattern.size}px`,
            height: `${pattern.size}px`,
          }}
        >
          {pattern.type === 0 ? (
            // X pattern with glow effect
            <div className="relative w-full h-full">
              <div 
                className="absolute inset-0 transition-opacity"
                style={{
                  borderRadius: '1px',
                  transform: 'rotate(45deg)',
                  border: `1px solid ${colorValue}`,
                  borderLeft: 0,
                  borderRight: 0,
                  boxShadow: `0 0 10px ${colorValue}20`
                }}
              />
              <div 
                className="absolute inset-0 transition-opacity"
                style={{
                  borderRadius: '1px',
                  transform: 'rotate(-45deg)',
                  border: `1px solid ${colorValue}`,
                  borderLeft: 0,
                  borderRight: 0,
                  boxShadow: `0 0 10px ${colorValue}20`
                }}
              />
            </div>
          ) : pattern.type === 1 ? (
            // Circle pattern with glow
            <div 
              className="w-full h-full rounded-full transition-opacity"
              style={{
                border: `1px solid ${colorValue}`,
                boxShadow: `0 0 10px ${colorValue}20`
              }}
            />
          ) : (
            // Diamond pattern with glow
            <div 
              className="w-full h-full transition-opacity"
              style={{
                transform: 'rotate(45deg)',
                border: `1px solid ${colorValue}`,
                boxShadow: `0 0 10px ${colorValue}20`
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

// Memoize the entire component to prevent re-renders
export default React.memo(AnimatedPatterns); 