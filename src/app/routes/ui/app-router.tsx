import {PageLayout} from "app/layout";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {routes} from "app/routes";
import {ModalProvider} from "app/provider";
import {Dashboard} from "pages/dashboard";


export const AppRouter = () => {

    return (
        <BrowserRouter>
            <ModalProvider>
                <Routes>

                    <Route path="/" element={<PageLayout/>}>
                        <Route path="/dashbaord" element={<Dashboard/>}/>
                        <Route index element={<Navigate to={routes[0].path}/>}/>
                    </Route>

                    <Route path="*" element={<Navigate to="/dashbaord"/>}/>
                </Routes>
            </ModalProvider>
        </BrowserRouter>
    );
}
