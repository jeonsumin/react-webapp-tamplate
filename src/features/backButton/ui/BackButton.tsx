import {ArrowLeft} from "lucide-react";
import {useNavigate} from "react-router-dom";

export const BackButton = () => {
    const navigate = useNavigate();
    const onClick = () => {
        navigate(-1)
    }
    return <button
        onClick={onClick}
        className={"absolute left-5"}
    >
        <ArrowLeft size={20}/>
    </button>

}