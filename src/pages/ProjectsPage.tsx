import { PortfolioLayout } from '../components/PortfolioLayout';
import { ProjectsSection } from '../components/ProjectsSection';
import { ToolkitChipTray } from '../components/ToolkitChipTray';
import {
  PROJECTS_BUILD_PROGRESS_PERCENT,
  PROJECTS_SHOWCASE_LIVE,
} from '../config/projectsShowcase';
import { TECH_STACK_ITEMS, TECH_TOOL_ITEMS } from '../data/skills';
import { getPortfolioTheme } from '../theme/portfolioTheme';

function ProjectsBuildingPlaceholder({
  theme,
}: {
  theme: ReturnType<typeof getPortfolioTheme>;
}) {
  const pct = Math.max(0, Math.min(100, PROJECTS_BUILD_PROGRESS_PERCENT));

  return (
    <section
      className="mx-auto flex min-h-[min(28rem,70dvh)] max-w-2xl flex-col justify-center py-10 sm:py-16"
      aria-labelledby="projects-building-title"
    >
      <p className={theme.sectionEyebrow}>
        <span className={theme.sectionEyebrowMark} aria-hidden />
        Projects
      </p>

      <div className="relative mt-8 overflow-hidden rounded-2xl border border-cyan-500/25 bg-gradient-to-b from-cyan-950/35 via-slate-950/80 to-slate-950/95 px-5 py-8 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.75)] ring-1 ring-cyan-500/10 sm:px-8 sm:py-10">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
          aria-hidden
        />

        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400/85">
          Status
        </p>
        <h1
          id="projects-building-title"
          className="mt-3 text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl"
        >
          Building in progress
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">
          Coming soon
        </p>

        <div className="mt-8">
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
              Progress
            </span>
            <span className="font-sans text-sm font-extrabold tabular-nums text-cyan-200">
              {pct}%
            </span>
          </div>
          <div
            className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800/95 ring-1 ring-slate-700/70"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            aria-label="Projects page build progress"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-700/90 to-cyan-400 transition-[width] duration-700 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Showcase temporarily offline while projects are upgraded.
          </p>
        </div>
      </div>
    </section>
  );
}

export function ProjectsPage() {
  const theme = getPortfolioTheme();

  if (!PROJECTS_SHOWCASE_LIVE) {
    return (
      <PortfolioLayout>
        <ProjectsBuildingPlaceholder theme={theme} />
      </PortfolioLayout>
    );
  }

  return (
    <PortfolioLayout>
      <ProjectsSection theme={theme} />

      <div className="mt-10 sm:mt-12">
        <ToolkitChipTray
          stack={TECH_STACK_ITEMS}
          tools={TECH_TOOL_ITEMS}
          theme={theme}
        />
      </div>
    </PortfolioLayout>
  );
}
