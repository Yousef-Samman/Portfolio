import { useId, useState } from 'react';
import {
  CAREER_START_ISO,
  EXPERIENCE_FOR_TIMELINE,
  MAX_TENURE_MONTHS,
  TOTAL_TENURE_LABEL,
} from '../data/experience';
import type { ExperienceWithTenure } from '../types/portfolio';
import type { PortfolioTheme } from '../theme/portfolioTheme';
import { formatMonthYear } from '../utils/tenure';

type ExperienceSectionProps = {
  theme: PortfolioTheme;
};

/** Most recent roles default open; older roles start collapsed. */
const DEFAULT_EXPANDED_COUNT = 2;

function ExperienceEntryRow({
  entry,
  theme,
  expanded,
  onToggle,
}: {
  entry: ExperienceWithTenure;
  theme: PortfolioTheme;
  expanded: boolean;
  onToggle: () => void;
}) {
  const detailsId = useId();
  const barPct = Math.round(
    (entry.tenureMonthsRounded / MAX_TENURE_MONTHS) * 100,
  );
  const safePct = Math.max(14, Math.min(100, barPct));

  return (
    <li className="flex items-start gap-2.5 sm:gap-4">
      <div className="relative z-[1] flex w-6 shrink-0 justify-center pt-4 sm:w-12">
        <span
          className="box-border h-3 w-3 shrink-0 rounded-full border-2 border-cyan-400 bg-[#030508] shadow-[0_0_14px_rgba(34,211,238,0.4)]"
          aria-hidden
        />
      </div>

      <div className="min-w-0 flex-1 overflow-hidden rounded-xl border border-slate-700/90 bg-slate-900/90 backdrop-blur-sm transition-all duration-200 hover:border-cyan-500/40 hover:bg-slate-800/95 hover:shadow-[0_0_24px_rgba(34,211,238,0.08)] group">
        <button
          type="button"
          className="flex w-full cursor-pointer flex-col gap-2 px-3 py-3 text-left transition-colors duration-200 hover:bg-cyan-500/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/55 focus-visible:ring-inset sm:gap-2.5 sm:px-4 sm:py-3.5"
          aria-expanded={expanded}
          aria-controls={detailsId}
          onClick={onToggle}
        >
          <div className="flex items-start gap-2 sm:gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h4 className="min-w-0 text-base font-bold leading-snug tracking-tight text-slate-100 transition-colors group-hover:text-cyan-300 sm:text-lg">
                  {entry.company}
                </h4>
                <span
                  className={`mt-1 shrink-0 text-cyan-400/90 transition-transform motion-safe:duration-200 motion-reduce:transition-none sm:hidden ${
                    expanded ? 'rotate-180' : ''
                  }`}
                  aria-hidden
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
              <p className="mt-0.5 text-[11px] font-sans uppercase tracking-widest text-slate-400 sm:text-xs">
                {entry.role}
              </p>
              <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <p className={`text-xs font-medium ${theme.mutedDate}`}>
                  {entry.date}
                </p>
                <span className="text-slate-600" aria-hidden>
                  ·
                </span>
                <span className="font-sans text-[11px] font-extrabold uppercase tracking-wide text-cyan-300 tabular-nums sm:text-xs">
                  {entry.tenureLabel}
                </span>
              </div>
            </div>

            <div className="hidden shrink-0 items-start gap-2.5 sm:flex">
              {entry.logo ? (
                <img
                  src={entry.logo}
                  alt=""
                  className="h-10 w-[88px] rounded object-contain bg-white p-1 ring-1 ring-slate-600/75"
                  loading="lazy"
                />
              ) : (
                <span className="h-10 w-[88px]" aria-hidden />
              )}
              <span
                className={`mt-1.5 shrink-0 text-cyan-400/90 transition-transform motion-safe:duration-200 motion-reduce:transition-none ${
                  expanded ? 'rotate-180' : ''
                }`}
                aria-hidden
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>

          {entry.logo ? (
            <img
              src={entry.logo}
              alt=""
              className="h-8 w-[68px] rounded object-contain bg-white p-1 ring-1 ring-slate-600/75 sm:hidden"
              loading="lazy"
            />
          ) : null}

          <div className={theme.expTimelineTrack} role="presentation" aria-hidden>
            <div
              className={theme.expTimelineFill}
              style={{ width: `${safePct}%` }}
            />
          </div>
        </button>

        <div
          id={detailsId}
          role="region"
          aria-hidden={!expanded}
          className={`grid overflow-hidden motion-safe:transition-[grid-template-rows,opacity] motion-safe:duration-200 motion-reduce:transition-none ${
            expanded
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <div
              className={`space-y-2.5 border-t border-slate-700/60 px-3 pb-3 pt-2.5 sm:px-4 sm:pb-3.5 ${
                expanded ? '' : 'pointer-events-none'
              }`}
            >
              <p className="text-sm leading-relaxed text-slate-400">{entry.summary}</p>
              <div className="flex flex-wrap gap-1.5">
                {entry.bullets.map((bullet, index) => (
                  <span key={index} className={theme.chip}>
                    {bullet}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export function ExperienceSection({ theme }: ExperienceSectionProps) {
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    EXPERIENCE_FOR_TIMELINE.slice(0, DEFAULT_EXPANDED_COUNT).forEach((entry) => {
      initial.add(`${entry.startISO}-${entry.role}-${entry.company}`);
    });
    return initial;
  });

  const toggleEntry = (rowKey: string) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(rowKey)) {
        next.delete(rowKey);
      } else {
        next.add(rowKey);
      }
      return next;
    });
  };

  return (
    <section id="experience" className={`mb-16 pt-8 sm:mb-24 sm:pt-10 md:mb-28 ${theme.divider}`}>
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className={theme.sectionEyebrow}>
            <span className={theme.sectionEyebrowMark} aria-hidden />
            Experience
          </h3>
          <p className="mt-2 max-w-xl text-sm text-slate-400">
            Roles and tenure — expand a card for summary and focus areas.
          </p>
        </div>
        <div className="rounded-xl border border-cyan-500/25 bg-gradient-to-br from-cyan-950/40 to-slate-950/70 px-4 py-3 transition-all duration-200 hover:border-cyan-400/45 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] sm:min-w-[14rem]">
          <p className={`text-[10px] font-sans font-bold uppercase tracking-[0.22em] ${theme.heroQuoteLabel}`}>
            Total tenure
          </p>
          <p className="mt-1 font-sans text-xl font-extrabold tabular-nums tracking-tight text-cyan-100">
            {TOTAL_TENURE_LABEL}
          </p>
          <p className={`mt-1 text-[11px] ${theme.mutedDate}`}>
            {formatMonthYear(CAREER_START_ISO)} → Present
          </p>
        </div>
      </div>

      <div className="relative">
        <div
          className="pointer-events-none absolute left-3 top-4 bottom-4 w-px -translate-x-1/2 bg-gradient-to-b from-sky-400/55 via-cyan-400/40 to-cyan-500/20 sm:left-6"
          aria-hidden
        />
        <ul className="m-0 list-none space-y-3 p-0 sm:space-y-4">
          {EXPERIENCE_FOR_TIMELINE.map((entry) => {
            const rowKey = `${entry.startISO}-${entry.role}-${entry.company}`;
            return (
              <ExperienceEntryRow
                key={rowKey}
                entry={entry}
                theme={theme}
                expanded={expandedKeys.has(rowKey)}
                onToggle={() => toggleEntry(rowKey)}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
}
