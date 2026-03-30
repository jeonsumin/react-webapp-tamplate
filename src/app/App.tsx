import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "shared/ui/Toast";
import {ModalContainer} from "shared/ui/Modal";
import {DevToolsPanel} from "shared/dev/DevToolsPanel";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {LayoutProvider} from "./layouts/LayoutProvider";
import {AppRouter} from "./router/AppRouter";
import "./index.css"
import {createRoot} from "react-dom/client";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <LayoutProvider>
                <AppRouter/>
            </LayoutProvider>
            <ToastContainer/>
            <ModalContainer/>
            {import.meta.env.DEV && <DevToolsPanel/>}
            {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false}/>}

        </BrowserRouter>
    </QueryClientProvider>
);
