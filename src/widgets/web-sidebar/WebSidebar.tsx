import { NavLink } from 'react-router-dom';
import { useTranslation } from '@/shared/hooks/useTranslation';

const navItems = [
  { to: '/', key: 'nav.home' },
  { to: '/about', key: 'nav.about' },
  { to: '/test', key: 'nav.test' },
] as const;

export function Sidebar() {
  const { t } = useTranslation();
  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-slate-900 text-white flex flex-col">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-slate-700">
        <span className="text-lg font-bold tracking-tight">Template</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map(({ to, key }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            {t(key)}
          </NavLink>
        ))}
      </nav>

      {/* Footer - dev mode indicator */}
      <div className="px-4 py-3 border-t border-slate-700">
        <span className="text-xs text-slate-500">Mode: WEB</span>
      </div>
    </aside>
  );
}
