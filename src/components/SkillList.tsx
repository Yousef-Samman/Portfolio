import { Layers } from 'lucide-react';
import type { TechSkillItem } from '../types/portfolio';
import type { PortfolioTheme } from '../theme/portfolioTheme';

type SkillListProps = {
  items: TechSkillItem[];
  theme: Pick<
    PortfolioTheme,
    | 'skillsToolList'
    | 'skillsToolRow'
    | 'skillsToolIconWrap'
    | 'skillsToolIconImg'
    | 'skillsToolName'
    | 'skillsToolLink'
  >;
};

export function SkillList({ items, theme }: SkillListProps) {
  return (
    <ul className={theme.skillsToolList} role="list">
      {items.map((item) => (
        <li key={item.name} className={theme.skillsToolRow}>
          <span className={theme.skillsToolIconWrap}>
            {item.iconSrc ? (
              <img
                src={item.iconSrc}
                alt=""
                className={theme.skillsToolIconImg}
                width={20}
                height={20}
              />
            ) : (
              <Layers className="h-4 w-4 shrink-0 opacity-50" strokeWidth={1.75} aria-hidden />
            )}
          </span>
          {item.href ? (
            <a
              href={item.href}
              className={theme.skillsToolLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.name}
            </a>
          ) : (
            <span className={theme.skillsToolName}>{item.name}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
