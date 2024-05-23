import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';
export default function Components({ to, icon, Name }) {
    return (
        <li>
        <div className="pt-5">
            <NavLink
                to = {to}
                className={({ isActive }) =>
                    `flex rounded-md flex-row items-center justify-left hover:bg-gray-300 ${isActive ? "bg-gray-200" : ""} 
                                `
                } >
                <div className="ml-4">
                    <FontAwesomeIcon fontSize={'2.6vh'} icon={icon} style={{ color: "#000" }} />
                </div>
                <span className="p-2 font-mono ml-3  text-[16px]">{Name}</span>
            </NavLink>
        </div>
        </li>
    )
}