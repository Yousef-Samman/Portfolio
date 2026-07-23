import {
  CAREER_START_ISO,
  EXPERIENCE_FOR_TIMELINE,
  MAX_TENURE_MONTHS,
  TOTAL_TENURE_LABEL,
} from '../data/experience';
import type { PortfolioTheme } from '../theme/portfolioTheme';
import { formatMonthYear } from '../utils/tenure';

type ExperienceSectionProps = {
  theme: PortfolioTheme;
};

export function ExperienceSection({ theme }: ExperienceSectionProps) {
  return (
    <section id="experience" className={`mb-24 md:mb-48 pt-8 md:pt-12 ${theme.divider}`}>
      <h3
        className={`text-xs font-sans uppercase tracking-[0.3em] font-bold mb-10 ${theme.sectionLabel}`}
      >
        Experience
      </h3>

      <div className="mb-8 rounded-sm border border-cyan-500/25 bg-cyan-950/25 px-4 py-4 ring-1 ring-cyan-500/15 sm:mb-10 sm:px-6 sm:py-5">
        <p className={`text-[10px] font-sans font-bold uppercase tracking-[0.28em] ${theme.heroQuoteLabel}`}>
          Total experience (all roles)
        </p>
        <p className="mt-2 font-sans text-2xl font-extrabold tabular-nums tracking-tight text-cyan-100">
          {TOTAL_TENURE_LABEL}
        </p>
        <p className={`mt-2 text-xs ${theme.mutedDate}`}>
          From {formatMonthYear(CAREER_START_ISO)} → Present
        </p>
      </div>

      <div className="relative">
        <div
          className="pointer-events-none absolute left-4 top-6 bottom-6 w-px -translate-x-1/2 bg-gradient-to-b from-sky-400/55 via-cyan-400/40 to-cyan-500/20 sm:left-6"
          aria-hidden
        />
        <ul className="m-0 list-none space-y-8 p-0 sm:space-y-10 md:space-y-12">
          {EXPERIENCE_FOR_TIMELINE.map((entry) => {
            const barPct = Math.round(
              (entry.tenureMonthsRounded / MAX_TENURE_MONTHS) * 100,
            );
            const safePct = Math.max(14, Math.min(100, barPct));
            const rowKey = `${entry.startISO}-${entry.role}-${entry.company}`;

            return (
              <li key={rowKey} className="flex items-start gap-3 sm:gap-5 md:gap-8">
                <div className="relative z-[1] flex w-8 shrink-0 justify-center pt-[18px] sm:w-12">
                  <span
                    className="box-border h-3 w-3 shrink-0 rounded-full border-2 border-cyan-400 bg-[#030508] shadow-[0_0_14px_rgba(34,211,238,0.4)]"
                    aria-hidden
                  />
                </div>
                <div className="grid min-w-0 flex-1 grid-cols-1 gap-4 border border-slate-700/90 bg-slate-900/90 p-4 transition-colors hover:bg-slate-800/95 group sm:gap-6 sm:p-6 md:grid-cols-[11rem_1fr] md:gap-10 md:p-10 backdrop-blur-sm">
                  <aside className="flex flex-col gap-1 border-b border-slate-700/50 pb-4 md:border-b-0 md:pb-0">
                    <p className={`text-[10px] font-sans uppercase tracking-widest ${theme.mutedDate}`}>
                      Date range
                    </p>
                    <p className={`text-xs sm:text-sm font-medium ${theme.mutedDate}`}>
                      {entry.date}
                    </p>
                  </aside>
                  <div className="min-w-0 space-y-4 md:border-l md:border-slate-700/60 md:pl-10">
                    <div className={theme.expTenureWrap}>
                      <span className={theme.expTenureLabel}>
                        This role · {entry.tenureLabel}
                      </span>
                    </div>
                    <div className={theme.expTimelineTrack} role="presentation" aria-hidden>
                      <div
                        className={theme.expTimelineFill}
                        style={{ width: `${safePct}%` }}
                      />
                    </div>
                    <div className={theme.expCompanyRow}>
                      <h4 className={theme.expCompanyTitle}>{entry.company}</h4>
                      {entry.logo ? (
                        <img
                          src={entry.logo}
                          alt={`${entry.company} logo`}
                          className={theme.expLogoImg}
                          loading="lazy"
                        />
                      ) : null}
                    </div>
                    <p className={theme.roleMuted}>{entry.role}</p>
                    <p className={theme.summary}>{entry.summary}</p>
                    <div className="flex flex-wrap gap-2">
                      {entry.bullets.map((bullet, index) => (
                        <span key={index} className={theme.chip}>
                          {bullet}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
