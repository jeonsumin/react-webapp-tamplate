import {PageLayout} from "app/layout";
import {BrowserView, MobileView, TabletView} from "react-device-detect";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {ModalProvider} from "app/provider";
import {Demo} from "views/demo";


export const AppRouter = () => {

    return (
        <BrowserRouter>
            <ModalProvider>
                {/* 데스트 탑 */}
                <BrowserView>
                    <Routes>
                        <Route path="/" element={<Demo/>}></Route>
                        <Route path="*" element={<Navigate to="/"/>}/>
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
                        <Route path="/" element={<Demo/>}></Route>
                        <Route path="*" element={<Navigate to="/"/>}/>
                    </Routes>
                </MobileView>

            </ModalProvider>
        </BrowserRouter>
    );
}
