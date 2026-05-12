/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { ChevronRight, ArrowUpRight, Layers } from 'lucide-react';
import asqLogo from './assets/Logos/ASQ-Logo.png';
import snbLogo from './assets/Logos/SNB_Logo.jpg';
import ikeaLogo from './assets/Logos/Ikea-L.jpg';
import myPhoto from './assets/Logos/My-Photo.jpg';
import githubIcon from './assets/Logos/GhubLogo.jpg';
import linkedinIcon from './assets/Logos/LinkedIn_logo.png';
import gmailIcon from './assets/Logos/gmailIcon.jpg';
import viteIcon from './assets/Logos/viteIcon.png';
import reactLogo from './assets/Logos/react.png';
import nodeJsIcon from './assets/Logos/nodeJSIcon.ico';
import javascriptIcon from './assets/Logos/javascript.png';
import html5Logo from './assets/Logos/html5.png';
import css3Logo from './assets/Logos/css3.png';
import mapboxIcon from './assets/Logos/mapbox.webp';
import socketIoIcon from './assets/Logos/socket.png';
import supabaseIcon from './assets/Logos/supabase.webp';
import gitIcon from './assets/Logos/git.png';
import tailwindIcon from './assets/Logos/tailwind.png';

const NAV_SECTION_IDS = ['about', 'experience', 'projects', 'skills'] as const;

type NavSectionId = (typeof NAV_SECTION_IDS)[number];

function getTheme() {
  return {
        shell: 'min-h-screen bg-[#030508] text-slate-100 font-sans',
        headerBorder: 'border-b border-slate-700/90',
        name: 'text-slate-50',
        subtitle: 'text-slate-500',
        headerSocialLabel:
          'text-[10px] font-sans uppercase tracking-[0.2em] text-slate-500',
        headerSocialLink:
          'inline-block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/55 ring-offset-2 ring-offset-[#030508]',
        headerSocialImg:
          'h-9 w-9 rounded-lg object-contain opacity-95 hover:opacity-100 transition-opacity',
        navItemBase:
          'ring-offset-4 ring-offset-[#030508] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/55 rounded-sm px-1 -mx-1 transition-colors',
        navInactive: 'text-slate-400 hover:text-slate-200',
        navActive:
          'text-amber-300 underline decoration-amber-400/70 underline-offset-[4px]',
        statusBadge:
          'inline-flex items-center gap-2 px-3 py-1 border border-emerald-500/35 rounded-full text-[10px] font-sans uppercase mb-8 text-emerald-300/90 bg-emerald-950/35',
        statusPing: true,
        headline: 'text-slate-50',
        headlineAccent:
          'text-emerald-400 italic drop-shadow-[0_0_28px_rgb(52_211_153/0.25)]',
        heroPhotoWrap:
          'relative mb-12 w-full max-w-sm aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-emerald-500/25 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)]',
        lead: 'text-slate-400',
        cvButton:
          'inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-4 py-2 text-[11px] font-bold uppercase tracking-wide border border-emerald-500/35 text-emerald-300/95 bg-emerald-950/40 shadow-[inset_0_1px_0_0_rgb(52_211_153/0.08)] transition-all hover:bg-emerald-950/65 hover:border-emerald-500/50 hover:shadow-[0_0_14px_rgba(52,211,153,0.2)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/55',
        divider: 'border-t border-slate-600',
        dividerSoft: 'border-t border-slate-700',
        sectionLabel: 'text-slate-300',
        accentIcon: 'text-amber-400/80',
        mutedDate: 'text-slate-400 font-semibold tabular-nums tracking-tight',
        expCompanyRow:
          'mt-8 mb-2 flex flex-row items-start justify-between gap-3 sm:gap-4',
        expCompanyTitle:
          'min-w-0 flex-1 text-xl sm:text-2xl font-bold leading-snug tracking-tight text-slate-100 group-hover:text-emerald-300 transition-colors',
        roleMuted: 'text-sm font-sans uppercase tracking-widest mb-6 text-slate-400',
        summary: 'text-slate-400 mb-8',
        chip: 'text-[9px] uppercase px-2 py-1 bg-slate-950/60 border border-slate-600/80 rounded text-slate-300',
        expTenureWrap: 'mt-4',
        expTenureLabel:
          'inline-block font-sans text-xs sm:text-sm font-extrabold uppercase tracking-wide text-emerald-300 tabular-nums',
        expTimelineTrack:
          'mt-2 h-1.5 w-full rounded-full bg-slate-800/95 ring-1 ring-slate-700/65 overflow-hidden',
        expTimelineFill: 'h-full rounded-full bg-gradient-to-r from-emerald-700/85 to-emerald-400 transition-[width] duration-500 ease-out',
        expLogoImg:
          'mt-2 h-10 sm:h-11 w-auto max-w-[140px] shrink-0 object-contain rounded-md bg-white p-1.5 ring-1 ring-slate-600/75 shadow-sm',
        projectRow:
          'grid grid-cols-12 py-12 border-b border-slate-700 group cursor-pointer hover:pl-4 transition-colors hover:bg-slate-900/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030508]',
        projectId:
          'font-bold tabular-nums tracking-tight text-sm sm:text-base text-emerald-400/95 drop-shadow-[0_0_12px_rgb(52_211_153/0.35)]',
        projectTitle: 'text-2xl font-bold text-slate-100 group-hover:text-emerald-300 transition-colors',
        projectCat: 'text-[10px] font-sans uppercase tracking-widest text-slate-500',
        projectDesc: 'text-sm text-slate-400 leading-relaxed max-w-sm',
        iconCircle:
          'w-12 h-12 rounded-full border border-slate-600 flex items-center justify-center group-hover:bg-emerald-500/15 group-hover:border-emerald-500/50 group-hover:text-emerald-300 transition-all',
        eduCard:
          'col-span-12 md:col-span-6 p-12 bg-emerald-950/25 text-slate-100 border border-emerald-500/20 rounded-sm shadow-[inset_0_0_0_1px_rgb(52_211_153/0.06)]',
        eduHeading: 'text-xs font-sans uppercase tracking-widest mb-8 text-emerald-400/70',
        eduTitle: 'text-3xl font-serif italic mb-4 text-slate-50',
        eduSub: 'text-sm mb-2 text-slate-400',
        eduGpa:
          'inline-block px-4 py-2.5 bg-emerald-500/12 border border-emerald-500/30 rounded font-sans text-2xl font-extrabold tabular-nums tracking-tight mb-12 text-emerald-100',
        eduRow:
          'flex items-center gap-4 text-xs font-sans uppercase tracking-widest border-b border-emerald-500/15 pb-4 text-slate-300',
        eduChevron: 'text-emerald-400 shrink-0',
        skillsCard:
          'col-span-12 md:col-span-6 p-12 border border-slate-700 bg-slate-900/50 rounded-sm backdrop-blur-sm',
        skillsHeading: 'text-xs font-sans uppercase tracking-widest mb-8 text-slate-500',
        skillsColTitle: 'text-[10px] font-bold uppercase mb-4 tracking-widest text-amber-200/70',
        skillsList: 'text-sm space-y-2 text-slate-400',
        skillsToolList: 'space-y-0',
        skillsToolRow:
          'flex items-center gap-3 border-b border-slate-700/65 py-2.5 last:border-b-0',
        skillsToolIconWrap:
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-950/55 ring-1 ring-slate-600/65',
        skillsToolIconImg: 'h-5 w-5 object-contain opacity-95',
        skillsToolName: 'text-[13px] text-slate-300',
        skillsToolLink:
          'text-[13px] text-slate-300 underline-offset-2 hover:text-emerald-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/45 rounded-sm',
        footerLabel: 'text-slate-500',
        contactPhoneLink:
          'normal-case tabular-nums no-underline transition-colors hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/45 rounded-sm',
        heroIntroInCard:
          'relative z-[1] mt-4 border-t border-emerald-500/25 pt-4 text-base md:text-lg leading-relaxed text-balance font-sans font-normal text-slate-400',
        heroQuote:
          'text-base md:text-lg leading-relaxed text-balance font-sans font-semibold tracking-tight text-slate-100 not-italic [&_p]:m-0',
        heroQuoteCard:
          'relative w-full overflow-hidden rounded-xl border border-emerald-500/30 border-l-[4px] border-l-emerald-400/80 bg-emerald-950/40 px-4 py-4 shadow-[inset_0_1px_0_0_rgb(52_211_153/0.06)] md:px-5 md:py-5',
        heroQuoteLabel:
          'relative z-[1] mb-2 block text-[9px] font-sans font-bold uppercase tracking-[0.28em] text-emerald-400/90',
        heroQuoteMark:
          'pointer-events-none absolute right-3 top-2 font-serif text-5xl leading-none text-emerald-500/15 md:text-6xl',
        footerTag: `NOC Console Theme`,
      } as const;
}

// --- Data (Consistent with CV) ---
const CONTACT_INFO = {
  name: "Yousef Samman",
  /** Shown under the main title (pipe-separated). */
  credentialsLine: "IT Graduate | CCST Cisco Certified | KAU",
  location: "Jeddah, Saudi Arabia",
  email: "yousef.m.samman@gmail.com",
  phone: "+966 55 673 2100",
  github: "Yousef-Samman",
  linkedin: "yousef-samman-615bb2213"
};

const HERO_INTRO_TEXT =
  'B.Sc. IT, KAU · CCST Networking · Store manager with hands-on troubleshooting POS/printers and device issues. SNB digital banking exposure; IKEA and prior roles for pace and people.';

const HERO_QUOTE_TEXT =
  "Always push yourself to the limit that's the only way UP!";

const PROJECTS = [
  {
    id: "01",
    title: "Tafweej Hajj",
    category: "Full-Stack System",
    description: "Crowd management platform with real-time tracking and safety modules.",
    tools: ["React", "Node.js", "Socket.IO", "Mapbox"],
    outcome: "Real-time sync established for density data.",
    repoUrl: "https://github.com/Yousef-Samman/Tafweej_Hajj",
  },
  {
    id: "02",
    title: "Smart Notifier",
    category: "Logistics Admin",
    description: "Systematic item request tracking via centralized dashboard.",
    tools: ["JS", "CSS", "Backend Logic"],
    outcome: "Operational tracking efficiency improvement.",
    repoUrl: "https://github.com/Yousef-Samman/Smart_Item_Notifier_Form",
  },
  {
    id: "03",
    title: "Travella",
    category: "Interface Design",
    description: "Modular front-end architecture for travel booking services.",
    tools: ["Vite", "JavaScript", "Tailwind"],
    outcome: "Component-based modularity showcase.",
    repoUrl: "https://github.com/Amonaquel/Travella",
  },
];

type TechSkillItem = {
  name: string;
  /** Official / docs URL when you want the label to be a link */
  href?: string;
  /** Optional logo; add when you have assets (e.g. `import x from '...png'`). */
  iconSrc?: string;
};

const TECH_STACK_ITEMS: TechSkillItem[] = [
  { name: "React", iconSrc: reactLogo },
  { name: "Node.js", iconSrc: nodeJsIcon },
  { name: "JavaScript", iconSrc: javascriptIcon },
  { name: "Vite", iconSrc: viteIcon },
  { name: "HTML5", iconSrc: html5Logo },
  { name: "CSS3", iconSrc: css3Logo },
];

const TECH_TOOL_ITEMS: TechSkillItem[] = [
  { name: "Mapbox", iconSrc: mapboxIcon },
  { name: "Socket.IO", iconSrc: socketIoIcon },
  { name: "Supabase", iconSrc: supabaseIcon },
  { name: "Git", iconSrc: gitIcon },
  { name: "Tailwind CSS", iconSrc: tailwindIcon },
];

/** ISO date on first of start month · end null = Present (today at render) · end inclusive */
const EXPERIENCE = [
  {
    company: "ASQ INTERNATIONAL Food & Beverages Co. Ltd",
    role: "Store Manager",
    date: "Dec 2025 - Present",
    startISO: "2025-12-01",
    endISO: null,
    logo: asqLogo,
    summary: "Leading daily operations at Crepe & Dip, managing team performance, and maintaining service excellence.",
    bullets: ["Store Management", "Technical Support", "Team Leadership"],
  },
  {
    company: "ASQ INTERNATIONAL Food & Beverages Co. Ltd",
    role: "Cashier",
    date: "Sep 2025 - Dec 2025",
    startISO: "2025-09-01",
    endISO: "2025-12-31",
    logo: asqLogo,
    summary: "Handled POS transactions, issued receipts, and supported customer service in a fast-paced environment.",
    bullets: ["POS Operations", "Customer Service", "Teamwork"],
  },
  {
    company: "The Saudi National Bank (SNB)",
    role: "Digital Banking COOP",
    date: "Jun 2025 - Aug 2025",
    startISO: "2025-06-01",
    endISO: "2025-08-31",
    logo: snbLogo,
    summary: "Supported digital banking operations and process improvement activities.",
    bullets: ["Digital Banking Exposure", "IT Operations Support", "Team Collaboration"],
  },
  {
    company: "IKEA",
    role: "Salesperson",
    date: "Jun 2023 - Feb 2025",
    startISO: "2023-06-01",
    endISO: "2025-02-28",
    logo: ikeaLogo,
    summary:
      "Delivered customer-focused solutions on the showroom floor, coordinated with logistics for stock availability, and contributed to target-driven weekly execution across departments.",
    bullets: [
      "Customer Engagement",
      "Sales Performance",
      "Goal Alignment",
      "Showroom operations",
      "Cross-team coordination",
    ],
  },
  {
    company: "Al-Ittihad Al-Mobtaker Co. Ltd.",
    role: "Head Waiter",
    date: "Sep 2021 - Aug 2022",
    startISO: "2021-09-01",
    endISO: "2022-08-31",
    summary: "Led front-line service operations and supported daily team coordination.",
    bullets: ["Team Leadership", "Service Quality", "Operations Discipline"],
  },
];

function formatTenureFromMonths(monthsRounded: number): string {
  const m = Math.max(1, monthsRounded);
  const y = Math.floor(m / 12);
  const mo = m % 12;
  if (y > 0 && mo > 0) return `${y} yr ${mo} mo`;
  if (y > 0) return `${y} yr`;
  return `${mo} mo`;
}

function tenureRoundedMonths(startISO: string, endISO: string | null): number {
  const start = new Date(`${startISO}T12:00:00`);
  const end = endISO ? new Date(`${endISO}T12:00:00`) : new Date();
  const days = Math.max(0, (end.getTime() - start.getTime()) / 86400000);
  return Math.max(1, Math.round(days / (365.25 / 12)));
}

const EXPERIENCE_WITH_TENURE = EXPERIENCE.map((exp) => {
  const tenureMonthsRounded = tenureRoundedMonths(exp.startISO, exp.endISO);
  return {
    ...exp,
    tenureMonthsRounded,
    tenureLabel: formatTenureFromMonths(tenureMonthsRounded),
  };
});

function formatMonthYear(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

const MAX_TENURE_MONTHS = Math.max(
  ...EXPERIENCE_WITH_TENURE.map((e) => e.tenureMonthsRounded),
  1,
);

/** Newest first (present → past) for the timeline list. */
const EXPERIENCE_FOR_TIMELINE = [...EXPERIENCE_WITH_TENURE].sort((a, b) =>
  b.startISO.localeCompare(a.startISO),
);

const CAREER_START_ISO = EXPERIENCE_WITH_TENURE.reduce(
  (earliest, e) => (e.startISO < earliest ? e.startISO : earliest),
  EXPERIENCE_WITH_TENURE[0]!.startISO,
);

const TOTAL_TENURE_MONTHS_SUM = EXPERIENCE_WITH_TENURE.reduce(
  (acc, e) => acc + e.tenureMonthsRounded,
  0,
);
const TOTAL_TENURE_LABEL = formatTenureFromMonths(TOTAL_TENURE_MONTHS_SUM);

/** Anchors for RF-style ripple rings (percent positions). */
const NOC_RF_SITES = [
  { x: '12%', y: '22%', d0: '0s', d1: '1.5s' },
  { x: '82%', y: '18%', d0: '2.4s', d1: '4s' },
  { x: '50%', y: '56%', d0: '1.1s', d1: '2.9s' },
  { x: '90%', y: '70%', d0: '3.6s', d1: '5.2s' },
  { x: '8%', y: '72%', d0: '2.2s', d1: '3.8s' },
  { x: '72%', y: '42%', d0: '0.8s', d1: '2.1s' },
  { x: '34%', y: '12%', d0: '1.4s', d1: '3.1s' },
  { x: '62%', y: '78%', d0: '2.9s', d1: '4.4s' },
  { x: '44%', y: '38%', d0: '0.4s', d1: '2s' },
] as const;

/** Full-screen network-style boot overlay (runs on hard refresh / first paint). */
function NetworkBootOverlay({ fadeOut }: { fadeOut: boolean }) {
  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#010409]/96 transition-opacity duration-500 ease-out ${
        fadeOut ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      aria-busy={!fadeOut}
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="relative flex flex-col items-center gap-8 px-6">
        <svg
          className="h-36 w-36 sm:h-44 sm:w-44"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <linearGradient id="boot-edge" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(16 185 129)" stopOpacity="0.15" />
              <stop offset="50%" stopColor="rgb(52 211 153)" stopOpacity="0.85" />
              <stop offset="100%" stopColor="rgb(34 211 238)" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <g fill="none" strokeLinecap="round" strokeWidth={2.2} opacity={0.55}>
            <path d="M100 36 L164 100 L100 164 L36 100 Z" stroke="url(#boot-edge)" />
            <path d="M100 36 L100 164" stroke="url(#boot-edge)" strokeOpacity={0.45} />
            <path d="M36 100 L164 100" stroke="url(#boot-edge)" strokeOpacity={0.45} />
          </g>
          <path
            d="M100 36 L164 100 L100 164 L36 100 Z"
            fill="none"
            strokeWidth={2.8}
            strokeLinecap="round"
            strokeDasharray="10 18"
            className="motion-safe:animate-net-loader-dash motion-reduce:opacity-60"
            stroke="rgb(52 211 153)"
            opacity={0.9}
          />
          {(
            [
              [100, 36],
              [164, 100],
              [100, 164],
              [36, 100],
            ] as const
          ).map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={5}
              fill="rgb(52 211 153)"
              className="motion-safe:animate-loader-node motion-reduce:opacity-80"
              style={{ animationDelay: `${i * 0.18}s` }}
            />
          ))}
          <circle cx={100} cy={100} r={4} fill="rgb(245 158 11)" opacity={0.95} />
        </svg>
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-emerald-400/80">
          Establishing routes
        </p>
      </div>
    </div>
  );
}

// --- Components ---

/** Dark NOC — isometric weave, DWDM-style spectrum lanes, RF ripples, long-haul fiber strokes. */
function NocBackdrop() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-[#010409]" aria-hidden />

      <div
        className="absolute inset-0 opacity-[0.56] motion-safe:animate-mesh-drift motion-reduce:animate-none motion-reduce:opacity-[0.28]"
        style={{
          backgroundImage: `
            linear-gradient(30deg, rgb(52 211 153 / 0.095) 10.5%, transparent 10.8%),
            linear-gradient(-30deg, rgb(45 212 191 / 0.072) 10.5%, transparent 10.8%)
          `,
          backgroundSize: '68px 68px, 68px 68px',
          backgroundPosition: '0 0, 34px 34px',
        }}
        aria-hidden
      />

      <div className="absolute inset-0 motion-safe:animate-bg-float-y motion-reduce:animate-none">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_100%_72%_at_50%_8%,rgb(34_197_94/0.22),transparent_56%)] motion-safe:animate-noc-radial-a motion-reduce:animate-none"
          aria-hidden
        />
      </div>
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_48%_40%_at_94%_4%,rgb(245_158_11/0.16),transparent_50%)] motion-safe:animate-noc-radial-b motion-reduce:animate-none"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_42%_36%_at_6%_94%,rgb(34_211_238/0.14),transparent_54%)] motion-safe:animate-noc-radial-c motion-reduce:animate-none"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute -left-[18%] top-[22%] h-[48%] w-[136%] bg-[linear-gradient(102deg,transparent_16%,rgb(52_211_153/0.16)_38%,rgb(34_211_238/0.13)_52%,rgb(16_185_129/0.09)_66%,transparent_84%)] blur-[88px] motion-safe:animate-spectrum-shift motion-reduce:opacity-35"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-[14%] bottom-[8%] h-[38%] w-[118%] bg-[linear-gradient(78deg,transparent_22%,rgb(16_185_129/0.12)_48%,rgb(52_211_153/0.1)_62%,transparent_80%)] blur-[72px] motion-safe:animate-spectrum-shift motion-reduce:opacity-30"
        style={{ animationDelay: '-6s' }}
        aria-hidden
      />

      {NOC_RF_SITES.map((site, i) => (
        <div
          key={i}
          className="pointer-events-none absolute"
          style={{ left: site.x, top: site.y, transform: 'translate(-50%, -50%)' }}
        >
          <div className="relative h-px w-px">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div
                className="h-[min(42vmin,360px)] w-[min(42vmin,360px)] rounded-full border border-emerald-400/38 motion-safe:animate-net-ripple motion-reduce:hidden origin-center"
                style={{ animationDelay: site.d0 }}
              />
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div
                className="h-[min(54vmin,460px)] w-[min(54vmin,460px)] rounded-full border border-teal-300/22 motion-safe:animate-net-ripple-slow motion-reduce:hidden origin-center"
                style={{ animationDelay: site.d1 }}
              />
            </div>
          </div>
        </div>
      ))}

      <div
        className="absolute inset-0 opacity-[0.055] mix-blend-overlay motion-reduce:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-[linear-gradient(to_top,rgb(6_78_59/0.14),rgb(15_23_42/0.04),transparent)]"
        aria-hidden
      />

      <svg
        className="absolute inset-0 h-full w-full opacity-[0.42]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1920 1080"
        aria-hidden
      >
        <defs>
          <linearGradient id="noc-fiber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(52 211 153)" stopOpacity="0" />
            <stop offset="50%" stopColor="rgb(52 211 153)" stopOpacity="0.52" />
            <stop offset="100%" stopColor="rgb(45 212 191)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M-40 880 L480 120 L1040 400 L1960 200"
          fill="none"
          stroke="url(#noc-fiber)"
          strokeWidth={1.25}
          strokeLinecap="round"
        />
        <path
          d="M-80 320 L720 980 L1500 640 L2000 880"
          fill="none"
          stroke="url(#noc-fiber)"
          strokeWidth={1}
          strokeOpacity={0.78}
          strokeLinecap="round"
        />
        <path
          d="M 120 120 L 420 520 L 880 180 L 1320 640 L 1720 200"
          fill="none"
          stroke="url(#noc-fiber)"
          strokeWidth={0.85}
          strokeOpacity={0.58}
          strokeLinecap="round"
          strokeDasharray="3 10"
        />
      </svg>

      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_96%_90%_at_50%_50%,transparent_20%,rgb(1_4_12/0.86))]"
        aria-hidden
      />
    </div>
  );
}

export default function App() {
  const t = getTheme();
  const [activeNavSection, setActiveNavSection] = useState<NavSectionId>('about');
  const [bootCover, setBootCover] = useState(true);
  const [bootFadeOut, setBootFadeOut] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setBootCover(false);
      return undefined;
    }
    document.body.style.overflow = 'hidden';
    const t1 = window.setTimeout(() => setBootFadeOut(true), 1100);
    const t2 = window.setTimeout(() => {
      setBootCover(false);
      document.body.style.overflow = '';
    }, 1680);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add('portfolio-noc');
    return () => {
      html.classList.remove('portfolio-noc');
    };
  }, []);

  /** Highlight the nav item for the section whose top has passed ~upper viewport. */
  useEffect(() => {
    let raf = 0;
    const offset = () => Math.min(200, Math.max(112, Math.round(window.innerHeight * 0.2)));

    const update = () => {
      let current: NavSectionId = NAV_SECTION_IDS[0];
      const y = offset();
      for (const id of NAV_SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= y) current = id;
      }
      setActiveNavSection((prev) => (prev === current ? prev : current));
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    onScrollOrResize();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  function navHrefClass(section: NavSectionId) {
    const state = activeNavSection === section ? t.navActive : t.navInactive;
    return `${t.navItemBase} ${state}`;
  }

  return (
    <div className={t.shell}>
      <div className="fixed inset-0 z-0 overflow-hidden motion-safe:animate-backdrop-boot motion-reduce:opacity-100">
        <NocBackdrop />
      </div>

      <div className="relative z-10">
      <main className="max-w-[1440px] mx-auto px-12 md:px-24 pt-24 pb-48">
        {/* Header / Nav */}
        <header className={`flex flex-row flex-nowrap items-start justify-between gap-4 pb-12 mb-24 ${t.headerBorder}`}>
           <div className="min-w-0 flex-1 pr-2">
              <h1 className={`text-2xl font-bold tracking-tighter uppercase mb-2 sm:text-3xl md:text-4xl ${t.name}`}>
                 {`${CONTACT_INFO.name} Portfolio`}
              </h1>
              <p className={`text-xs font-sans tracking-widest uppercase ${t.subtitle}`}>
                 {CONTACT_INFO.credentialsLine}
              </p>
              <div className="mt-5 grid w-full max-w-[13.5rem] grid-cols-3 gap-x-2 sm:gap-x-3">
                 <div className="flex min-w-0 flex-col items-center gap-2 text-center">
                    <span className={t.headerSocialLabel}>GitHub</span>
                    <a
                       href={`https://github.com/${CONTACT_INFO.github}`}
                       target="_blank"
                       rel="noopener noreferrer"
                       className={`${t.headerSocialLink} flex h-9 w-9 shrink-0 items-center justify-center`}
                       aria-label={`${CONTACT_INFO.name} on GitHub`}
                    >
                       <img src={githubIcon} alt="" className={t.headerSocialImg} width={36} height={36} />
                    </a>
                 </div>
                 <div className="flex min-w-0 flex-col items-center gap-2 text-center">
                    <span className={t.headerSocialLabel}>LinkedIn</span>
                    <a
                       href={`https://www.linkedin.com/in/${CONTACT_INFO.linkedin}`}
                       target="_blank"
                       rel="noopener noreferrer"
                       className={`${t.headerSocialLink} flex h-9 w-9 shrink-0 items-center justify-center`}
                       aria-label={`${CONTACT_INFO.name} on LinkedIn`}
                    >
                       <img src={linkedinIcon} alt="" className={t.headerSocialImg} width={36} height={36} />
                    </a>
                 </div>
                 <div className="flex min-w-0 flex-col items-center gap-2 text-center">
                    <span className={t.headerSocialLabel}>Gmail</span>
                    <a
                       href={`mailto:${CONTACT_INFO.email}`}
                       className={`${t.headerSocialLink} flex h-9 w-9 shrink-0 items-center justify-center`}
                       aria-label={`Email ${CONTACT_INFO.name}`}
                    >
                       <img src={gmailIcon} alt="" className={t.headerSocialImg} width={36} height={36} />
                    </a>
                 </div>
              </div>
              <p className={`mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1 ${t.headerSocialLabel}`}>
                 <span>{CONTACT_INFO.location}</span>
                 <span className="opacity-50" aria-hidden>
                    ·
                 </span>
                 <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className={t.contactPhoneLink}>
                    {CONTACT_INFO.phone}
                 </a>
              </p>
           </div>
           <nav
              className="mt-0.5 flex shrink-0 flex-nowrap items-center justify-end gap-x-3 overflow-x-auto overflow-y-visible [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-x-4 md:gap-x-5 md:pl-2 [&::-webkit-scrollbar]:hidden font-sans text-[10px] sm:text-[11px] md:text-[0.6875rem] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] md:tracking-[0.2em]"
           >
              <a href="#about" className={`${navHrefClass('about')} shrink-0 whitespace-nowrap`}>Info</a>
              <a href="#experience" className={`${navHrefClass('experience')} shrink-0 whitespace-nowrap`}>Timeline</a>
              <a href="#projects" className={`${navHrefClass('projects')} shrink-0 whitespace-nowrap`}>Projects</a>
              <a href="#skills" className={`${navHrefClass('skills')} shrink-0 whitespace-nowrap`}>
                Education & Tools
              </a>
           </nav>
        </header>

        {/* Hero / About */}
        <section id="about" className="mb-48 grid grid-cols-12 gap-y-8">
           <div className="col-span-12">
              <span className={t.statusBadge}>
                 {t.statusPing ? (
                    <span className="relative flex h-1.5 w-1.5">
                       <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-55" />
                       <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                    </span>
                 ) : null}
                 Status — Online
              </span>
           </div>
           <div className="col-span-12 flex flex-col md:flex-row md:items-center gap-x-10 md:gap-x-12 lg:gap-x-16 gap-y-8">
              <div className="mx-auto w-full max-w-sm shrink-0 md:mx-0">
                 <div className={`${t.heroPhotoWrap} md:mb-0`}>
                    <img
                       src={myPhoto}
                       alt={`Portrait of ${CONTACT_INFO.name}`}
                       className="absolute inset-0 h-full w-full object-cover"
                       loading="eager"
                       decoding="async"
                       fetchPriority="high"
                    />
                 </div>
              </div>
              <div className="flex min-w-0 flex-1 flex-col items-stretch md:grid md:min-h-[32rem] md:max-w-none md:grid-rows-[1fr_auto] md:gap-y-8">
                 <div className="flex min-h-0 w-full max-w-2xl flex-1 flex-col justify-center md:h-full md:min-h-0 md:flex-none md:justify-center">
                    <div className={t.heroQuoteCard}>
                       <span className={t.heroQuoteLabel}>Personal slogan</span>
                       <span className={t.heroQuoteMark} aria-hidden>
                          &ldquo;
                       </span>
                       <blockquote className={`relative z-[1] m-0 ${t.heroQuote}`}>
                          <p>{HERO_QUOTE_TEXT}</p>
                       </blockquote>
                       <p className={t.heroIntroInCard}>{HERO_INTRO_TEXT}</p>
                    </div>
                 </div>
                 <a
                    href="#"
                    className={`${t.cvButton} mt-10 w-fit max-w-full shrink-0 self-start justify-self-start md:row-start-2 md:mt-0`}
                 >
                    Download CV <ArrowUpRight size={12} aria-hidden />
                 </a>
              </div>
           </div>
        </section>

        {/* Experience — chronological spine + rail cards */}
        <section id="experience" className={`mb-48 pt-12 ${t.divider}`}>
           <h3 className={`text-xs font-sans uppercase tracking-[0.3em] font-bold mb-10 ${t.sectionLabel}`}>
              Experience Timeline
           </h3>

           <div className="mb-10 rounded-sm border border-emerald-500/25 bg-emerald-950/25 px-6 py-5 ring-1 ring-emerald-500/15">
              <p className={`text-[10px] font-sans font-bold uppercase tracking-[0.28em] ${t.heroQuoteLabel}`}>
                 Cumulative tenure (all roles)
              </p>
              <p className="mt-2 font-sans text-2xl font-extrabold tabular-nums tracking-tight text-emerald-100">
                 {TOTAL_TENURE_LABEL}
              </p>
              <p className={`mt-2 text-xs ${t.mutedDate}`}>
                 Career line · {formatMonthYear(CAREER_START_ISO)} → Present
              </p>
           </div>

           <div className="relative">
              {/* Spine: centered in the w-12 gutter so dots and line share one axis */}
              <div
                 className="pointer-events-none absolute left-6 top-6 bottom-6 w-px -translate-x-1/2 bg-gradient-to-b from-amber-400/60 via-emerald-400/45 to-emerald-500/25"
                 aria-hidden
              />
              <ul className="m-0 list-none space-y-10 p-0 md:space-y-12">
                 {EXPERIENCE_FOR_TIMELINE.map((exp) => {
                    const barPct = Math.round(
                       (exp.tenureMonthsRounded / MAX_TENURE_MONTHS) * 100,
                    );
                    const safePct = Math.max(14, Math.min(100, barPct));
                    const rowKey = `${exp.startISO}-${exp.role}-${exp.company}`;

                    return (
                       <li key={rowKey} className="flex items-start gap-5 md:gap-8">
                          <div className="relative z-[1] flex w-12 shrink-0 justify-center pt-[18px] md:w-12">
                             <span
                                className="box-border h-3 w-3 shrink-0 rounded-full border-2 border-emerald-400 bg-[#030508] shadow-[0_0_14px_rgba(52,211,153,0.4)]"
                                aria-hidden
                             />
                          </div>
                          <div className="grid min-w-0 flex-1 grid-cols-1 gap-6 border border-slate-700/90 bg-slate-900/90 p-6 transition-colors hover:bg-slate-800/95 group md:grid-cols-[11rem_1fr] md:gap-10 md:p-10 backdrop-blur-sm">
                             <aside className="flex flex-col gap-1 border-b border-slate-700/50 pb-4 md:border-b-0 md:pb-0">
                                <p className={`text-[10px] font-sans uppercase tracking-widest ${t.mutedDate}`}>
                                   Date range
                                </p>
                                <p className={`text-xs sm:text-sm font-medium ${t.mutedDate}`}>{exp.date}</p>
                             </aside>
                             <div className="min-w-0 space-y-4 md:border-l md:border-slate-700/60 md:pl-10">
                                <div className={t.expTenureWrap}>
                                   <span className={t.expTenureLabel}>
                                      This role · {exp.tenureLabel}
                                   </span>
                                </div>
                                <div className={t.expTimelineTrack} role="presentation" aria-hidden>
                                   <div
                                      className={t.expTimelineFill}
                                      style={{ width: `${safePct}%` }}
                                   />
                                </div>
                                <div className={t.expCompanyRow}>
                                   <h4 className={t.expCompanyTitle}>{exp.company}</h4>
                                   {'logo' in exp && exp.logo ? (
                                      <img
                                         src={exp.logo}
                                         alt={`${exp.company} logo`}
                                         className={t.expLogoImg}
                                         loading="lazy"
                                      />
                                   ) : null}
                                </div>
                                <p className={t.roleMuted}>{exp.role}</p>
                                <p className={t.summary}>{exp.summary}</p>
                                <div className="flex flex-wrap gap-2">
                                   {exp.bullets.map((b, j) => (
                                      <span key={j} className={t.chip}>{b}</span>
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

        {/* Project Vertical / Table Style */}
        <section id="projects" className="mb-48">
           <div className="flex items-center justify-between mb-12">
              <h3 className={`text-xs font-sans uppercase tracking-[0.3em] font-bold ${t.sectionLabel}`}>Projects</h3>
              <span className={`text-[10px] font-sans ${t.mutedDate}`}>MODULAR IMPLEMENTATIONS (3)</span>
           </div>
           <div className={t.dividerSoft}>
              {PROJECTS.map((project, i) => (
                 <a
                    key={i}
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={t.projectRow}
                    aria-label={`${project.title}: view GitHub repository`}
                 >
                    <div className={`col-span-12 md:col-span-1 text-[10px] font-sans self-center ${t.projectId}`}>
                       /{project.id}
                    </div>
                    <div className="col-span-12 md:col-span-4 mt-4 md:mt-0">
                       <h4 className={t.projectTitle}>{project.title}</h4>
                       <span className={t.projectCat}>{project.category}</span>
                    </div>
                    <div className="col-span-12 md:col-span-5 mt-4 md:mt-0">
                       <p className={t.projectDesc}>
                          {project.description}
                       </p>
                    </div>
                    <div className="col-span-12 md:col-span-2 mt-4 md:mt-0 flex justify-end">
                       <div className={t.iconCircle}>
                          <img src={githubIcon} alt="" className="h-5 w-5 rounded-sm object-contain opacity-90" width={20} height={20} />
                       </div>
                    </div>
                 </a>
              ))}
           </div>
        </section>

        {/* Education & Tools */}
        <section id="skills" className="mb-48">
           <div className="flex items-center justify-between mb-12">
              <h3 className={`text-xs font-sans uppercase tracking-[0.3em] font-bold ${t.sectionLabel}`}>
                 Education & Tools
              </h3>
           </div>
           <div className="grid grid-cols-12 gap-12">
           <div className={t.eduCard}>
              <h3 className={t.eduHeading}>Education</h3>
              <h4 className={t.eduTitle}>B.Sc. Information Technology</h4>
              <p className={t.eduSub}>King Abdulaziz University, Jeddah</p>
              <div className={t.eduGpa}>
                 GPA: 4.85 / 5.0
              </div>
              <div className="space-y-4">
                 <div className={t.eduRow}>
                    <ChevronRight size={14} className={t.eduChevron} /> CCST Networking - Cisco (Apr 2025)
                 </div>
                 <div className={t.eduRow}>
                    <ChevronRight size={14} className={t.eduChevron} /> Alison Sales Management Diploma (Apr 2024)
                 </div>
                 <div className={t.eduRow}>
                    <ChevronRight size={14} className={t.eduChevron} /> Java Programming - Udemy (May 2023)
                 </div>
                 <div className={t.eduRow}>
                    <ChevronRight size={14} className={t.eduChevron} /> JavaScript Essentials (Dec 2022)
                 </div>
              </div>
           </div>
           <div className={t.skillsCard}>
              <h3 className={t.skillsHeading}>Technical Toolkit</h3>
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8">
                 <div>
                    <h5 className={t.skillsColTitle}>Stack</h5>
                    <ul className={t.skillsToolList} role="list">
                       {TECH_STACK_ITEMS.map((item) => (
                          <li key={item.name} className={t.skillsToolRow}>
                             <span className={t.skillsToolIconWrap}>
                                {item.iconSrc ? (
                                   <img src={item.iconSrc} alt="" className={t.skillsToolIconImg} width={20} height={20} />
                                ) : (
                                   <Layers className="h-4 w-4 shrink-0 opacity-50" strokeWidth={1.75} aria-hidden />
                                )}
                             </span>
                             {item.href ? (
                                <a href={item.href} className={t.skillsToolLink} target="_blank" rel="noopener noreferrer">
                                   {item.name}
                                </a>
                             ) : (
                                <span className={t.skillsToolName}>{item.name}</span>
                             )}
                          </li>
                       ))}
                    </ul>
                 </div>
                 <div>
                    <h5 className={t.skillsColTitle}>Tools</h5>
                    <ul className={t.skillsToolList} role="list">
                       {TECH_TOOL_ITEMS.map((item) => (
                          <li key={item.name} className={t.skillsToolRow}>
                             <span className={t.skillsToolIconWrap}>
                                {item.iconSrc ? (
                                   <img src={item.iconSrc} alt="" className={t.skillsToolIconImg} width={20} height={20} />
                                ) : (
                                   <Layers className="h-4 w-4 shrink-0 opacity-50" strokeWidth={1.75} aria-hidden />
                                )}
                             </span>
                             {item.href ? (
                                <a href={item.href} className={t.skillsToolLink} target="_blank" rel="noopener noreferrer">
                                   {item.name}
                                </a>
                             ) : (
                                <span className={t.skillsToolName}>{item.name}</span>
                             )}
                          </li>
                       ))}
                    </ul>
                 </div>
              </div>
           </div>
           </div>
        </section>
      </main>

      <footer className="max-w-[1440px] mx-auto px-12 pb-12 grid grid-cols-12">
         <div className={`col-span-12 flex justify-end text-[10px] font-sans uppercase tracking-[0.3em] ${t.footerLabel}`}>
            <span>&copy; {new Date().getFullYear()} {t.footerTag}</span>
         </div>
      </footer>
      </div>
      {bootCover ? (
        <NetworkBootOverlay fadeOut={bootFadeOut} />
      ) : null}
    </div>
  );
}
