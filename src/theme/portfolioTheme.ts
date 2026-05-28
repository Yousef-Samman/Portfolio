export function getPortfolioTheme() {
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
    expTimelineFill:
      'h-full rounded-full bg-gradient-to-r from-emerald-700/85 to-emerald-400 transition-[width] duration-500 ease-out',
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
    footerTag: 'Yousef Samman · IT Portfolio',
    contactCard:
      'rounded-sm border border-slate-700/90 bg-slate-900/90 backdrop-blur-sm',
    contactLabel:
      'mb-2 block text-[10px] font-sans font-bold uppercase tracking-widest text-slate-400',
    contactInput:
      'w-full rounded-lg border border-slate-600/90 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/35 disabled:opacity-50',
    contactTextarea:
      'w-full resize-y rounded-lg border border-slate-600/90 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/35 disabled:opacity-50 min-h-[8rem]',
    contactSubmit:
      'inline-flex cursor-pointer items-center justify-center rounded-lg px-6 py-3 text-[11px] font-bold uppercase tracking-wide border border-emerald-500/35 text-emerald-300/95 bg-emerald-950/40 transition-all hover:bg-emerald-950/65 hover:border-emerald-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/55',
    contactSubmitDisabled:
      'inline-flex cursor-not-allowed items-center justify-center rounded-lg px-6 py-3 text-[11px] font-bold uppercase tracking-wide border border-slate-600/80 text-slate-500 bg-slate-900/50 opacity-70',
    contactCalloutBox:
      'mb-10 rounded-sm border border-emerald-500/25 bg-emerald-950/25 px-6 py-5 ring-1 ring-emerald-500/15',
    contactCalloutText: 'text-sm leading-relaxed text-emerald-100/95',
    contactSuccess: 'text-sm text-emerald-300/90',
    contactError: 'text-sm text-amber-300/90',
  } as const;
}

export type PortfolioTheme = ReturnType<typeof getPortfolioTheme>;
