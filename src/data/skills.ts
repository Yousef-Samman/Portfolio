import type { TechSkillItem } from '../types/portfolio';
import css3Logo from '../assets/Logos/css3.png';
import gitIcon from '../assets/Logos/git.png';
import html5Logo from '../assets/Logos/html5.png';
import javascriptIcon from '../assets/Logos/javascript.png';
import mapboxIcon from '../assets/Logos/mapbox.webp';
import nodeJsIcon from '../assets/Logos/nodeJSIcon.ico';
import reactLogo from '../assets/Logos/react.png';
import socketIoIcon from '../assets/Logos/socket.png';
import supabaseIcon from '../assets/Logos/supabase.webp';
import tailwindIcon from '../assets/Logos/tailwind.png';
import viteIcon from '../assets/Logos/viteIcon.png';

export const TECH_STACK_ITEMS: TechSkillItem[] = [
  { name: 'React', iconSrc: reactLogo },
  { name: 'Node.js', iconSrc: nodeJsIcon },
  { name: 'JavaScript', iconSrc: javascriptIcon },
  { name: 'Vite', iconSrc: viteIcon },
  { name: 'HTML5', iconSrc: html5Logo },
  { name: 'CSS3', iconSrc: css3Logo },
];

export const TECH_TOOL_ITEMS: TechSkillItem[] = [
  { name: 'Mapbox', iconSrc: mapboxIcon },
  { name: 'Socket.IO', iconSrc: socketIoIcon },
  { name: 'Supabase', iconSrc: supabaseIcon },
  { name: 'Git', iconSrc: gitIcon },
  { name: 'Tailwind CSS', iconSrc: tailwindIcon },
];
