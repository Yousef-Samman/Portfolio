import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import type { ProjectItem } from '../types/portfolio';
import type { PortfolioTheme } from '../theme/portfolioTheme';

type ProjectsSectionProps = {
  theme: PortfolioTheme;
};

/** Hub at center; project satellites around it (percent coords). */
const HUB = { x: 50, y: 48 };

const NODE_LAYOUT: Record<string, { x: number; y: number }> = {
  hackathonhub: { x: 18, y: 28 },
  'tafweej-hajj': { x: 82, y: 26 },
  'smart-notifier': { x: 84, y: 72 },
  travella: { x: 16, y: 74 },
};

function ProjectNode({
  project,
  theme,
  style,
}: {
  project: ProjectItem;
  theme: PortfolioTheme;
  style: { left: string; top: string };
}) {
  const isFeatured = Boolean(project.featured);

  return (
    <Link
      to={`/projects/${project.slug}`}
      style={style}
      className={[
        'absolute z-10 w-[min(100%,14.5rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl p-3.5 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 sm:w-[15.5rem] sm:p-4',
        'hover:-translate-y-[calc(50%+0.25rem)] motion-reduce:hover:translate-y-[-50%]',
        isFeatured
          ? 'bg-gradient-to-br from-cyan-950/85 via-slate-950/90 to-slate-950/95 ring-1 ring-cyan-500/40'
          : 'bg-slate-950/90 ring-1 ring-white/15 hover:ring-cyan-500/40',
      ].join(' ')}
      aria-label={`${project.title}${isFeatured ? ' (featured)' : ''} — open project details`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span
          className={
            isFeatured
              ? 'font-mono text-xs font-semibold tabular-nums text-cyan-300'
              : 'font-mono text-xs font-semibold tabular-nums text-cyan-500/70'
          }
        >
          {project.id}
        </span>
        {isFeatured ? (
          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-cyan-400/90">
            Featured
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400 group-hover:text-cyan-300">
            Details
            <ArrowUpRight size={11} aria-hidden />
          </span>
        )}
      </div>
      <h2 className="text-sm font-bold text-slate-100 sm:text-base">{project.title}</h2>
      <p className={`mt-0.5 line-clamp-1 ${theme.projectCat}`}>{project.category}</p>
      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-400">{project.summary}</p>
      <ul className="mt-2.5 flex list-none flex-wrap gap-1 p-0" aria-hidden>
        {project.tools.slice(0, 3).map((tool) => (
          <li key={tool}>
            <span className={theme.chip}>{tool}</span>
          </li>
        ))}
      </ul>
    </Link>
  );
}

function ProjectsHub() {
  return (
    <div
      style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}
      className="absolute z-20 w-[min(100%,17rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-gradient-to-br from-cyan-950/95 via-slate-950/95 to-[#030508]/95 p-5 ring-2 ring-cyan-400/50 shadow-[0_0_40px_-10px_rgba(34,211,238,0.5)] sm:w-[19rem] sm:p-6"
      role="note"
      aria-label="Projects overview"
    >
      <h1 className="text-xl font-bold tracking-tight text-slate-50 sm:text-2xl">Projects</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-400 sm:leading-6">
        Selected work across AI systems and full-stack builds. Each connected node opens a detail
        page with the full write-up, tech stack, and technical notes.
      </p>
    </div>
  );
}

function ProjectAgentMap({ theme }: { theme: PortfolioTheme }) {
  return (
    <>
      <div className="relative hidden min-h-[34rem] overflow-hidden rounded-2xl bg-slate-950/40 ring-1 ring-white/10 sm:block md:min-h-[38rem]">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 48%, rgba(34,211,238,0.16), transparent 32%), radial-gradient(circle at 20% 30%, rgba(14,165,233,0.06), transparent 22%)',
          }}
          aria-hidden
        />

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          {PROJECTS.map((project) => {
            const pos = NODE_LAYOUT[project.slug];
            if (!pos) return null;
            return (
              <line
                key={`hub-${project.slug}`}
                x1={HUB.x}
                y1={HUB.y}
                x2={pos.x}
                y2={pos.y}
                stroke="rgb(34 211 238 / 0.4)"
                strokeWidth="0.4"
                strokeLinecap="round"
              />
            );
          })}
          <circle cx={HUB.x} cy={HUB.y} r={2.2} fill="rgb(34 211 238 / 0.3)" />
          {Object.entries(NODE_LAYOUT).map(([slug, pos]) => (
            <circle key={slug} cx={pos.x} cy={pos.y} r={1.1} fill="rgb(34 211 238 / 0.22)" />
          ))}
        </svg>

        <ProjectsHub />

        {PROJECTS.map((project) => {
          const pos = NODE_LAYOUT[project.slug] ?? { x: 50, y: 50 };
          return (
            <ProjectNode
              key={project.id}
              project={project}
              theme={theme}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            />
          );
        })}
      </div>

      {/* Mobile: hub description, then project nodes */}
      <div className="sm:hidden">
        <div className="mb-4 rounded-2xl bg-gradient-to-br from-cyan-950/90 via-slate-950/90 to-slate-950/95 p-5 ring-2 ring-cyan-400/45">
          <h1 className="text-xl font-bold tracking-tight text-slate-50">Projects</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Selected work across AI systems and full-stack builds. Each node below opens a detail
            page with the full write-up, tech stack, and technical notes.
          </p>
        </div>

        <ol className="relative m-0 flex list-none flex-col gap-0 p-0">
          {PROJECTS.map((project, index) => {
            const isFeatured = Boolean(project.featured);
            const isLast = index === PROJECTS.length - 1;
            return (
              <li key={project.id} className="relative">
                {!isLast ? (
                  <span
                    className="absolute left-[1.15rem] top-10 bottom-0 w-px bg-cyan-500/30"
                    aria-hidden
                  />
                ) : null}
                <Link
                  to={`/projects/${project.slug}`}
                  className={[
                    'relative mb-3 flex gap-3 rounded-xl p-3.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/45',
                    isFeatured
                      ? 'bg-cyan-950/50 ring-1 ring-cyan-500/35'
                      : 'bg-slate-900/60 ring-1 ring-white/10',
                  ].join(' ')}
                >
                  <span
                    className={
                      isFeatured
                        ? 'mt-1 h-3.5 w-3.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]'
                        : 'mt-1 h-3.5 w-3.5 shrink-0 rounded-full bg-slate-600 ring-2 ring-cyan-500/40'
                    }
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] tabular-nums text-cyan-400/80">
                        {project.id}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.14em] text-cyan-300/90">
                        Details
                        <ArrowUpRight size={11} aria-hidden />
                      </span>
                    </span>
                    <span className="mt-1 block text-sm font-bold text-slate-100">
                      {project.title}
                    </span>
                    <span className={`mt-0.5 block ${theme.projectCat}`}>{project.category}</span>
                    <span className="mt-1.5 block text-xs leading-relaxed text-slate-400 line-clamp-2">
                      {project.summary}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}

export function ProjectsSection({ theme }: ProjectsSectionProps) {
  return <ProjectAgentMap theme={theme} />;
}
