import {NavItem} from "features/navItem/ui/NavItem";
import {navItems} from "../model/NavigationItem";

export const NavigationBar = () => (
    <nav
        className="fixed bottom-0 left-0 right-0 border-gray-200 bg-white z-10  mt-auto flex items-center">
        {navItems.map(({label, to}) => (
            <NavItem key={label} to={to} label={label}/>
        ))}
    </nav>
)