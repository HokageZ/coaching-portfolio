import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, createContext, useState, useCallback, useContext, useMemo, memo } from 'react';
import NavBar from './components/layout/NavBar';
import Landing from './components/sections/Landing';
import Services from './components/sections/Services';
import Transformations from './components/sections/Transformations';
import Feedback from './components/sections/Feedback';
import Packages from './components/sections/Packages';
import FAQ from './components/sections/FAQ';
import About from './components/sections/About';
import Footer from './components/layout/Footer';
import NotFound from './components/ui/NotFound';
import FontPreload from './components/ui/FontPreload';
import { useLanguage } from './context/LanguageContext';
import ScrollToTop from './components/ui/ScrollToTop';

// Create a context for scroll animation with improved performance
export const ScrollContext = createContext({
  isScrolling: false,
  setIsScrolling: () => {},
  visibleSections: {},
  setVisibleSection: () => {}
});

// Optimized intersection observer with debounce-like behavior
const useSectionVisibilityObserver = (sectionId, setVisibleSection) => {
  useEffect(() => {
    // Track last update time to prevent excessive updates
    let lastUpdateTime = 0;
    const UPDATE_THRESHOLD = 100; // ms

    const observer = new IntersectionObserver(
      ([entry]) => {
        const now = Date.now();
        // Only update if enough time has passed since last update
        if (now - lastUpdateTime > UPDATE_THRESHOLD) {
          lastUpdateTime = now;
          
          // Only log in development
          if (process.env.NODE_ENV === 'development') {
            console.log(`Section ${sectionId} visibility: ${entry.isIntersecting}`);
          }
          
          setVisibleSection(sectionId, entry.isIntersecting);
        }
      },
      { 
        threshold: 0.05, // Lower threshold for earlier detection
        rootMargin: "-40px 0px", // Optimized margin
      }
    );
    
    const element = document.getElementById(sectionId);
    if (element) {
      observer.observe(element);
    } else if (process.env.NODE_ENV === 'development') {
      console.warn(`Element with id '${sectionId}' not found`);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [sectionId, setVisibleSection]);
};

// Memoized section wrapper
const SectionAnimator = memo(({ id, children }) => {
  const { setVisibleSection } = useContext(ScrollContext);
  useSectionVisibilityObserver(id, setVisibleSection);
  
  return (
    <section id={id} className="relative">
      {children}
    </section>
  );
});

// Memoized section container to prevent re-renders
const SectionContainer = memo(({ id, className = "", children }) => (
  <div id={id} className={`section-wrapper ${className}`}>
    {children}
  </div>
));

// Optimized Home component
const Home = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    // Initialize all sections as visible by default
    landing: true,
    about: true,
    services: true,
    transformations: true,
    feedback: true,
    packages: true,
    faq: true
  });
  
  const { isChangingLanguage } = useLanguage();
  
  // Memoized visibility setter
  const setVisibleSection = useCallback((sectionId, isVisible) => {
    setVisibleSections(prev => {
      // Only update if the value is different
      if (prev[sectionId] === isVisible) return prev;
      return { ...prev, [sectionId]: isVisible };
    });
  }, []);
  
  // Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    isScrolling,
    setIsScrolling,
    visibleSections,
    setVisibleSection
  }), [isScrolling, visibleSections, setVisibleSection]);
  
  return (
    <div className={`${isChangingLanguage ? 'overflow-hidden' : ''}`}>
      <ScrollContext.Provider value={contextValue}>
        <FontPreload />
        <NavBar />
        <main id="main-content" className="min-h-screen bg-background">
          <SectionContainer id="landing-section">
            <Landing />
          </SectionContainer>
          
          <SectionContainer id="about-section">
            <About />
          </SectionContainer>
          
          <SectionContainer id="services-section">
            <Services />
          </SectionContainer>
          
          <SectionContainer id="transformations-section">
            <Transformations />
          </SectionContainer>
          
          <SectionContainer id="feedback-section">
            <Feedback />
          </SectionContainer>
          
          <SectionContainer id="packages-section">
            <Packages />
          </SectionContainer>
          
          <SectionContainer id="faq-section">
            <FAQ />
          </SectionContainer>
        </main>
        <Footer />
        <ScrollToTop />
      </ScrollContext.Provider>
    </div>
  );
};

// Memoized App component
const App = memo(() => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
});

export default App;
