import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const ContactForm = () => {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t('contact.name.error');
    if (!formData.email.trim()) {
      newErrors.email = t('contact.email.error');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.email.invalid');
    }
    if (!formData.subject.trim()) newErrors.subject = t('contact.subject.error');
    if (!formData.message.trim()) newErrors.message = t('contact.message.error');
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">{t('contact.title')}</h2>
          <p className="text-gray-400 text-center mb-12">{t('contact.subtitle')}</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${
                    errors.name ? 'border-red-500' : 'border-gray-700'
                  } text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                  placeholder={t('contact.name.placeholder')}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${
                    errors.email ? 'border-red-500' : 'border-gray-700'
                  } text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                  placeholder={t('contact.email.placeholder')}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                {t('contact.subject')}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${
                  errors.subject ? 'border-red-500' : 'border-gray-700'
                } text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                placeholder={t('contact.subject.placeholder')}
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                {t('contact.message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${
                  errors.message ? 'border-red-500' : 'border-gray-700'
                } text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                placeholder={t('contact.message.placeholder')}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message}</p>
              )}
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 bg-primary text-white rounded-lg hover:bg-red-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('contact.button.sending') : t('contact.button.send')}
              </button>
            </div>

            {submitStatus === 'success' && (
              <div className="mt-4 p-4 bg-green-900 text-green-100 rounded-lg text-center">
                {t('contact.success')}
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mt-4 p-4 bg-red-900 text-red-100 rounded-lg text-center">
                {t('contact.error')}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm; 