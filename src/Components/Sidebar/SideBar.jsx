import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser,faHeart } from '@fortawesome/free-solid-svg-icons';

export default function SideBar() {
    return (
        <div className="w-20 h-[100vh] p-1 left-0 top-[8vh] sticky bg-white mt-10  ">
            <ol className='absolute z-10'>
                <li className=''>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center pt-[15px] pb-[15px] hover:rounded-md hover:bg-gray-200 rounded-md ${isActive ? "bg-gray-300" : ""} 
                            `
                        } >
                        <div className="">
                            <FontAwesomeIcon className='text-black text-[2.1vh] md:text-[3vh]' icon={faHome}  />
                        </div>
                        <span className=" p-[1px] font-mono text-[10px]">Home</span>
                    </NavLink>
                </li>
                <li className=''>
                    <NavLink
                        to="/Favourite"
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center pt-[15px] pb-[15px]  hover:rounded-md hover:bg-gray-200  rounded-md ${isActive ? "bg-gray-300" : ""} 
                            `
                        } >
                        <div className="">
                        <FontAwesomeIcon fontSize={'2.6vh'} className='md:w-[3vh] w-[2vh]' icon={faHeart} style={{ color: "red" }} />
                        </div>
                        <span className=" p-[1px] font-mono text-[10px]">Shorts</span>
                    </NavLink>
                </li>
                <li className=''>
                    <NavLink
                        to="/Subscriptions"
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center pt-[15px] pb-[15px]  hover:rounded-md hover:bg-gray-200  rounded-md  ${isActive ? "bg-gray-300" : ""} 
                            `
                        } >
                        <div className="">
                            <img src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3211778/youtube-subscription-icon-md.png" alt="" className='md:w-[3vh] w-[2vh]' />
                        </div>
                        <span className=" p-[1px] font-mono text-[10px]">Subscriptions</span>
                    </NavLink>
                </li>
                <li className=''>
                    <NavLink
                        to="/MainRL"
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center pt-[15px] pb-[15px]  hover:rounded-md hover:bg-gray-200  rounded-md ${isActive ? "bg-gray-300" : ""} 
                            `
                        } >
                        <div className="">
                            <FontAwesomeIcon className='text-black text-[2.1vh] md:text-[3vh]' icon={faUser} />
                        </div>
                        <span className=" p-[1px] font-mono text-[10px]">You</span>
                    </NavLink>
                </li>
            </ol>
        </div>
    )
}
