import { Layers } from 'lucide-react';
import type { TechSkillItem } from '../types/portfolio';
import type { PortfolioTheme } from '../theme/portfolioTheme';

type ToolkitChipTrayProps = {
  stack: TechSkillItem[];
  tools: TechSkillItem[];
  theme: Pick<PortfolioTheme, 'sectionLabel' | 'skillsColTitle'>;
};

function ChipDie({ item }: { item: TechSkillItem }) {
  const body = (
    <>
      <span className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent" aria-hidden />
      <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950/70 ring-1 ring-slate-600/70">
        {item.iconSrc ? (
          <img src={item.iconSrc} alt="" className="h-5 w-5 object-contain" width={20} height={20} />
        ) : (
          <Layers className="h-4 w-4 opacity-50" strokeWidth={1.75} aria-hidden />
        )}
      </span>
      <span className="text-center text-[11px] font-semibold leading-tight text-slate-200">
        {item.name}
      </span>
      <span className="mt-2 flex gap-1" aria-hidden>
        <span className="h-1 w-1 rounded-full bg-cyan-500/50" />
        <span className="h-1 w-1 rounded-full bg-cyan-500/30" />
        <span className="h-1 w-1 rounded-full bg-slate-600" />
      </span>
    </>
  );

  const className =
    'group relative flex min-h-[7.25rem] flex-col items-center justify-center rounded-xl border border-slate-600/80 bg-gradient-to-b from-slate-900/90 to-slate-950/95 px-3 py-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] transition-colors hover:border-cyan-500/40 hover:from-cyan-950/40 hover:to-slate-950';

  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/45`}
      >
        {body}
      </a>
    );
  }

  return <div className={className}>{body}</div>;
}

function ChipBank({
  title,
  items,
  titleClass,
}: {
  title: string;
  items: TechSkillItem[];
  titleClass: string;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <h3 className={titleClass}>{title}</h3>
        <span className="h-px flex-1 bg-gradient-to-r from-slate-600/80 to-transparent" aria-hidden />
        <span className="font-mono text-[10px] tabular-nums text-slate-500">{items.length}</span>
      </div>
      <ul
        className="m-0 grid list-none grid-cols-2 gap-2.5 p-0 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        role="list"
      >
        {items.map((item) => (
          <li key={item.name}>
            <ChipDie item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Model-rack / chip-tray presentation of stack + tools. */
export function ToolkitChipTray({ stack, tools, theme }: ToolkitChipTrayProps) {
  return (
    <section aria-labelledby="toolkit-heading">
      <div className="mb-5 sm:mb-6">
        <h2
          id="toolkit-heading"
          className={`text-xs font-sans uppercase tracking-[0.3em] font-bold ${theme.sectionLabel}`}
        >
          Technical Toolkit
        </h2>
        <p className="mt-2 max-w-md text-sm font-medium leading-relaxed text-slate-300">
          Model rack
          <span className="mx-2 text-slate-600" aria-hidden>
            ·
          </span>
          <span className="font-normal text-slate-400">stack &amp; tools</span>
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-slate-950/55 p-4 ring-1 ring-white/10 sm:p-6 md:p-7">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
          aria-hidden
        />

        <div className="relative space-y-7 sm:space-y-8">
          <ChipBank title="Stack" items={stack} titleClass={theme.skillsColTitle} />
          <ChipBank title="Tools" items={tools} titleClass={theme.skillsColTitle} />
        </div>
      </div>
    </section>
  );
}
