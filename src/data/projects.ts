import type { ProjectItem } from '../types/portfolio';

export const PROJECTS: ProjectItem[] = [
  {
    id: '01',
    title: 'HackathonHub',
    category: 'Graduation project · AI / Multi-Agent',
    featured: true,
    description:
      'Platform that scores hackathon submissions by running nine domain-specific agents in parallel on Azure AI Foundry. Agents pull grounded research through MCP tools and persist findings in Cosmos DB so judges get structured, citeable evaluation reports instead of a single opaque score.',
    tools: ['Azure AI Foundry', 'Python', 'MCP', 'Cosmos DB', 'React'],
    highlights: [
      'Nine parallel domain agents rather than a single monolithic prompt',
      'MCP research tools + Cosmos DB persistence for grounded, reviewable findings',
    ],
  },
  {
    id: '02',
    title: 'Tafweej Hajj',
    category: 'Course project · Full-stack',
    description:
      'Crowd-management web app for Hajj-scale scenarios: operators watch density on a Mapbox map while Socket.IO pushes live location updates from the Node backend so the dashboard reflects crowd movement without full page refreshes.',
    tools: ['React', 'Node.js', 'Socket.IO', 'Mapbox'],
    highlights: [
      'Real-time density updates over Socket.IO into a Mapbox map view',
    ],
    repoUrl: 'https://github.com/Yousef-Samman/Tafweej_Hajj',
  },
  {
    id: '03',
    title: 'Smart Notifier',
    category: 'Course / practice · Admin form',
    description:
      'Small admin workflow for logging and tracking item requests in one place — a form feeds a dashboard so staff can see request status without chasing messages across chats or spreadsheets.',
    tools: ['JavaScript', 'CSS', 'Backend logic'],
    repoUrl: 'https://github.com/Yousef-Samman/Smart_Item_Notifier_Form',
  },
  {
    id: '04',
    title: 'Travella',
    category: 'Course / practice · Front-end UI',
    description:
      'Front-end travel-booking UI built with Vite, JavaScript, and Tailwind — modular page sections for browsing and booking flows as a practice project in component structure and layout, not a production booking system.',
    tools: ['Vite', 'JavaScript', 'Tailwind CSS'],
    repoUrl: 'https://github.com/Amonaquel/Travella',
  },
];
