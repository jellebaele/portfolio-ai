import { useEffect } from 'react';

export const useViewportHeight = (onViewportResize?: () => void) => {
  useEffect(() => {
    const visualViewport = window.visualViewport;

    const updateHeight = () => {
      const height = visualViewport?.height || window.innerHeight;
      document.documentElement.style.setProperty('--app-height', `${height}px`);
    };

    const handleResize = () => {
      updateHeight();

      // Trigger scroll (keyboard open/close)
      onViewportResize?.();
    };

    updateHeight();

    window.visualViewport?.addEventListener('resize', handleResize);
    window.addEventListener('resize', updateHeight);

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', updateHeight);
    };
  }, [onViewportResize]);
};
