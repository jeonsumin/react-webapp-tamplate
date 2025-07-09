import {Link, NavLink} from "react-router-dom";

type Props = {
    to: string;
    label: string;
}
export const NavItem = (props: Props) => {
    const {to, label} = props
    return (
        <NavLink
            to={to}
            key={label}
            className={({isActive}) =>
                `w-full  items-center text-[16px] ${isActive ? 'font-bold border-t-2' : 'font-normal'}`
            }
        >
            <div className="h-14 flex justify-around items-center">
                <span>{label}</span>
            </div>
        </NavLink>
    )
}