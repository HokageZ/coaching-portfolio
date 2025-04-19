import React, { useMemo } from 'react';

/**
 * Static Patterns component creates a static background with patterns
 * All animations have been removed for performance
 */
const StaticPatterns = ({ 
  count = 12, 
  className = '',
  color = 'primary',
  minSize = 20,
  maxSize = 50,
  minOpacity = 0.03,
  maxOpacity = 0.15
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
      
      const size = r1 * (maxSize - minSize) + minSize;
      const opacity = r2 * (maxOpacity - minOpacity) + minOpacity;
      
      return {
        id: i,
        x: r1 * 100,
        y: r2 * 100,
        size,
        opacity,
        rotation: Math.floor(r2 * 360),
        type: i % 3 // Three pattern types
      };
    });
  }, [count, initialSeed, maxSize, minSize, maxOpacity, minOpacity]);

  // Color for patterns
  const colorValue = color === 'primary' ? '#B60D0D' : color;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {patterns.map(pattern => (
        <div 
          key={pattern.id}
          className="absolute pointer-events-none"
          style={{
            width: `${pattern.size}px`,
            height: `${pattern.size}px`,
            left: `${pattern.x}%`,
            top: `${pattern.y}%`,
            opacity: pattern.opacity,
            transform: `rotate(${pattern.rotation}deg)`
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
        </div>
      ))}
    </div>
  );
};

// Memoize the entire component to prevent re-renders
export default React.memo(StaticPatterns); 