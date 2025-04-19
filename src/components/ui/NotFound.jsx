import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const NotFound = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-5 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md"
      >
        <h1 className="text-5xl font-bold mb-4 text-primary">404</h1>
        <h2 className="text-2xl font-semibold mb-6">{t('notFound.title')}</h2>
        <p className="mb-8 text-gray-300">{t('notFound.message')}</p>
        <a
          href="/"
          className="px-5 py-2.5 bg-primary text-white rounded shadow-lg hover:bg-primary-dark transition duration-300"
        >
          {t('notFound.returnHome')}
        </a>
      </motion.div>
    </div>
  );
};

export default NotFound; 