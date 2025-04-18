import { memo } from 'react';

const WaveTransition = memo(({ 
  fillColor = "#171717", 
  position = "bottom",
  height = "120px",
  className = "",
  inverted = false,
  opacity = 1
}) => {
  const getPath = () => {
    if (inverted) {
      return position === "bottom" 
        ? "M0,0L48,16C96,32,192,64,288,80C384,96,480,96,576,80C672,64,768,32,864,32C960,32,1056,64,1152,85.3C1248,107,1344,117,1392,122.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        : "M0,128L48,112C96,96,192,64,288,58.7C384,53,480,75,576,90.7C672,107,768,117,864,128C960,139,1056,149,1152,138.7C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z";
    }
    
    return position === "bottom" 
      ? "M0,128L48,122.7C96,117,192,107,288,122.7C384,139,480,181,576,176C672,171,768,117,864,96C960,75,1056,85,1152,90.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      : "M0,320L48,293.3C96,267,192,213,288,186.7C384,160,480,160,576,176C672,192,768,224,864,234.7C960,245,1056,235,1152,202.7C1248,171,1344,117,1392,90.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z";
  };

  const positionStyles = {
    bottom: { bottom: -2, left: 0 },
    top: { top: -2, left: 0 },
  };

  return (
    <div 
      className={`absolute w-full overflow-hidden ${className}`} 
      style={{ 
        ...positionStyles[position],
        height,
        zIndex: 10,
      }}
    >
      <svg 
        className="absolute w-full h-full" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{
          transform: position === "top" ? "translateY(-1px)" : "translateY(1px)" 
        }}
      >
        <path 
          fill={fillColor} 
          fillOpacity={opacity} 
          d={getPath()}
        />
      </svg>
    </div>
  );
});

export default WaveTransition; 