/** In-page anchor sections that still live on the homepage. */
export const IN_PAGE_SECTION_IDS = [
  'about',
  'yousefai',
  'experience',
  'skills',
] as const;

export type InPageSectionId = (typeof IN_PAGE_SECTION_IDS)[number];

/** Nav items that are real routes (not homepage anchors). */
export const ROUTE_NAV_IDS = ['projects', 'contact'] as const;

export type RouteNavId = (typeof ROUTE_NAV_IDS)[number];

export const NAV_ITEM_IDS = [...IN_PAGE_SECTION_IDS, ...ROUTE_NAV_IDS] as const;

export type NavItemId = (typeof NAV_ITEM_IDS)[number];

/** @deprecated Prefer NavItemId — kept for gradual rename compatibility. */
export type NavSectionId = NavItemId;

export type NavItem =
  | {
      id: InPageSectionId;
      type: 'hash';
      /** Hash target on `/` (without `#`). */
      hash: InPageSectionId;
      label: string;
      shortLabel?: string;
    }
  | {
      id: RouteNavId;
      type: 'route';
      to: string;
      label: string;
      shortLabel?: string;
    };

/** Homepage scroll targets — shown as “on this page” links. */
export const HASH_NAV_ITEMS: readonly NavItem[] = [
  { id: 'about', type: 'hash', hash: 'about', label: 'Info' },
  {
    id: 'yousefai',
    type: 'hash',
    hash: 'yousefai',
    label: 'Yousef - ChatBot',
    shortLabel: 'ChatBot',
  },
  { id: 'experience', type: 'hash', hash: 'experience', label: 'Experience' },
  {
    id: 'skills',
    type: 'hash',
    hash: 'skills',
    label: 'Education',
  },
] as const;

/** Standalone pages — visually distinct from in-page anchors. */
export const ROUTE_NAV_ITEMS: readonly NavItem[] = [
  { id: 'projects', type: 'route', to: '/projects', label: 'Projects' },
  {
    id: 'contact',
    type: 'route',
    to: '/contact',
    label: 'Get in Touch',
    shortLabel: 'Contact',
  },
] as const;

/** Flat list (hash group first, then page routes). */
export const NAV_ITEMS: readonly NavItem[] = [...HASH_NAV_ITEMS, ...ROUTE_NAV_ITEMS];

/** Legacy alias — scroll-spy only watches homepage sections. */
export const NAV_SECTION_IDS = IN_PAGE_SECTION_IDS;
