import { BrowserRouter } from "react-router-dom";
import { LayoutProvider } from "@/app/layouts/LayoutProvider";
import { AppRouter } from "@/app/router/AppRouter";
import { ToastContainer } from "@/shared/ui/Toast";
import { ModalContainer } from "@/shared/ui/Modal";
import { DevToolsPanel } from "@/shared/dev/DevToolsPanel";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App() {
  return (
    <BrowserRouter>
      <LayoutProvider>
        <AppRouter />
      </LayoutProvider>
      <ToastContainer />
      <ModalContainer />
      {import.meta.env.DEV && <DevToolsPanel />}
      <ReactQueryDevtools initialIsOpen={false} />
    </BrowserRouter>
  );
}
