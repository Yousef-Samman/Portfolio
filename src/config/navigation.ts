export const NAV_SECTION_IDS = [
  'about',
  'experience',
  'projects',
  'skills',
  'contact',
] as const;

export type NavSectionId = (typeof NAV_SECTION_IDS)[number];
