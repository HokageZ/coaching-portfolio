import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, createContext, useState, useCallback, useContext } from 'react';
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

// Create a context for scroll animation - simplified
export const ScrollContext = createContext({
  isScrolling: false,
  setIsScrolling: () => {},
  visibleSections: {},
  setVisibleSection: () => {}
});

// Memo wrapped section visibility wrapper to prevent re-renders
const useSectionVisibilityObserver = (sectionId, setVisibleSection) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisibleSection(sectionId, entry.isIntersecting);
      },
      { 
        threshold: 0.2,
        rootMargin: "-100px 0px -100px 0px"
      }
    );
    
    const element = document.getElementById(sectionId);
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [sectionId, setVisibleSection]);
};

const SectionAnimator = ({ id, children }) => {
  const { setVisibleSection } = useContext(ScrollContext);
  useSectionVisibilityObserver(id, setVisibleSection);
  
  return (
    <section id={id} className="relative">
      {children}
    </section>
  );
};

const Home = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const { isChangingLanguage } = useLanguage();
  
  const setVisibleSection = useCallback((sectionId, isVisible) => {
    setVisibleSections(prev => ({
      ...prev,
      [sectionId]: isVisible
    }));
  }, []);
  
  const contextValue = {
    isScrolling,
    setIsScrolling,
    visibleSections,
    setVisibleSection
  };
  
  return (
    <div className={`${isChangingLanguage ? 'overflow-hidden' : ''}`}>
      <ScrollContext.Provider value={contextValue}>
        <FontPreload />
        <NavBar />
        <main id="main-content" className="min-h-screen bg-background">
          <Landing />
          <About />
          <Services />
          <Transformations />
          <Feedback />
          <Packages />
          <FAQ />
        </main>
        <Footer />
        <ScrollToTop />
      </ScrollContext.Provider>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
