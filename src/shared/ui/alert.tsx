import {ReactNode} from "react";

type Props = {
    title?: string;
    message?: string;
    children?: ReactNode;
    isCancel?: boolean;
    isConfirm?: boolean;
    onConfirm?: () => void;
    alertClose?: () => void;
};
export const Alert = (props: Props) => {
    const {title, message, isCancel, isConfirm, onConfirm, alertClose} = props;
    return (
        <>
            <div className="absolute top-0 left-0 w-full h-full bg-[#454545]/50 z-[99999] gap-5"
                 onClick={alertClose}/>
            <div
                className="flex flex-col fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center rounded-[10px] max-w-screen-sm w-[90%]  z-[99999]  py-10 bg-white">

                <div className="flex flex-col px-5 gap-3.5">
                    <h1 className="leading-[1.6] text-[24px] font-bold">
                        {title}
                    </h1>
                    {message && <span className="text-[16px] text-foreground">{message}</span>}
                </div>
                {
                    !isConfirm &&
                    <div className="flex w-full gap-[10px] px-5 bottom-10 z-50 mt-5">
                        {isCancel && <button
                            className="rounded-full bg-muted text-foregrounds text-5 font-bold flex items-center justify-center min-h-[60px] w-full"
                            onClick={alertClose}
                        >
                            취소
                        </button>}
                        <button
                            className="rounded-full bg-primary text-5 font-bold flex items-center justify-center min-h-[60px] w-full"
                            onClick={onConfirm}
                        >
                            확인
                        </button>
                    </div>
                }
            </div>
        </>

    );
};
