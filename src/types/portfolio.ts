export type TechSkillItem = {
  name: string;
  href?: string;
  iconSrc?: string;
};

export type ProjectItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  tools: string[];
  outcome: string;
  repoUrl: string;
};

export type ExperienceEntry = {
  company: string;
  role: string;
  date: string;
  startISO: string;
  endISO: string | null;
  logo?: string;
  summary: string;
  bullets: string[];
};

export type ExperienceWithTenure = ExperienceEntry & {
  tenureMonthsRounded: number;
  tenureLabel: string;
};
