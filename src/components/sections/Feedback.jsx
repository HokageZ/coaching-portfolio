import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionAnimator from '../animations/SectionAnimator';
import { useLanguage } from '../../context/LanguageContext';

// Import feedback images
import testimonial1 from '../../assets/testimonials/testimonial_1.jpg';
import testimonial2 from '../../assets/testimonials/testimonial_2.jpg';
import testimonial3 from '../../assets/testimonials/testimonial_3.jpg';
import testimonial4 from '../../assets/testimonials/testimonial_4.jpg';
import testimonial5 from '../../assets/testimonials/testimonial_5.jpg';
import testimonial6 from '../../assets/testimonials/testimonial_6.jpg';

// Images array
const images = [
  testimonial1,
  testimonial2,
  testimonial3,
  testimonial4,
  testimonial5,
  testimonial6
];

const Modal = ({ selectedImage, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 p-4 md:p-8 overflow-hidden"
        style={{ cursor: 'zoom-out' }}
      >
        {/* Close button */}
        <motion.button
          className="absolute top-4 right-4 z-50 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10"
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(182, 13, 13, 0.5)' }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>

        {/* Image Container */}
        <motion.div
          className="w-full h-full flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
        >
          <motion.div
            className="relative w-full max-w-4xl max-h-[80vh] rounded-2xl overflow-hidden"
            layoutId={`modal-image-container`}
          >
            <motion.img
              src={selectedImage}
              alt="Expanded view"
              className="w-full h-full object-contain"
              layoutId={`modal-image`}
            />
            
            {/* Image overlay gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const FeedbackCard = ({ image, index, t }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full w-full cursor-pointer group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="relative w-full h-full overflow-hidden bg-gray-100">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {hasError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center p-4">
              <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-2 text-sm text-gray-500">{t('feedback.error.loadingImage')}</p>
            </div>
          </div>
        ) : (
          <img
            src={image}
            alt="Client testimonial"
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Magnifier icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Feedback = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryFocused, setGalleryFocused] = useState(false);

  const handleCardClick = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage) {
        // Modal is open - handle modal navigation
        if (e.key === 'Escape') {
          handleCloseModal();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, galleryFocused]);

  return (
    <>
      {/* Hidden element for accessibility announcements */}
      <div 
        id="scroll-announcement" 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      ></div>
      
      <SectionAnimator
        id="feedback"
        title={t('feedback.title')}
        subtitle={t('feedback.subtitle')}
        highlightedText={t('feedback.title')}
        showPatterns={true}
      >
        <div 
          className="container mx-auto px-4"
          onFocus={() => setGalleryFocused(true)}
          onBlur={() => setGalleryFocused(false)}
          onMouseEnter={() => setGalleryFocused(true)}
          onMouseLeave={() => setGalleryFocused(false)}
        >
          {/* Grid Gallery */}
          <div 
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-5"
            role="region"
            aria-label={t('feedback.ariaLabel.gallery')}
            tabIndex={0}
          >
            {images.map((image, index) => (
              <div 
                key={index} 
                onClick={() => handleCardClick(image)}
                className="aspect-square"
                role="button"
                tabIndex={0}
                aria-label={`${t('feedback.ariaLabel.viewImage')} ${index + 1}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCardClick(image);
                    e.preventDefault();
                  }
                }}
              >
                <FeedbackCard
                  image={image}
                  index={index}
                  t={t}
                />
              </div>
            ))}
          </div>
          
          {/* Navigation instructions */}
          <p className="sr-only">
            Press Enter on an image to view it in full screen.
          </p>

          {/* Decorative Elements */}
          <motion.div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-1 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              background: 'radial-gradient(circle, rgba(182, 13, 13, 0.4) 0%, transparent 70%)'
            }}
            aria-hidden="true"
          />
        </div>
      </SectionAnimator>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <Modal
            selectedImage={selectedImage}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Feedback; 