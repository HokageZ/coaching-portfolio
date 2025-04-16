import { BrowserRouter as Router, Routes, Route, createRoutesFromElements } from 'react-router-dom';
import { useEffect, createContext, useState, useCallback, useContext, useMemo, memo, Suspense, lazy } from 'react';
import { useLanguage } from './context/LanguageContext';
import { CardSkeleton } from './components/ui/Skeleton';
import ErrorBoundary from './components/ui/ErrorBoundary';

// Lazy load layout components
const NavBar = lazy(() => import('./components/layout/NavBar'));
const Footer = lazy(() => import('./components/layout/Footer'));

// Lazy load UI components
const NotFound = lazy(() => import('./components/ui/NotFound'));
const FontPreload = lazy(() => import('./components/ui/FontPreload'));
const ScrollToTop = lazy(() => import('./components/ui/ScrollToTop'));

// Lazy load all sections
const Landing = lazy(() => import('./components/sections/Landing'));
const Services = lazy(() => import('./components/sections/Services'));
const Transformations = lazy(() => import('./components/sections/Transformations'));
const Feedback = lazy(() => import('./components/sections/Feedback'));
const Packages = lazy(() => import('./components/sections/Packages'));
const FAQ = lazy(() => import('./components/sections/FAQ'));
const About = lazy(() => import('./components/sections/About'));

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

// Memoized section wrapper with skeleton loading and error boundary
const SectionWrapper = memo(({ id, children, fallbackMessage }) => {
  const { setVisibleSection } = useContext(ScrollContext);
  useSectionVisibilityObserver(id, setVisibleSection);
  
  return (
    <section id={id} className="relative">
      <ErrorBoundary fallbackMessage={fallbackMessage}>
        <Suspense fallback={<CardSkeleton />}>
          {children}
        </Suspense>
      </ErrorBoundary>
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
        <Suspense fallback={<CardSkeleton />}>
          <FontPreload />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <NavBar />
        </Suspense>
        <main id="main-content" className="min-h-screen bg-background">
          <SectionContainer id="landing-section">
            <SectionWrapper id="landing" fallbackMessage="Failed to load the landing section. Please refresh the page.">
              <Landing />
            </SectionWrapper>
          </SectionContainer>
          
          <SectionContainer id="about-section">
            <SectionWrapper id="about" fallbackMessage="Failed to load the about section. Please refresh the page.">
              <About />
            </SectionWrapper>
          </SectionContainer>
          
          <SectionContainer id="services-section">
            <SectionWrapper id="services" fallbackMessage="Failed to load the services section. Please refresh the page.">
              <Services />
            </SectionWrapper>
          </SectionContainer>
          
          <SectionContainer id="transformations-section">
            <SectionWrapper id="transformations" fallbackMessage="Failed to load the transformations section. Please refresh the page.">
              <Transformations />
            </SectionWrapper>
          </SectionContainer>
          
          <SectionContainer id="feedback-section">
            <SectionWrapper id="feedback" fallbackMessage="Failed to load the feedback section. Please refresh the page.">
              <Feedback />
            </SectionWrapper>
          </SectionContainer>
          
          <SectionContainer id="packages-section">
            <SectionWrapper id="packages" fallbackMessage="Failed to load the packages section. Please refresh the page.">
              <Packages />
            </SectionWrapper>
          </SectionContainer>
          
          <SectionContainer id="faq-section">
            <SectionWrapper id="faq" fallbackMessage="Failed to load the FAQ section. Please refresh the page.">
              <FAQ />
            </SectionWrapper>
          </SectionContainer>
        </main>
        <Suspense fallback={<CardSkeleton />}>
          <Footer />
        </Suspense>
        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>
      </ScrollContext.Provider>
    </div>
  );
};

// Memoized App component
const App = memo(() => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
});

export default App;
