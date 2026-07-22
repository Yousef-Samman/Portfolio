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
      className={`flex flex-col gap-8 pb-10 mb-16 sm:gap-10 sm:pb-12 sm:mb-20 lg:mb-24 lg:flex-row lg:items-start lg:justify-between lg:gap-6 ${theme.headerBorder}`}
    >
      <div className="min-w-0 w-full lg:flex-1 lg:pr-2">
        <h1
          className={`text-xl font-bold tracking-tighter uppercase mb-2 text-balance sm:text-2xl md:text-3xl lg:text-4xl ${theme.name}`}
        >
          {`${CONTACT_INFO.name} Portfolio`}
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
        <p className={`mt-4 text-pretty ${theme.headerSocialLabel}`}>
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
        className="flex w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-2 font-sans text-[10px] font-semibold uppercase tracking-[0.12em] sm:gap-x-4 sm:text-[11px] sm:tracking-[0.16em] lg:mt-0.5 lg:w-auto lg:max-w-[min(100%,28rem)] lg:shrink-0 lg:justify-end lg:gap-x-3 lg:tracking-[0.14em] xl:max-w-none xl:gap-x-5 xl:tracking-[0.2em]"
        aria-label="Page sections"
      >
        <a href="#about" className={`${navHrefClass('about')} shrink-0`}>
          Info
        </a>
        <a href="#experience" className={`${navHrefClass('experience')} shrink-0`}>
          Timeline
        </a>
        <a href="#projects" className={`${navHrefClass('projects')} shrink-0`}>
          Projects
        </a>
        <a href="#skills" className={`${navHrefClass('skills')} shrink-0`}>
          Education & Tools
        </a>
        <a href="#contact" className={`${navHrefClass('contact')} shrink-0`}>
          Get in Touch
        </a>
      </nav>
    </header>
  );
}
