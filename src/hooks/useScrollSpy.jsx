import { useState, useEffect } from 'react';

const useScrollSpy = (sectionIds, offset = 100) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      // Get all sections
      const sections = sectionIds.map(id => {
        const element = document.getElementById(id);
        if (!element) return null;

        const rect = element.getBoundingClientRect();
        return {
          id,
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY
        };
      }).filter(Boolean);

      // Get current scroll position
      const scrollPosition = window.scrollY + offset;

      // Find the current section
      const current = sections.find(section => 
        scrollPosition >= section.top && scrollPosition < section.bottom
      );

      // Update active section and URL
      if (current && current.id !== activeSection) {
        setActiveSection(current.id);
        window.history.replaceState(null, null, `#${current.id}`);
      } else if (!current && sections[0] && scrollPosition < sections[0].top) {
        // Handle case when scrolled above first section
        setActiveSection(sections[0].id);
        window.history.replaceState(null, null, `#${sections[0].id}`);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset, activeSection]);

  return activeSection;
};

export default useScrollSpy; 