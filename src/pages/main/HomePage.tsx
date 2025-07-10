import {useModal} from "app/provider/ModalProvider";
import {Link} from "react-router-dom";
import {routesBuilder} from "shared/config/routes";

export const HomePage = () => {
    const {showAlert} = useModal();

    const openMOdal = () => {
        showAlert({
            title:"성공",
            message: "성공적으로 모달을 띄웠습니다."
        })
    }
    
    return (
        <div className={"flex flex-col justify-center items-center"}>
            <h1>HOME</h1>
            <div>
                <Link to={{
                    pathname: routesBuilder.homeDetail("123"),

                }}>DETAIL</Link>
            </div>

            <button onClick={openMOdal}>
                Open Modal
            </button>
        </div>
    )
}