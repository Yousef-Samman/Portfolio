import { useEffect } from 'react';

/** Applies the global AI theme class on the document root for the portfolio session. */
export function usePortfolioAiClass() {
  useEffect(() => {
    document.documentElement.classList.add('portfolio-ai');
    return () => {
      document.documentElement.classList.remove('portfolio-ai');
    };
  }, []);
}
