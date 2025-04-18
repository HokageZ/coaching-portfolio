import { memo, useEffect, useState } from 'react';

const VideoBackground = memo(({ 
  src, 
  className = "", 
  scale = 1.05,
  parallaxEffect = false,
  parallaxIntensity = 0.05
}) => {
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  // Add parallax effect on mouse move
  useEffect(() => {
    if (!parallaxEffect) return;

    const handleMouseMove = (e) => {
      const x = (window.innerWidth / 2 - e.clientX) * parallaxIntensity;
      const y = (window.innerHeight / 2 - e.clientY) * parallaxIntensity;
      
      setParallaxOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [parallaxEffect, parallaxIntensity]);

  // Calculate transform style with scale and parallax
  const transformStyle = parallaxEffect
    ? `translate3d(${parallaxOffset.x}px, ${parallaxOffset.y}px, 0) scale(${scale})`
    : `scale(${scale})`;

  return (
    <video
      src={src}
      className={`w-full h-full object-cover transition-transform duration-200 ${className}`}
      autoPlay
      muted
      loop
      playsInline
      style={{
        aspectRatio: '16/9',
        objectFit: 'cover',
        transform: transformStyle,
        willChange: parallaxEffect ? 'transform' : 'auto'
      }}
    />
  );
});

export default VideoBackground; 