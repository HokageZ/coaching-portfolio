import { motion } from 'framer-motion';

const shimmer = {
  initial: { x: '-100%' },
  animate: { 
    x: '100%',
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

const Skeleton = ({ className = "", width = "100%", height = "20px", rounded = "md" }) => {
  return (
    <div 
      className={`relative overflow-hidden bg-black/20 dark:bg-black/40 ${className}`}
      style={{ width, height, borderRadius: rounded }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-black/30 dark:via-black/50 to-transparent"
        variants={shimmer}
        initial="initial"
        animate="animate"
      />
    </div>
  );
};

export const TextSkeleton = ({ lines = 1, className = "" }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height="16px"
          className={`${i === lines - 1 ? "w-3/4" : "w-full"}`}
          rounded="full"
        />
      ))}
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="p-6 rounded-xl shadow-sm bg-black/10 dark:bg-black/30">
      <Skeleton 
        height="200px" 
        className="mb-6 rounded-xl" 
      />
      <Skeleton 
        height="28px" 
        className="mb-4 w-3/4 rounded-full" 
      />
      <TextSkeleton lines={3} />
    </div>
  );
};

export const VideoSkeleton = () => {
  return (
    <div className="relative w-full pt-[56.25%] bg-black/20 dark:bg-black/40 rounded-xl overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-black/30 dark:via-black/50 to-transparent"
        variants={shimmer}
        initial="initial"
        animate="animate"
      />
    </div>
  );
};

export const AvatarSkeleton = ({ size = "40px" }) => {
  return (
    <Skeleton
      width={size}
      height={size}
      rounded="full"
    />
  );
};

export const ButtonSkeleton = ({ width = "120px" }) => {
  return (
    <Skeleton
      width={width}
      height="40px"
      rounded="full"
    />
  );
};

export default Skeleton; 