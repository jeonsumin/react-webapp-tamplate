import {useSelector} from "react-redux";
import {Desktop, layoutState, Mobile} from "app/layout";
import {useEffect} from "react";

export const PageLayout = () => {
    const layout = useSelector(layoutState);

    useEffect(() => {
        console.log('layout component ', layout.component)
    }, []);
    return layout.component == "mobile"
        ? <Mobile headerSlot={<></>}/>
        : <Desktop headerSlot={<></>} footerSlot={<></>}/>
}