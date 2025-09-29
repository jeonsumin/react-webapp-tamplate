import {useLayout, useModal} from "shared/hook";

export const Dashboard = () => {

    const modal = useModal();

    useLayout({})

    const openModal = () => {
        modal.showAlert({
            title: "모달",
            message: "메시지"
        })
    }

    return (
        <>
            <h1>Dashboard</h1>
            <button onClick={openModal}>open Modal</button>
        </>
    )
}