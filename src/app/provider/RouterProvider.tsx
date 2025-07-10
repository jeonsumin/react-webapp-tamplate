import {BaseLayout} from "app/layout/BaseLayout";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {ROUTES} from "shared/config/routes";
import {HomeDetailPage} from "pages/main/HomeDetailPage";
import {HomePage} from "pages/main/HomePage";
import {SettingPage} from "pages/settgins/SettingPage";

export const RouterProvider = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<BaseLayout/>} path={"/"}>
                    <Route index element={<Navigate to={ROUTES.MAIN} replace/>}/>
                    <Route path={ROUTES.MAIN} element={<HomePage/>}/>
                    <Route path={ROUTES.SETTINGS} element={<SettingPage/>}/>
                </Route>

                <Route element={<BaseLayout isDetail={true}/>}>
                    <Route path={ROUTES.MAIN_DETAIL} element={<HomeDetailPage/>}/>
                    <Route path={ROUTES.SETTINGS_DETAIL} element={<SettingPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )

}