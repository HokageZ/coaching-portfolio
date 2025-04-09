import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Booking = () => {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSession, setSelectedSession] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM",
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const sessionTypes = [
    {
      id: 1,
      title: t('booking.session.discovery.title'),
      duration: t('booking.session.discovery.duration'),
      description: t('booking.session.discovery.description'),
      price: t('booking.session.discovery.price')
    },
    {
      id: 2,
      title: t('booking.session.strategy.title'),
      duration: t('booking.session.strategy.duration'),
      description: t('booking.session.strategy.description'),
      price: t('booking.session.strategy.price')
    },
    {
      id: 3,
      title: t('booking.session.coaching.title'),
      duration: t('booking.session.coaching.duration'),
      description: t('booking.session.coaching.description'),
      price: t('booking.session.coaching.price')
    }
  ];

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedTime(''); // Reset time when date changes
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleSessionSelect = (session) => {
    setSelectedSession(session);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      session: selectedSession,
      date: selectedDate,
      time: selectedTime,
      ...formData
    });
  };

  return (
    <section id="booking" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-4 text-center">{t('booking.title')}</h2>
        <p className="text-gray-400 text-center mb-12">{t('booking.subtitle')}</p>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Session Types */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">{t('booking.session.title')}</h3>
              <div className="space-y-4">
                {sessionTypes.map((session) => (
                  <div
                    key={session.id}
                    className={`p-6 rounded-lg cursor-pointer transition-colors duration-300 ${
                      selectedSession?.id === session.id
                        ? 'bg-primary'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                    onClick={() => handleSessionSelect(session)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl font-semibold text-white">{session.title}</h4>
                      <span className="text-white font-semibold">{session.price}</span>
                    </div>
                    <p className="text-gray-300 mb-2">{session.duration}</p>
                    <p className="text-gray-400">{session.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Form */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">{t('booking.schedule.title')}</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('booking.date')}
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                {selectedDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('booking.time')}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => handleTimeSelect(time)}
                          className={`px-4 py-2 rounded-lg text-sm ${
                            selectedTime === time
                              ? 'bg-primary text-white'
                              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('booking.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('booking.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('booking.phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('booking.notes')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!selectedSession || !selectedDate || !selectedTime}
                  className="w-full px-8 py-4 bg-primary text-white rounded-lg hover:bg-red-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('booking.button')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking; 