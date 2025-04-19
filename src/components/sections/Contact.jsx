import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const formVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

const inputVariants = {
  focus: {
    scale: 1.02,
    transition: {
      duration: 0.2
    }
  }
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'الاسم مطلوب';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صالح';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'الرسالة مطلوبة';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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

  return (
    <section id="contact" ref={ref} className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black to-black/95 backdrop-blur-sm z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">تواصل معنا</h2>
          <p className="text-lg text-gray-300">نحن هنا للإجابة على استفساراتك</p>
        </motion.div>

        <motion.form
          variants={formVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-2xl mx-auto glass-card p-8"
          onSubmit={handleSubmit}
        >
          <div className="space-y-6">
            <div>
              <motion.input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="الاسم"
                className={`w-full bg-black/50 border ${
                  errors.name ? 'border-red-500' : 'border-gray-700'
                } rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors`}
                variants={inputVariants}
                whileFocus="focus"
              />
              {errors.name && (
                <p className="mt-2 text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            <div>
              <motion.input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="البريد الإلكتروني"
                className={`w-full bg-black/50 border ${
                  errors.email ? 'border-red-500' : 'border-gray-700'
                } rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors`}
                variants={inputVariants}
                whileFocus="focus"
              />
              {errors.email && (
                <p className="mt-2 text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <motion.textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="رسالتك"
                rows="5"
                className={`w-full bg-black/50 border ${
                  errors.message ? 'border-red-500' : 'border-gray-700'
                } rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors`}
                variants={inputVariants}
                whileFocus="focus"
              />
              {errors.message && (
                <p className="mt-2 text-red-500 text-sm">{errors.message}</p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-primary text-white rounded-lg p-4 font-semibold transition-all transform hover:bg-primary/90 ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  جاري الإرسال...
                </span>
              ) : (
                'إرسال'
              )}
            </motion.button>
          </div>
        </motion.form>

        <AnimatePresence>
          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed top-4 right-4 p-4 rounded-lg ${
                submitStatus === 'success' ? 'bg-green-500' : 'bg-red-500'
              } text-white shadow-lg`}
            >
              {submitStatus === 'success' ? (
                'تم إرسال رسالتك بنجاح!'
              ) : (
                'حدث خطأ. يرجى المحاولة مرة أخرى.'
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Contact; 