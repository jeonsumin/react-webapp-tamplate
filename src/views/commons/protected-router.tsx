import {Navigate, Outlet} from "react-router-dom";
import {isTablet} from "react-device-detect";
import {cookie} from "shared/utils/cookies.ts";

export const ProtectedRouter = () => {
    const token = cookie.get("token");
    // const {pathname} = useLocation();

    if (isTablet) return <Navigate to={"/promotion"} replace/>

    if (!token) return <Navigate to={"/welcome"} replace />

    return <Outlet/>
}