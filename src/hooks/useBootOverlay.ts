import { useEffect, useState } from 'react';

export function useBootOverlay() {
  const [bootCover, setBootCover] = useState(true);
  const [bootFadeOut, setBootFadeOut] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setBootCover(false);
      return undefined;
    }

    document.body.style.overflow = 'hidden';
    const fadeTimer = window.setTimeout(() => setBootFadeOut(true), 1100);
    const hideTimer = window.setTimeout(() => {
      setBootCover(false);
      document.body.style.overflow = '';
    }, 1680);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
      document.body.style.overflow = '';
    };
  }, []);

  return { bootCover, bootFadeOut };
}
