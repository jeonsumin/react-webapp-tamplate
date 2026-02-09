import {ReactNode} from "react";
import {X} from "lucide-react";

type Props = {
    title?: string;
    isLogo?: boolean;
    body?: ReactNode;
    closeModal?: () => void;
};

export const Modal = ({title, isLogo, body, closeModal}: Props) => {
    return (
        <>
            <div
                className={"fixed left-0 top-0 h-screen w-full bg-white z-[99999]"}
            >
                <div
                    className={`modal_header ${isLogo ? "logo" : ""} flex items-center justify-center px-[16px] py-[22px]`}
                >
                    <h1 className="text-foreground text-xl font-bold">{title}</h1>
                    <button
                        className="absolute right-[16px]"
                        onClick={closeModal}
                        aria-label="닫기"
                    >
                        <X size={24} className="text-[var(--bk)]"/>
                    </button>
                </div>
                <div className="scrollbar">{body}</div>
            </div>
        </>
    );
};
