import {ReactNode} from "react";
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {layoutSelector} from "app/layout";

type Props = {
    headerSlot?: ReactNode;
    footerSlot?: ReactNode;
    isFooter?: boolean;
}
export const Desktop = (props: Props) => {
    const {headerSlot, footerSlot, isFooter = true} = props
    const layout = useSelector(layoutSelector);
    return (
        <div className="w-full h-[100dvh] scrollbar">
            {layout.hasHeader && headerSlot}
            <main className={`overflow-y-auto scrollbar `}
                  style={{height: layout.hasFooter ? "100dvh" : "calc(100dvh - 56px)"}}
            >
                <Outlet/>
            </main>
            {isFooter && footerSlot}
        </div>
    )
}