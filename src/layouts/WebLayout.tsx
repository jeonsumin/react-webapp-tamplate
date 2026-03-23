import { Sidebar } from '@/components/web/Sidebar';
import { Header } from '@/components/web/Header';

interface WebLayoutProps {
  children: React.ReactNode;
}

/**
 * Desktop web layout.
 * Structure: fixed sidebar (240px) on the left, header + content area on the right.
 */
export function WebLayout({ children }: WebLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - fixed width */}
      <Sidebar />

      {/* Main content area - offset by sidebar width */}
      <div className="flex flex-col flex-1 ml-60">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
