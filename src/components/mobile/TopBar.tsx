import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher';

interface TopBarProps {
  title?: string;
}

export function TopBar({ title = 'App' }: TopBarProps) {
  return (
    <header className="sticky top-0 z-10 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
      <LocaleSwitcher />
    </header>
  );
}
