import type { ProjectItem } from '../types/portfolio';

export const PROJECTS: ProjectItem[] = [
  {
    id: '01',
    title: 'HackathonHub',
    category: 'AI / Multi-Agent System',
    description:
      'Azure AI Foundry platform that evaluates hackathon submissions with parallel domain agents, MCP research tools, and Cosmos DB persistence.',
    tools: ['Azure AI Foundry', 'Python', 'MCP', 'Cosmos DB', 'React'],
    outcome: 'Structured, grounded domain findings for scoring and judge review.',
  },
  {
    id: '02',
    title: 'Tafweej Hajj',
    category: 'Full-Stack System',
    description:
      'Crowd management platform with real-time tracking and safety modules.',
    tools: ['React', 'Node.js', 'Socket.IO', 'Mapbox'],
    outcome: 'Real-time sync established for density data.',
    repoUrl: 'https://github.com/Yousef-Samman/Tafweej_Hajj',
  },
  {
    id: '03',
    title: 'Smart Notifier',
    category: 'Logistics Admin',
    description: 'Systematic item request tracking via centralized dashboard.',
    tools: ['JS', 'CSS', 'Backend Logic'],
    outcome: 'Operational tracking efficiency improvement.',
    repoUrl: 'https://github.com/Yousef-Samman/Smart_Item_Notifier_Form',
  },
  {
    id: '04',
    title: 'Travella',
    category: 'Interface Design',
    description: 'Modular front-end architecture for travel booking services.',
    tools: ['Vite', 'JavaScript', 'Tailwind'],
    outcome: 'Component-based modularity showcase.',
    repoUrl: 'https://github.com/Amonaquel/Travella',
  },
];
