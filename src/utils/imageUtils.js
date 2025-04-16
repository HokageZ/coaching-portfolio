/**
 * Generates a responsive image URL with width and quality parameters
 * @param {string} originalUrl - The original image URL
 * @param {number} width - Desired width in pixels
 * @param {number} quality - Image quality (1-100)
 * @returns {string} - Optimized image URL
 */
export const getOptimizedImageUrl = (originalUrl, width = 800, quality = 80) => {
  if (!originalUrl) return '';
  
  // If it's already a data URL or external URL, return as is
  if (originalUrl.startsWith('data:') || originalUrl.startsWith('http')) {
    return originalUrl;
  }
  
  // For local images, we can't optimize them at runtime
  // In a production environment, you would use a CDN or image optimization service
  return originalUrl;
};

/**
 * Generates a srcset string for responsive images
 * @param {string} originalUrl - The original image URL
 * @param {Array<number>} widths - Array of widths to generate
 * @returns {string} - srcset string
 */
export const generateSrcSet = (originalUrl, widths = [320, 640, 960, 1280]) => {
  if (!originalUrl) return '';
  
  return widths
    .map(width => `${getOptimizedImageUrl(originalUrl, width)} ${width}w`)
    .join(', ');
};

/**
 * Generates sizes attribute for responsive images
 * @param {string} sizes - CSS sizes value
 * @returns {string} - sizes attribute
 */
export const generateSizes = (sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw') => {
  return sizes;
};

/**
 * Creates a low-quality placeholder image URL
 * @param {string} originalUrl - The original image URL
 * @returns {string} - Placeholder image URL
 */
export const getPlaceholderImageUrl = (originalUrl) => {
  if (!originalUrl) return '';
  
  // For external images, we can't generate placeholders at runtime
  // In a production environment, you would use a service like Cloudinary or Imgix
  return originalUrl;
}; 