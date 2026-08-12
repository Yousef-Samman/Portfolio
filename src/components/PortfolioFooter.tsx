import type { PortfolioTheme } from '../theme/portfolioTheme';

type PortfolioFooterProps = {
  theme: PortfolioTheme;
};

export function PortfolioFooter({ theme }: PortfolioFooterProps) {
  return (
    <footer className="mx-auto max-w-[1440px] px-4 pb-8 sm:px-6 sm:pb-10 md:px-12 md:pb-12 lg:px-24">
      <div
        className={`flex justify-center text-center text-[10px] font-sans uppercase tracking-[0.2em] sm:justify-end sm:text-right sm:tracking-[0.3em] ${theme.footerLabel}`}
      >
        <span className="max-w-full text-pretty">
          &copy; {new Date().getFullYear()} {theme.footerTag}
        </span>
      </div>
    </footer>
  );
}
