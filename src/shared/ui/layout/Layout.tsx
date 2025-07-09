import {ReactNode} from "react";
import {Outlet} from "react-router-dom";

type Props = {
    headerSlot: ReactNode;
    navigationSlot?: ReactNode;
}

export const Layout = (props: Props) => {
    const {headerSlot, navigationSlot} = props;
    return (
        <div className="w-full min-h-[100dvh]  text-gray-900">
            <div className="max-w-screen-sm mx-auto flex flex-col min-h-[100dvh] relative bg-white">
                {headerSlot}
                <main className="flex-1 overflow-y-auto px-4 py-6">
                    <Outlet/>
                </main>
                {navigationSlot}
            </div>
        </div>
    )
}