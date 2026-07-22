import type { PortfolioTheme } from '../theme/portfolioTheme';

type PortfolioFooterProps = {
  theme: PortfolioTheme;
};

export function PortfolioFooter({ theme }: PortfolioFooterProps) {
  return (
    <footer className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 pb-8 md:pb-12 grid grid-cols-12">
      <div
        className={`col-span-12 flex justify-end text-[10px] font-sans uppercase tracking-[0.3em] ${theme.footerLabel}`}
      >
        <span>
          &copy; {new Date().getFullYear()} {theme.footerTag}
        </span>
      </div>
    </footer>
  );
}
