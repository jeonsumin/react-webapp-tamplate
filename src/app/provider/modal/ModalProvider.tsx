import {createContext, ReactNode, useState} from "react";
import {Modal} from "shared/ui/modal.tsx";
import {Alert} from "shared/ui/alert.tsx";

type ModalOptions = {
    title?: string;
    body?: ReactNode;
    isLogo?: boolean;
    onClick?: () => void;
};

type AlertOptions = {
    title?: string;
    message: string;
    children?: ReactNode;
    isCancel?: boolean;
    isConfirm?: boolean;
    onConfirm?: () => void;
};

type ContextType = {
    showModal: (option: ModalOptions) => void;
    showAlert: (option: AlertOptions) => void;
    modalClose: () => void;
    alertClose: () => void;
    allClear: () => void;
};

export const ModalContext = createContext<ContextType | undefined>(undefined);


export const ModalProvider = ({children}: { children: ReactNode }) => {
    const [modalOption, setModalOption] = useState<ModalOptions | null>(null);
    const [alertOption, setAlertOption] = useState<AlertOptions | null>(null);

    const showModal = (option: ModalOptions) => {
        document.getElementById('root')?.classList.add("base");

        setModalOption({...option});
    };

    const showAlert = (option: AlertOptions) => {
        setAlertOption({...option});
    };

    const modalClose = () => {
        modalOption?.onClick?.();
        setModalOption(null);
    };
    const alertClose = () => setAlertOption(null);

    const allClear = () => {
        setModalOption(null);
        setAlertOption(null);
    };
    return (
        <ModalContext.Provider
            value={{showModal, showAlert, modalClose, alertClose, allClear}}
        >
            {children}

            {modalOption && (
                <Modal
                    title={modalOption.title}
                    body={modalOption.body}
                    isLogo={modalOption.isLogo}
                    closeModal={modalClose}
                />
            )}
            {alertOption && (
                <>
                    <Alert
                        title={alertOption.title}
                        message={alertOption.message}
                        children={alertOption.children}
                        isCancel={alertOption.isCancel}
                        isConfirm={alertOption.isConfirm}
                        onConfirm={() => {
                            if (!alertOption?.onConfirm) {

                                alertClose();
                            }
                            alertOption.onConfirm?.();
                        }}
                        alertClose={alertClose}
                    />
                </>
            )}
        </ModalContext.Provider>
    );
};
