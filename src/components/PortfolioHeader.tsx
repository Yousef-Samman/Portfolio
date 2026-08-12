import { Link } from 'react-router-dom';
import {
  HASH_NAV_ITEMS,
  ROUTE_NAV_ITEMS,
  type NavItem,
  type NavItemId,
} from '../config/navigation';
import { CONTACT_INFO } from '../data/content';
import type { PortfolioTheme } from '../theme/portfolioTheme';
import githubIcon from '../assets/Logos/GhubLogo.jpg';
import linkedinIcon from '../assets/Logos/LinkedIn_logo.png';

type PortfolioHeaderProps = {
  theme: PortfolioTheme;
  activeSection: NavItemId;
};

function NavLinkLabel({ item }: { item: NavItem }) {
  if (item.shortLabel !== undefined) {
    return (
      <>
        <span className="sm:hidden">{item.shortLabel}</span>
        <span className="hidden sm:inline">{item.label}</span>
      </>
    );
  }
  return item.label;
}

export function PortfolioHeader({ theme, activeSection }: PortfolioHeaderProps) {
  function hashClass(id: NavItemId) {
    const state =
      activeSection === id ? theme.navHashActive : theme.navHashInactive;
    return `${theme.navItemBase} ${state} shrink-0`;
  }

  function routeClass(id: NavItemId) {
    const state =
      activeSection === id ? theme.navRouteActive : theme.navRouteInactive;
    return `${theme.navRouteBase} ${state} shrink-0`;
  }

  return (
    <header
      className="mb-10 flex flex-col gap-6 pb-8 sm:mb-14 sm:gap-8 sm:pb-10 md:mb-16 md:gap-10 md:pb-12 lg:mb-20 lg:flex-row lg:items-start lg:justify-between lg:gap-6"
    >
      <div className="min-w-0 w-full lg:flex-1 lg:pr-2">
        <h1
          className={`text-xl font-bold tracking-tighter uppercase mb-2 text-balance sm:text-2xl md:text-3xl lg:text-4xl ${theme.name}`}
        >
          <Link
            to="/"
            className="rounded-sm transition-colors duration-200 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/55"
          >
            {`${CONTACT_INFO.name} Portfolio`}
          </Link>
        </h1>
        <p
          className={`text-[10px] font-sans tracking-wide uppercase text-pretty sm:text-xs sm:tracking-widest ${theme.subtitle}`}
        >
          {CONTACT_INFO.credentialsLine}
        </p>
        <div className="mt-5 grid w-full max-w-[9rem] grid-cols-2 gap-x-2 sm:gap-x-3">
          <div className="flex min-w-0 flex-col items-center gap-2 text-center">
            <span className={theme.headerSocialLabel}>GitHub</span>
            <a
              href={`https://github.com/${CONTACT_INFO.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${theme.headerSocialLink} group flex h-11 w-11 shrink-0 sm:h-9 sm:w-9`}
              aria-label={`${CONTACT_INFO.name} on GitHub`}
            >
              <img src={githubIcon} alt="" className={theme.headerSocialImg} width={36} height={36} />
            </a>
          </div>
          <div className="flex min-w-0 flex-col items-center gap-2 text-center">
            <span className={theme.headerSocialLabel}>LinkedIn</span>
            <a
              href={`https://www.linkedin.com/in/${CONTACT_INFO.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${theme.headerSocialLink} group flex h-11 w-11 shrink-0 sm:h-9 sm:w-9`}
              aria-label={`${CONTACT_INFO.name} on LinkedIn`}
            >
              <img
                src={linkedinIcon}
                alt=""
                className={theme.headerSocialImg}
                width={36}
                height={36}
              />
            </a>
          </div>
        </div>
        <p className={`mt-4 text-pretty ${theme.headerSocialLabel}`}>
          <span>{CONTACT_INFO.location}</span>
        </p>
      </div>

      <nav
        className="flex w-full min-w-0 flex-col gap-4 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] sm:gap-5 sm:text-[11px] sm:tracking-[0.14em] lg:mt-0.5 lg:w-auto lg:max-w-[min(100%,36rem)] lg:shrink-0 lg:items-end xl:max-w-none xl:tracking-[0.18em]"
        aria-label="Primary"
      >
        <div className="w-full lg:w-auto lg:text-right">
          <span className={theme.navGroupLabel}>On this page</span>
          <div
            className="flex flex-wrap items-center gap-x-1 gap-y-1 sm:gap-x-2 sm:gap-y-1.5 md:gap-x-3 lg:justify-end xl:gap-x-4"
            role="group"
            aria-label="Sections on the home page"
          >
            {HASH_NAV_ITEMS.map((item) => {
              if (item.type !== 'hash') return null;
              return (
                <Link key={item.id} to={`/#${item.hash}`} className={hashClass(item.id)}>
                  <NavLinkLabel item={item} />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="w-full border-t border-slate-700/80 pt-3 sm:border-0 sm:pt-0 lg:w-auto lg:text-right">
          <span className={theme.navGroupLabel}>Pages</span>
          <div className="flex items-center gap-3 sm:gap-4 lg:justify-end">
            <div className={theme.navGroupDivider} aria-hidden />
            <div
              className="flex flex-wrap items-center gap-2 sm:gap-2.5"
              role="group"
              aria-label="Standalone pages"
            >
              {ROUTE_NAV_ITEMS.map((item) => {
                if (item.type !== 'route') return null;
                return (
                  <Link key={item.id} to={item.to} className={routeClass(item.id)}>
                    <NavLinkLabel item={item} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
