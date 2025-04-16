import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const YouTubeFacade = ({ videoId, title }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Reset state when videoId changes
    setIsLoaded(false);
    setError(false);
  }, [videoId]);

  const handleClick = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setError(true);
  };

  if (error) {
    return (
      <div className="relative w-full pt-[56.25%] bg-black/20 rounded-2xl overflow-hidden flex items-center justify-center">
        <p className="text-white">Video unavailable</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative w-full pt-[56.25%] cursor-pointer group"
        onClick={handleClick}
      >
        <div className="absolute inset-0 bg-black/20 rounded-2xl overflow-hidden">
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
              <svg
                className="w-8 h-8 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative w-full pt-[56.25%] rounded-2xl overflow-hidden">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default YouTubeFacade; 