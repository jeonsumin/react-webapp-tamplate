import {Link} from "react-router-dom";
import {routesBuilder} from "shared/config/routes";

export const HomePage = () => {
    return (
        <div className={"flex flex-col justify-center items-center"}>
            <h1>HOME</h1>
            <div>
                <Link to={{
                    pathname: routesBuilder.homeDetail("123"),

                }} >DETAIL</Link>
            </div>
        </div>
    )
}