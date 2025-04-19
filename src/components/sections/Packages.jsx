// File path: components/sections/Packages.jsx (adjust path as needed)

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext'; // Adjust path as needed
import SectionAnimator from '../animations/SectionAnimator'; // Adjust path as needed

// --- PackageCard Component ---
// Renders a single package card UI based on props received from Packages component
const PackageCard = ({ pkg, t, language, allPackages, onPackageChange, formatPrice, userLocation, exchangeRate, userCurrency }) => {

  // Handler for duration dropdown change
  const handleDurationChange = (e) => {
    e.stopPropagation();
    const newDuration = e.target.value;
    onPackageChange(newDuration); // Calls handler passed from Packages component
  };

  // Generates text for WhatsApp button based on tier and price
  const getButtonText = (tierName) => {
    // Determine which tier's prices to use based on the name
    const tierData = pkg.tiers.find(tData => tData.name === tierName) || pkg.tiers[0]; // Fallback to first tier
    const priceInfo = formatPrice(tierData.price, tierData.priceUSD);

    if (language === 'ar') {
      return tierName === t('packages.silver')
        ? `احصل على الباقة الفضية (${priceInfo.price} ${priceInfo.currency})`
        : `احصل على الباقة الذهبية (${priceInfo.price} ${priceInfo.currency})`;
    }
    return tierName === t('packages.silver')
      ? `Get Silver Package (${priceInfo.price} ${priceInfo.currency})`
      : `Get Gold Package (${priceInfo.price} ${priceInfo.currency})`;
  };

  // Generates the WhatsApp message URL
  const getWhatsAppMessage = (tierName) => {
    // Determine which tier's prices to use
    const tierData = pkg.tiers.find(tData => tData.name === tierName) || pkg.tiers[0]; // Fallback
    const priceInfo = formatPrice(tierData.price, tierData.priceUSD);

    return `https://wa.me/201099488562?text=${encodeURIComponent(
      t('whatsapp.package') // Assumes 'whatsapp.package' translation exists (e.g., "I'm interested in the {0} package - {1}")
        .replace('{0}', pkg.title)
        .replace('{1}', `${tierName} (${priceInfo.price} ${priceInfo.currency})`)
    )}`;
  };

  // Null checks and default values for rendering
  const isHighlighted = pkg?.highlighted || false;

  // Loading Skeleton - shown if pkg data isn't ready
  if (!pkg || !pkg.tiers || pkg.tiers.length === 0) {
    return (
      <div className="rounded-xl overflow-hidden relative backdrop-blur-sm bg-black/60 border border-white/10 p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-white/10 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-white/10 rounded w-2/3 mb-8"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 bg-white/10 rounded w-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- Card JSX ---
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.div
        className={`rounded-xl overflow-hidden relative backdrop-blur-sm h-full flex flex-col ${
          isHighlighted
            ? 'bg-black/80 shadow-lg shadow-primary/20 border border-primary/30'
            : 'bg-black/60 border border-white/10'
        }`}
        whileHover={{
          y: -5,
          boxShadow: isHighlighted
            ? '0 25px 50px -12px rgba(182, 13, 13, 0.35)'
            : '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
        }}
        transition={{ duration: 0.15 }}
      >
        {/* Popular tag */}
        {isHighlighted && (
          <motion.div
            className="absolute top-0 left-0 z-10 bg-primary text-white text-xs font-bold py-1 px-3 rounded-tr-md rounded-bl-md shadow-lg flex items-center justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {t('packages.popular')}
          </motion.div>
        )}

        {/* Card Header */}
        <div className={`p-8 ${isHighlighted ? 'bg-gradient-to-r from-primary/80 to-primary/60' : 'bg-gradient-to-br from-neutral-800/90 to-black/80'} relative overflow-hidden`}>
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                  <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <h3 className="text-2xl font-bold text-white mb-2 relative">
            <span dir="auto" className="rtl:mr-2 inline-block">{pkg.title}</span>
          </h3>

          {/* Duration Dropdown */}
          <div className="flex items-center gap-4 mb-4 relative z-20" onClick={(e) => e.stopPropagation()}>
            <select
              className="bg-black/40 text-white border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
              value={pkg.duration} // Controlled by selectedPackage state in parent
              onChange={handleDurationChange}
              onClick={(e) => e.stopPropagation()} // Prevent card click effects
            >
              {allPackages.map((p) => (
                <option key={p.duration} value={p.duration}>
                  {p.duration} {/* Display duration from package data */}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-8 pt-4 flex flex-col flex-grow relative">
          {/* Features Section */}
          <div className="mb-3">
            <h4 className="font-semibold text-white/90 flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span dir="auto" className="rtl:mr-3 inline-block">{t('packages.features')}</span>
            </h4>
          </div>
          <ul className="space-y-3 mb-6 flex-grow">
            {pkg.features.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <div className={`flex-shrink-0 w-5 h-5 mr-3 rounded-full flex items-center justify-center bg-primary/20 text-primary`}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span dir="auto" className={`rtl:mr-3 text-gray-300 ${isHighlighted ? 'text-white/90' : ''}`}>{feature}</span>
              </li>
            ))}
          </ul>

          {/* Suitable For Section */}
          {pkg.suitableFor && (
            <div className="mb-5 text-sm text-white/90 bg-gradient-to-r from-black/40 to-black/20 p-3 rounded-lg border border-white/10 italic flex items-start">
              <svg className="w-5 h-5 mr-2 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span dir="auto" className="rtl:mr-3">{pkg.suitableFor}</span>
            </div>
          )}

          {/* Tiers Section Header */}
          <div className="mb-4">
            <h4 className="font-semibold text-white/90 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span dir="auto" className="rtl:mr-3 inline-block">{t('packages.tier')}</span>
            </h4>
          </div>

          {/* Plan Options (Mapping Tiers) */}
          <div className="grid grid-cols-1 gap-4 mb-2">
            {pkg.tiers.map((tier, idx) => {
              // Format price specifically for this tier rendering
              const priceInfo = formatPrice(tier.price, tier.priceUSD);
              return (
              <motion.div
                key={idx}
                className={`p-4 rounded-lg ${
                    tier.name === t('packages.silver')
                      ? 'bg-gradient-to-br from-gray-800/40 to-black/50 hover:from-gray-800/50 hover:to-black/60 border border-gray-500/30'
                      : 'bg-gradient-to-br from-yellow-900/40 to-yellow-800/30 hover:from-yellow-800/50 hover:to-yellow-700/40 border border-yellow-500/30'
                } transition-colors duration-300`}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                  {/* Tier Header (Name & Price) */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{tier.name === t('packages.silver') ? '🥈' : '🥇'}</span>
                      <span dir="auto" className={`font-bold text-2xl rtl:mr-2 ${ tier.name === t('packages.silver') ? 'text-gray-200' : 'text-yellow-400' }`}>
                        {tier.name}
                      </span>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      {/* Discount Display */}
                      <div className="flex items-center">
                        {/* Simple doubled price for "original" - adjust if needed */}
                        <span className="text-sm text-white/60 line-through mr-2">
                          {/* Ensure priceInfo.price is a number before multiplying */}
                          { !isNaN(parseInt(priceInfo.price)) ? parseInt(priceInfo.price) * 2 : ''} {priceInfo.currency}
                        </span>
                        <span className={`text-xs px-1.5 py-0.5 ${ tier.name === t('packages.silver') ? 'bg-gray-500/80' : 'bg-yellow-600/80' } text-white rounded-sm -mt-3 font-medium`}>
                          {t('packages.discount')}
                        </span>
                      </div>
                      {/* Actual Price */}
                      <div className="flex items-baseline mt-1">
                        <span className="text-3xl font-bold text-white">{priceInfo.price}</span>
                        <span className="text-sm ml-1 text-white/60">{priceInfo.currency}</span>
                    </div>
                  </div>
                </div>

                  {/* Divider */}
                  <div className={`h-[1px] w-full bg-gradient-to-r from-transparent ${ tier.name === t('packages.silver') ? 'via-gray-400/30' : 'via-yellow-500/30' } to-transparent mb-3`}></div>

                {/* Tier Benefits */}
                <ul className="mb-3 space-y-2">
                  {tier.benefits.map((benefit, bidx) => (
                    <li key={bidx} className="text-sm text-gray-300 flex items-start">
                        <span className={`mr-2 mt-0.5 ${ tier.name === t('packages.silver') ? 'text-gray-400' : 'text-yellow-400' }`}>•</span>
                      <span dir="auto" className="rtl:mr-3">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* WhatsApp button for each tier */}
                <motion.a
                  href={getWhatsAppMessage(tier.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-2 w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 relative overflow-hidden flex items-center justify-center ${
                      tier.name === t('packages.silver')
                        ? 'bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-500 hover:to-gray-400 text-white'
                        : 'bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z" />
                  </svg>
                    <span className={`relative z-10 font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {getButtonText(tier.name)}
                  </span>
                </motion.a>
              </motion.div>
              );
            })}
          </div> {/* End Plan Options Grid */}
        </div> {/* End Card Body */}
      </motion.div> {/* End Card Inner Motion Div */}
    </motion.div> /* End Card Outer Motion Div */
  );
};


// --- Packages Container Component ---
// Manages fetching location/currency, selecting package, and rendering the PackageCard
const Packages = () => {
  // State variables
  const [selectedPackage, setSelectedPackage] = useState(null); // Holds the currently displayed package object
  const [userLocation, setUserLocation] = useState(null); // Holds country code ('EG', 'SA', 'INTL', etc.) or null initially
  const [exchangeRate, setExchangeRate] = useState(1); // USD to userCurrency rate
  const [userCurrency, setUserCurrency] = useState('USD'); // Currency code ('EGP', 'SAR', 'USD', etc.)
  const [isLoadingLocation, setIsLoadingLocation] = useState(true); // Loading state for location/currency fetch

  // Language context
  const { t, language } = useLanguage();

  // Memoized package data (recalculates only if 't' function changes)
  const packages = useMemo(() => [
    {
      title: t('packages.testing.title'),
      duration: t('packages.testing.duration'),
      tiers: [
        { name: t('packages.silver'), price: "600", priceUSD: "45", benefits: [ t('packages.silver.benefit.1'), t('packages.silver.benefit.2') ] },
        { name: t('packages.gold'), price: "1200", priceUSD: "90", benefits: [ t('packages.gold.benefit.1'), t('packages.gold.benefit.2'), t('packages.gold.benefit.3') ] }
      ],
      features: [ t('packages.feature.1'), t('packages.feature.2'), t('packages.feature.3'), t('packages.feature.4'), t('packages.feature.5'), t('packages.feature.6'), t('packages.feature.7'), t('packages.feature.8'), t('packages.feature.9'), t('packages.feature.10') ],
      suitableFor: t('packages.testing.suitableFor'), highlighted: false
    },
    {
      title: t('packages.development.title'),
      duration: t('packages.development.duration'),
      tiers: [
        { name: t('packages.silver'), price: "1000", priceUSD: "70", benefits: [ t('packages.silver.benefit.1'), t('packages.silver.benefit.2') ] },
        { name: t('packages.gold'), price: "2000", priceUSD: "140", benefits: [ t('packages.gold.benefit.1'), t('packages.gold.benefit.2'), t('packages.gold.benefit.3') ] }
      ],
      features: [ t('packages.feature.1'), t('packages.feature.2'), t('packages.feature.3'), t('packages.feature.4'), t('packages.feature.5'), t('packages.feature.6'), t('packages.feature.7'), t('packages.feature.8'), t('packages.feature.9'), t('packages.feature.10') ],
      suitableFor: t('packages.development.suitableFor'), highlighted: true
    },
    {
      title: t('packages.journey.title'),
      duration: t('packages.journey.duration'),
      tiers: [
        { name: t('packages.silver'), price: "1600", priceUSD: "100", benefits: [ t('packages.silver.benefit.1'), t('packages.silver.benefit.2') ] },
        { name: t('packages.gold'), price: "3200", priceUSD: "200", benefits: [ t('packages.gold.benefit.1'), t('packages.gold.benefit.2'), t('packages.gold.benefit.3') ] }
      ],
      features: [ t('packages.feature.1'), t('packages.feature.2'), t('packages.feature.3'), t('packages.feature.4'), t('packages.feature.5'), t('packages.feature.6'), t('packages.feature.7'), t('packages.feature.8'), t('packages.feature.9'), t('packages.feature.10') ],
      suitableFor: t('packages.journey.suitableFor'), highlighted: false
    }
  ], [t]);

  // Effect to fetch user location and exchange rates ONCE on component mount
  useEffect(() => {
    const fetchUserLocationAndRates = async () => {
      setIsLoadingLocation(true); // Indicate loading start
      let determinedCountryCode = 'INTL'; // Default to international

      try {
        // --- 1. Fetch Country Code using Vercel API Route ---
        console.log(`Workspaceing location from /api/get-location`);
        const response = await fetch('/api/get-location');

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`API route HTTP error! status: ${response.status}, body: ${errorBody}`);
        }

        const data = await response.json();
        console.log('Location API route response:', data);

        if (data && data.country_code) {
            determinedCountryCode = data.country_code; // Use code from Vercel header
        } else {
            console.warn("Received invalid data from API route, using default 'INTL'.");
            determinedCountryCode = 'INTL'; // Fallback if API route response is bad
        }

      } catch (error) {
        // --- Handle errors fetching from /api/get-location (e.g., dev environment) ---
        console.warn('Fetching from /api/get-location failed, using fallback:', error.message);
        // In a real dev scenario, might still want a fallback (e.g., based on language)
        // For simplicity here, we stick to 'INTL' as the ultimate fallback on error.
        determinedCountryCode = 'INTL';
      }

      // --- 2. Set User Location State ---
      setUserLocation(determinedCountryCode);
      console.log(`User location determined as: ${determinedCountryCode}`);

      // --- 3. Fetch Exchange Rates (if necessary) based on determined location ---
      try {
        const arabCountries = {
            'EG': 'EGP', 'SA': 'SAR', 'AE': 'AED', 'KW': 'KWD', 'QA': 'QAR',
            'BH': 'BHD', 'OM': 'OMR', 'JO': 'JOD', 'LB': 'LBP', 'IQ': 'IQD',
            'SY': 'SYP', 'YE': 'YER', 'PS': 'ILS', 'MA': 'MAD', 'DZ': 'DZD',
            'TN': 'TND', 'LY': 'LYD', 'SD': 'SDG', 'SO': 'SOS', 'DJ': 'DJF',
            'MR': 'MRO'
            // Add any other countries/currencies needed
        };

        if (determinedCountryCode === 'EG') {
          // Handle Egypt: Use EGP, no exchange rate fetch needed
          setExchangeRate(1);
          setUserCurrency('EGP');
          console.log('User is in Egypt (EG), setting currency to EGP.');

        } else if (arabCountries[determinedCountryCode]) {
          // Handle other specified Arab countries: Fetch exchange rate
          const targetCurrency = arabCountries[determinedCountryCode];
          console.log(`Workspaceing exchange rates for ${targetCurrency} (${determinedCountryCode})...`);

          // !! IMPORTANT: Exchange Rate API !!
          // - Check API provider's terms, limits, and key requirements.
          // - Store API keys securely (Vercel Environment Variables).
          // - Consider adding more robust error handling for this specific fetch.
          const currencyApiUrl = `https://api.exchangerate-api.com/v4/latest/USD`; // Using v4 example
          const currencyResponse = await fetch(currencyApiUrl);

          if (!currencyResponse.ok) {
            throw new Error(`Currency API HTTP error! Status: ${currencyResponse.status}`);
          }
          const currencyData = await currencyResponse.json();
          if (!currencyData || !currencyData.rates) {
            throw new Error('Invalid data received from currency API');
          }

          const rate = currencyData.rates[targetCurrency];
          if (rate) {
            setExchangeRate(rate);
            setUserCurrency(targetCurrency);
            console.log(`Exchange rate set for ${targetCurrency}: ${rate}`);
          } else {
            // If rate for specific currency not found, fallback to USD
            console.warn(`Rate for ${targetCurrency} not found in API response, falling back to USD.`);
            setExchangeRate(1);
            setUserCurrency('USD');
          }
        } else {
          // Default to USD for all other countries or 'INTL'
          setExchangeRate(1);
          setUserCurrency('USD');
          console.log(`Location (${determinedCountryCode}) not Egypt or specified Arab country, using USD.`);
        }
      } catch (exchangeError) {
          // Handle errors during the exchange rate fetching process
          console.error("Error fetching or processing exchange rates:", exchangeError);
          console.warn("Falling back to USD due to exchange rate fetch/processing error.");
          setExchangeRate(1); // Fallback to USD on error
          setUserCurrency('USD');
      } finally {
           // --- 4. Finish Loading ---
           setIsLoadingLocation(false); // Stop loading indicator
      }
    };

    fetchUserLocationAndRates();
  }, []); // Empty dependency array means this runs only once when the component mounts

  // Effect to set the initially selected package (runs after packages/language potentially update)
  useEffect(() => {
    // Set the "Development" package (index 1) as default/initial
    if (packages && packages.length > 1) {
        setSelectedPackage(packages[1]);
    } else if (packages && packages.length > 0) {
        setSelectedPackage(packages[0]); // Fallback to first package if less than 2
    }
  }, [packages, language]); // Recalculate if packages data or language changes


  // Handler to change the displayed package based on duration selection in PackageCard
  const handlePackageChange = (duration) => {
    const newPkg = packages.find(p => p.duration === duration);
    if (newPkg) {
      setSelectedPackage(newPkg);
    }
  };

  // Function to format price based on location, rate, and currency
  // Memoized with useCallback to prevent unnecessary re-renders of PackageCard if props haven't changed
  const formatPrice = useCallback((priceEGP, priceUSD) => {
    // Default return value
    let calculatedPrice = '...'; // Show loading indicator initially
    let displayCurrency = '';

    // Only calculate prices once location/currency info is loaded
    if (!isLoadingLocation) {
        if (userLocation === 'EG' && priceEGP) {
            // Use local EGP price if location is Egypt
            calculatedPrice = priceEGP; // Assuming priceEGP is already formatted string
            displayCurrency = t('packages.egp') || 'EGP'; // Use translation or fallback
        } else if (userCurrency !== 'USD' && priceUSD && exchangeRate) {
            // Convert USD to local currency if applicable and rate is available
            // Format to integer (no decimals), adjust .toFixed() if needed
            calculatedPrice = (parseFloat(priceUSD) * exchangeRate).toFixed(0);
            const currencyTranslationKey = `packages.${userCurrency.toLowerCase()}`; // e.g., 'packages.sar'
            const translatedSymbol = t(currencyTranslationKey);
            // Use translated symbol if translation exists, otherwise use the code
            displayCurrency = translatedSymbol !== currencyTranslationKey ? translatedSymbol : userCurrency;
        } else if (priceUSD) {
            // Default to USD price if no other condition met (includes INTL location)
            calculatedPrice = parseFloat(priceUSD).toFixed(0); // Format USD price as integer
            displayCurrency = t('packages.usd') || 'USD'; // Use translation or fallback
        } else {
             calculatedPrice = 'N/A'; // Case where priceUSD is missing
             displayCurrency = '';
        }
    }

    return {
      price: calculatedPrice,
      currency: displayCurrency
    };
  // Dependencies for useCallback ensure the function instance updates only if these values change
  }, [userLocation, userCurrency, exchangeRate, t, isLoadingLocation]);


  // --- Main Component JSX ---
  return (
    <SectionAnimator
      id="packages"
      title={t('packages.title')}
      subtitle={t('packages.subtitle')}
      highlightedText={t('packages.title')}
      className="bg-black relative" // Ensure SectionAnimator handles className correctly
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial opacity-30 pointer-events-none"></div>
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(182, 13, 13, 0.2) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          willChange: 'transform', // Performance hints (use with caution)
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="py-12">
          <div className="max-w-4xl mx-auto" style={{ /* Performance hints */ willChange: 'transform', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
            {/* AnimatePresence handles the transition between package cards */}
            <AnimatePresence mode="wait" initial={false}>
              {/* Conditionally render PackageCard only when a package is selected */}
              {selectedPackage ? (
                <motion.div
                  key={selectedPackage.duration} // Animation key based on duration
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut"
                  }}
                >
                  <PackageCard
                    pkg={selectedPackage}
                    t={t}
                    language={language}
                    allPackages={packages}
                    onPackageChange={handlePackageChange}
                    formatPrice={formatPrice} // Pass down the memoized formatPrice function
                    // Pass down relevant state needed by PackageCard for display/logic
                    userLocation={userLocation}
                    exchangeRate={exchangeRate}
                    userCurrency={userCurrency}
                  />
                </motion.div>
              ) : (
                 // Show a loading state while selectedPackage is initially null
                 <div className="text-center text-white/50 p-8">Loading package details...</div>
              ) }
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SectionAnimator>
  );
};

export default Packages;
