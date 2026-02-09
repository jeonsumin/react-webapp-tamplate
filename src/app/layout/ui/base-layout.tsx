import {useSelector} from "react-redux";
import {Desktop, layoutSelector, Mobile} from "app/layout";
import {MobileHeader} from "shared/ui/mobile-header.tsx";

export const PageLayout = () => {
    const layout = useSelector(layoutSelector);

    return layout.component == "mobile"
        ? <Mobile headerSlot={<MobileHeader/> }/>
        : <Desktop headerSlot={<></>} footerSlot={<></>}/>
}