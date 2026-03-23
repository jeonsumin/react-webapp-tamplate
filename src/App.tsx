import { BrowserRouter } from 'react-router-dom';
import { LayoutProvider } from '@/layouts/LayoutProvider';
import { AppRouter } from '@/router/AppRouter';
import { ToastContainer } from '@/components/ui/Toast';
import { ModalContainer } from '@/components/ui/Modal';
import { DevToolsPanel } from '@/components/dev/DevToolsPanel';

export default function App() {
  return (
    <BrowserRouter>
      <LayoutProvider>
        <AppRouter />
      </LayoutProvider>
      <ToastContainer />
      <ModalContainer />
      {import.meta.env.DEV && <DevToolsPanel />}
    </BrowserRouter>
  );
}
