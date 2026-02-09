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
            <div className="absolute top-0 left-0 w-full h-screen bg-[#454545] opacity-50 z-[99999] gap-5"
                 onClick={closeModal}/>
            <div
                className={"fixed left-0 w-full bg-[var(--white)] z-[99999]"}
            >
                <div
                    className={`modal_header ${isLogo ? "logo" : ""} flex items-center justify-center px-[16px] py-[22px]`}
                >
                    <h1 className="text-[var(--bk)] text-[20px] font-bold">{title}</h1>
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
