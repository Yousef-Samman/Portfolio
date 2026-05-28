import type { NavSectionId } from '../config/navigation';
import { CONTACT_INFO } from '../data/content';
import type { PortfolioTheme } from '../theme/portfolioTheme';
import githubIcon from '../assets/Logos/GhubLogo.jpg';
import linkedinIcon from '../assets/Logos/LinkedIn_logo.png';

type PortfolioHeaderProps = {
  theme: PortfolioTheme;
  activeSection: NavSectionId;
};

export function PortfolioHeader({ theme, activeSection }: PortfolioHeaderProps) {
  function navHrefClass(section: NavSectionId) {
    const state = activeSection === section ? theme.navActive : theme.navInactive;
    return `${theme.navItemBase} ${state}`;
  }

  return (
    <header
      className={`flex flex-row flex-nowrap items-start justify-between gap-4 pb-12 mb-24 ${theme.headerBorder}`}
    >
      <div className="min-w-0 flex-1 pr-2">
        <h1
          className={`text-2xl font-bold tracking-tighter uppercase mb-2 sm:text-3xl md:text-4xl ${theme.name}`}
        >
          {`${CONTACT_INFO.name} Portfolio`}
        </h1>
        <p className={`text-xs font-sans tracking-widest uppercase ${theme.subtitle}`}>
          {CONTACT_INFO.credentialsLine}
        </p>
        <div className="mt-5 grid w-full max-w-[9rem] grid-cols-2 gap-x-2 sm:gap-x-3">
          <div className="flex min-w-0 flex-col items-center gap-2 text-center">
            <span className={theme.headerSocialLabel}>GitHub</span>
            <a
              href={`https://github.com/${CONTACT_INFO.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${theme.headerSocialLink} flex h-9 w-9 shrink-0 items-center justify-center`}
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
              className={`${theme.headerSocialLink} flex h-9 w-9 shrink-0 items-center justify-center`}
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
        <p className={`mt-4 ${theme.headerSocialLabel}`}>
          <span>{CONTACT_INFO.location}</span>
          <span className="opacity-50" aria-hidden>
            {' '}
            ·{' '}
          </span>
          <a href="#contact" className={theme.contactPhoneLink}>
            Get in touch
          </a>
        </p>
      </div>
      <nav
        className="mt-0.5 flex shrink-0 flex-nowrap items-center justify-end gap-x-3 overflow-x-auto overflow-y-visible [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-x-4 md:gap-x-5 md:pl-2 [&::-webkit-scrollbar]:hidden font-sans text-[10px] sm:text-[11px] md:text-[0.6875rem] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] md:tracking-[0.2em]"
      >
        <a href="#about" className={`${navHrefClass('about')} shrink-0 whitespace-nowrap`}>
          Info
        </a>
        <a href="#experience" className={`${navHrefClass('experience')} shrink-0 whitespace-nowrap`}>
          Timeline
        </a>
        <a href="#projects" className={`${navHrefClass('projects')} shrink-0 whitespace-nowrap`}>
          Projects
        </a>
        <a href="#skills" className={`${navHrefClass('skills')} shrink-0 whitespace-nowrap`}>
          Education & Tools
        </a>
        <a href="#contact" className={`${navHrefClass('contact')} shrink-0 whitespace-nowrap`}>
          Get in Touch
        </a>
      </nav>
    </header>
  );
}
