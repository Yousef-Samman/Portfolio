import { useEffect } from 'react';

/** Applies the global NOC backdrop class on the document root for the portfolio session. */
export function usePortfolioNocClass() {
  useEffect(() => {
    document.documentElement.classList.add('portfolio-noc');
    return () => {
      document.documentElement.classList.remove('portfolio-noc');
    };
  }, []);
}
