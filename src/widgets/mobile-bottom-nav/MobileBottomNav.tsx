import { NavLink } from 'react-router-dom';
import { useTranslation } from 'shared/hooks/useTranslation';

const navItems = [
  { to: '/', key: 'nav.home', icon: 'H' },
  { to: '/about', key: 'nav.about', icon: 'A' },
] as const;

export function BottomNavigation() {
  const { t } = useTranslation();
  return (
    <nav className="sticky bottom-0 z-10 h-16 bg-white border-t border-gray-200 flex items-center justify-around px-2">
      {navItems.map(({ to, key, icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-0.5 flex-1 py-1 transition-colors ${
              isActive ? 'text-blue-600' : 'text-gray-400'
            }`
          }
        >
          <span className="text-xl font-bold leading-none">{icon}</span>
          <span className="text-[10px] font-medium">{t(key)}</span>
        </NavLink>
      ))}
    </nav>
  );
}
