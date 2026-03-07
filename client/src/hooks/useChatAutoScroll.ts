import { useEffect } from 'react';

export const useChatAutoScroll = (onResize: () => void) => {
  useEffect(() => {
    window.visualViewport?.addEventListener('resize', onResize);
    return () => window.visualViewport?.removeEventListener('resize', onResize);
  }, [onResize]);
};
