import {ReactNode} from "react";
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

type Props = {
    headerSlot: ReactNode;
    navigationSlot?: ReactNode;
};

export const Mobile = (props: Props) => {
    const {headerSlot, navigationSlot} = props;
    const layout = useSelector((state: RootState) => state.layout);
    return (
        <div className="w-full min-h-[100dvh] text-[var(--bk)] max-w-[var(--maxWidth)] mx-auto ]">
            {headerSlot}
            <div className="max-w-screen-sm mx-auto flex flex-col min-h-[100dvh] relative bg-white scrollbar-hide">
                <main className={`overflow-y-auto scrollbar `}
                      style={{height: layout.hasFooter ? "calc(100dvh - 110px)" : "calc(100dvh - 50px)"}}
                >
                    <Outlet/>
                </main>
            </div>
            {layout.hasFooter && navigationSlot}
        </div>
    );
};
