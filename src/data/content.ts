export const CONTACT_INFO = {
  name: 'Yousef Samman',
  credentialsLine: 'IT Graduate | AI Focus | CCST | KAU',
  location: 'Jeddah, Saudi Arabia',
  github: 'Yousef-Samman',
  linkedin: 'yousef-samman-615bb2213',
} as const;

/** Brief About copy — kept short so the hero card matches the photo with no scroll. */
export const HERO_INTRO_PARAGRAPHS = [
  'IT graduate (KAU, 4.83 GPA) focused on AI. Built Hackathon Hub, a multi-agent AI evaluation system with 9 parallel sub-agents. Backed by 4+ years in operations and customer-facing roles. Looking to keep building in AI and software.',
] as const;

/** Featured graduation project shown beside the hero photo. */
export const HERO_FEATURED_PROJECT = {
  label: 'Graduation Project',
  title: 'HackathonHub',
  category: 'Multi-agent evaluation · Azure AI Foundry',
  description:
    'AI platform that evaluates hackathon submissions with parallel domain agents, MCP research tools, and Cosmos DB — producing grounded findings for scoring and review.',
  tools: ['Azure AI Foundry', 'Python', 'MCP', 'Cosmos DB', 'React'],
} as const;

export const EDUCATION_GPA = '4.83 / 5.0';

export const EDUCATION_CERTIFICATES = [
  'CCST Networking - Cisco (Apr 2025)',
  'Alison Sales Management Diploma (Apr 2024)',
  'Java Programming - Udemy (May 2023)',
  'JavaScript Essentials (Dec 2022)',
] as const;
