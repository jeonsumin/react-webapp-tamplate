import {useSelector} from "react-redux";
import {layoutSelector} from "app/store/slice/layout-slice.ts";

export const MobileHeader = () => {
    const layout = useSelector(layoutSelector);

    return (
        <header
            className={`h-[50px] w-full max-w-[var(--maxWidth)] mx-auto flex items-center justify-center bg-white top-0 sticky z-10 ${layout.referrer && "shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"}`}>
            {layout.routeName ? <p className="text-xl font-bold">{layout.routeName}</p> :
                <img src="/assets/images/logo.svg" alt={"logo"}/>}

        </header>
    )
}