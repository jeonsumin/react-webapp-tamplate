import {BrowserView, MobileView, TabletView} from "react-device-detect";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {ModalProvider} from "app/provider";
import {Demo} from "views/demo";
import {ProtectedRouter} from "views/commons/protected-router.tsx";
import {Welcome} from "views/welcome";
import {ROUTES} from "shared/constance/routes.ts";
import {Promotion} from "views/promotion";
import {CheckIn} from "views/check-in";
import {PageLayout} from "app/layout";


export const AppRouter = () => {

    return (
        <BrowserRouter>
            <ModalProvider>
                {/* 데스트 탑 */}
                <BrowserView>
                    <Routes>
                        <Route path="/components" element={<Demo/>}></Route>
                        <Route path="/promotion" element={<Promotion/>}></Route>
                        <Route path="*" element={<Navigate to="/promotion"/>}/>
                    </Routes>
                </BrowserView>

                {/* 타블렛 */}
                <TabletView>
                    <Routes>
                        <Route path="/" element={<Demo/>}></Route>
                        <Route path="*" element={<Navigate to="/"/>}/>
                    </Routes>
                </TabletView>

                {/* 모바일 */}
                <MobileView>
                    <Routes>
                        <Route path="/components" element={<Demo/>}></Route>
                        <Route index path={ROUTES.WELCOME} element={<Welcome/>}/>
                        <Route element={<PageLayout/>}>
                            <Route index path={ROUTES.CHECK_IN} element={<CheckIn/>}/>

                            <Route path={"/"} element={<ProtectedRouter/>}>

                            </Route>

                        </Route>
                        <Route path="*" element={<Navigate to="/"/>}/>
                    </Routes>
                </MobileView>

            </ModalProvider>
        </BrowserRouter>
    );
}
