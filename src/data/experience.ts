import asqLogo from '../assets/Logos/ASQ-Logo.png';
import ikeaLogo from '../assets/Logos/Ikea-L.jpg';
import snbLogo from '../assets/Logos/SNB_Logo.jpg';
import type { ExperienceEntry, ExperienceWithTenure } from '../types/portfolio';
import {
  formatTenureFromMonths,
  tenureRoundedMonths,
} from '../utils/tenure';

const EXPERIENCE: ExperienceEntry[] = [
  {
    company: 'ASQ INTERNATIONAL Food & Beverages Co. Ltd',
    role: 'Store Manager',
    date: 'Dec 2025 - Present',
    startISO: '2025-12-01',
    endISO: null,
    logo: asqLogo,
    summary:
      'Leading daily operations at Crepe & Dip, managing team performance, and maintaining service excellence.',
    bullets: ['Store Management', 'Technical Support', 'Team Leadership'],
  },
  {
    company: 'ASQ INTERNATIONAL Food & Beverages Co. Ltd',
    role: 'Cashier',
    date: 'Sep 2025 - Dec 2025',
    startISO: '2025-09-01',
    endISO: '2025-12-31',
    logo: asqLogo,
    summary:
      'Handled POS transactions, issued receipts, and supported customer service in a fast-paced environment.',
    bullets: ['POS Operations', 'Customer Service', 'Teamwork'],
  },
  {
    company: 'The Saudi National Bank (SNB)',
    role: 'Digital Banking COOP',
    date: 'Jun 2025 - Aug 2025',
    startISO: '2025-06-01',
    endISO: '2025-08-31',
    logo: snbLogo,
    summary:
      'Supported digital banking operations and process improvement activities.',
    bullets: [
      'Digital Banking Exposure',
      'IT Operations Support',
      'Team Collaboration',
    ],
  },
  {
    company: 'IKEA',
    role: 'Salesperson',
    date: 'Jun 2023 - Feb 2025',
    startISO: '2023-06-01',
    endISO: '2025-02-28',
    logo: ikeaLogo,
    summary:
      'Delivered customer-focused solutions on the showroom floor, coordinated with logistics for stock availability, and contributed to target-driven weekly execution across departments.',
    bullets: [
      'Customer Engagement',
      'Sales Performance',
      'Goal Alignment',
      'Showroom operations',
      'Cross-team coordination',
    ],
  },
  {
    company: 'Al-Ittihad Al-Mobtaker Co. Ltd.',
    role: 'Head Waiter',
    date: 'Sep 2021 - Aug 2022',
    startISO: '2021-09-01',
    endISO: '2022-08-31',
    summary:
      'Led front-line service operations and supported daily team coordination.',
    bullets: ['Team Leadership', 'Service Quality', 'Operations Discipline'],
  },
];

export const EXPERIENCE_WITH_TENURE: ExperienceWithTenure[] = EXPERIENCE.map(
  (entry) => {
    const tenureMonthsRounded = tenureRoundedMonths(
      entry.startISO,
      entry.endISO,
    );
    return {
      ...entry,
      tenureMonthsRounded,
      tenureLabel: formatTenureFromMonths(tenureMonthsRounded),
    };
  },
);

export const MAX_TENURE_MONTHS = Math.max(
  ...EXPERIENCE_WITH_TENURE.map((entry) => entry.tenureMonthsRounded),
  1,
);

export const EXPERIENCE_FOR_TIMELINE = [...EXPERIENCE_WITH_TENURE].sort(
  (a, b) => b.startISO.localeCompare(a.startISO),
);

export const CAREER_START_ISO = EXPERIENCE_WITH_TENURE.reduce(
  (earliest, entry) =>
    entry.startISO < earliest ? entry.startISO : earliest,
  EXPERIENCE_WITH_TENURE[0]!.startISO,
);

export const TOTAL_TENURE_LABEL = formatTenureFromMonths(
  EXPERIENCE_WITH_TENURE.reduce(
    (total, entry) => total + entry.tenureMonthsRounded,
    0,
  ),
);
