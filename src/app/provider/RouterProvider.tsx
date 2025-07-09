import {BaseLayout} from "app/layout/BaseLayout";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ROUTES} from "shared/config/routes";
import {HomePage} from "pages/main/HomePage";

export const RouterProvider = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<BaseLayout/>}>
                    <Route path={ROUTES.HOME} element={<HomePage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )

}