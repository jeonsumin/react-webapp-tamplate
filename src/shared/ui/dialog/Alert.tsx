type Props = {
    title?: string;
    message?: string;
    isCancel?: boolean;
    onConfirm?: () => void;
    alertClose?: () => void;
};
export const Alert = (props: Props) => {
    const {title, message, isCancel, onConfirm, alertClose} = props;
    return (
        <>
            <div className="absolute top-0 left-0 w-full h-screen bg-[#454545] opacity-50 z-[99998]"/>
            <div
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center rounded-[10px] m-auto w-[90%] p-[40px_0] z-[99999] bg-white">
                <div className="flex flex-col space-y-2 flex items-center justify-center">
                    <h1 className="mx-2 mb-6 leading-[1.6] text-[24px] font-bold">
                        {title}
                    </h1>

                    <span className="mx-2 mb-6 text-[18px]">{message}</span>
                </div>

                <div className="flex w-full gap-[10px] px-5 bottom-10 z-[100000]">
                    <button
                        className="rounded-full bg-[#666] text-[var(--txt)] text-[20px] font-bold flex items-center justify-center min-h-[60px] w-full"
                        onClick={alertClose}
                    >
                        아니오
                    </button>
                    <button
                        className=" border-1 rounded-full bg-[var(--point)] text-[var(--txt)] text-[20px] font-bold flex items-center justify-center min-h-[60px] w-full"
                        onClick={onConfirm}
                    >
                        예
                    </button>
                </div>
            </div>
        </>

    );
};
