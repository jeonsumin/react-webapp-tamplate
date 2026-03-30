import { useTranslation } from 'shared/hooks/useTranslation';
import type { Locale } from 'shared/i18n';

interface LocaleSwitcherProps {
  className?: string;
}

export function LocaleSwitcher({ className = '' }: LocaleSwitcherProps) {
  const { locale, setLocale, locales } = useTranslation();

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {(Object.entries(locales) as [Locale, string][]).map(([key, label]) => (
        <button
          key={key}
          onClick={() => setLocale(key)}
          aria-pressed={locale === key}
          className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
            locale === key
              ? 'bg-blue-600 text-white'
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
