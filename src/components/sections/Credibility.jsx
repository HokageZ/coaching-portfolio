import { useLanguage } from '../../context/LanguageContext';

const Credibility = () => {
  const { t } = useLanguage();
  
  // Get certificates from translations
  const certificates = [
    { name: t('credibility.cert.1.name'), issuer: t('credibility.cert.1.issuer') },
    { name: t('credibility.cert.2.name'), issuer: t('credibility.cert.2.issuer') },
    { name: t('credibility.cert.3.name'), issuer: t('credibility.cert.3.issuer') },
    { name: t('credibility.cert.4.name'), issuer: t('credibility.cert.4.issuer') }
  ];

  // Get client logos from translations
  const clients = [
    { name: t('credibility.client.1.name'), logo: "TC" },
    { name: t('credibility.client.2.name'), logo: "II" },
    { name: t('credibility.client.3.name'), logo: "GS" },
    { name: t('credibility.client.4.name'), logo: "FD" },
    { name: t('credibility.client.5.name'), logo: "PP" },
    { name: t('credibility.client.6.name'), logo: "EG" }
  ];

  // Get media features from translations
  const mediaFeatures = [
    { name: t('credibility.media.1.name'), logo: "F" },
    { name: t('credibility.media.2.name'), logo: "E" },
    { name: t('credibility.media.3.name'), logo: "I" },
    { name: t('credibility.media.4.name'), logo: "BI" },
    { name: t('credibility.media.5.name'), logo: "SM" }
  ];

  return (
    <section id="credibility" className="py-20 bg-neutral-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('credibility.title')} <span className="text-primary">{t('credibility.title.highlight')}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('credibility.subtitle')}
          </p>
        </div>

        {/* Certificates */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">{t('credibility.certifications')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificates.map((cert, index) => (
              <div 
                key={index}
                className="bg-neutral-800 rounded-xl p-6 flex flex-col items-center text-center hover:bg-neutral-700 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{cert.name}</h4>
                <p className="text-gray-400 text-sm">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Client Logos */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">{t('credibility.trustedby')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {clients.map((client, index) => (
              <div 
                key={index}
                className="bg-neutral-800 rounded-lg p-6 flex items-center justify-center hover:bg-neutral-700 transition-all duration-300"
              >
                <div className="text-2xl font-bold text-white">{client.logo}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured In */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-8 text-center">{t('credibility.featuredin')}</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {mediaFeatures.map((media, index) => (
              <div 
                key={index}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <div className="text-3xl font-bold">{media.logo}</div>
                <p className="text-sm text-center mt-2">{media.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Credibility; 