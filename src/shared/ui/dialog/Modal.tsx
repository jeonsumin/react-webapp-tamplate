import {ReactNode} from "react";

type Props = {
    title?: string;
    isLogo?: boolean;
    body?: ReactNode;
    closeModal?: () => void;
};
export const Modal = (props: Props) => {
    const {title, isLogo, body, closeModal} = props;
    return (
        <div className='full_alert'>
            <div className={`modal_header ${isLogo ? 'logo' : ''}`}>
                <h1 className='title'>{title}</h1>
                <button onClick={closeModal}>
                    <i className={`icon icn_close wh`} aria-label='닫기'></i>
                </button>
            </div>
            <div className='modal_body'>{body}</div>
        </div>
    );
};
