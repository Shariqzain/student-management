import { useEffect, useCallback } from 'react';

const CursorSpotlight = () => {
  const handleMouseMove = useCallback((e) => {
    requestAnimationFrame(() => {
      const spotlight = document.getElementById('cursor-spotlight');
      if (spotlight) {
        // Get scroll position
        const scrollX = window.scrollX || window.pageXOffset;
        const scrollY = window.scrollY || window.pageYOffset;

        // Calculate position relative to viewport and scroll
        const x = e.clientX + scrollX;
        const y = e.clientY + scrollY;

        // Update spotlight position
        spotlight.style.transform = `translate(${x}px, ${y}px)`;
        spotlight.style.opacity = '1';
      }
    });
  }, []);

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      const spotlight = document.getElementById('cursor-spotlight');
      if (spotlight) {
        // Hide spotlight during scroll to prevent position mismatch
        spotlight.style.opacity = '0';
      }
    });
  }, []);

  useEffect(() => {
    // Create spotlight element if it doesn't exist
    let spotlight = document.getElementById('cursor-spotlight');
    if (!spotlight) {
      spotlight = document.createElement('div');
      spotlight.id = 'cursor-spotlight';
      spotlight.style.opacity = '0';
      document.body.appendChild(spotlight);
    }

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (spotlight && spotlight.parentNode) {
        spotlight.parentNode.removeChild(spotlight);
      }
    };
  }, [handleMouseMove, handleScroll]);

  return null;
};

export default CursorSpotlight;