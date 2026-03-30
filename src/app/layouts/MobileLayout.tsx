import { TopBar } from 'widgets/mobile-topbar/MobileTopBar';
import { BottomNavigation } from 'widgets/mobile-bottom-nav/MobileBottomNav';

interface MobileLayoutProps {
  children: React.ReactNode;
}

/**
 * Mobile layout.
 * Structure: top bar, scrollable content, bottom navigation.
 * Centered with max-width 430px to simulate a mobile device frame.
 */
export function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-[430px] bg-white flex flex-col min-h-screen shadow-lg">
        <TopBar />

        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>

        <BottomNavigation />
      </div>
    </div>
  );
}
