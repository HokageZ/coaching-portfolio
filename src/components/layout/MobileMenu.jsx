import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const menuVariants = {
  closed: {
    x: '100%',
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
};

const linkVariants = {
  closed: {
    x: 50,
    opacity: 0
  },
  open: (i) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: 'easeOut'
    }
  })
};

const MobileMenu = ({ isOpen, onClose, links }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="fixed inset-0 bg-black bg-opacity-95 backdrop-blur-lg z-50 overflow-y-auto"
        >
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">Menu</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-primary/10 rounded-full transition-colors duration-300"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav>
              <ul className="space-y-4">
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    custom={i}
                    variants={linkVariants}
                  >
                    <a
                      href={link.href}
                      onClick={onClose}
                      className="block text-xl py-3 px-4 text-white hover:bg-primary/10 rounded-lg transition-colors duration-300"
                    >
                      {link.text}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu; 