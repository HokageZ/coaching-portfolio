import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const NotFound = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">{t('notfound.title')}</h1>
        <h2 className="text-4xl font-bold text-white mb-4">{t('notfound.subtitle')}</h2>
        <p className="text-gray-400 mb-8">
          {t('notfound.description')}
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          {t('notfound.backhome')}
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 