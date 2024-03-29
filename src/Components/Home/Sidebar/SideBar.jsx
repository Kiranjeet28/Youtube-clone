import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faUser } from '@fortawesome/free-solid-svg-icons';
export default function SideBar(){
    return(
        <div className="w-20  h-[100vh] p-1 absolute top-[8vh]">
            <ol>
                <li className=''>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center pt-[15px] pb-[15px] hover:rounded-md hover:bg-gray-200 ${isActive ? "bg-gray-300" : ""} 
                        `
                    } >
                    <div class="">
                    <FontAwesomeIcon fontSize={'2.6vh'}  icon={faHome} style={{color: "black"}} />
                    </div>
                    <span class=" p-[1px] font-mono   text-[10px]">Home</span>
                </NavLink>
                </li>
                 <li className=''>
                <NavLink
                    to="/Short"
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center pt-[15px] pb-[15px]  hover:rounded-md hover:bg-gray-200  ${isActive ? "bg-gray-300" : ""} 
                        `
                    } >
                    <div class="">
                    <img src="https://freelogopng.com/images/all_img/1685029929youtube-shorts-logo-black.png" alt="" className='w-[3vh]' />
                    </div>
                    <span class=" p-[1px] font-mono   text-[10px]">Shorts</span>
                </NavLink>
                </li>
                <li className=''>
                <NavLink
                    to="/Subscriptions"
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center pt-[15px] pb-[15px]  hover:rounded-md hover:bg-gray-200  ${isActive ? "bg-gray-300" : ""} 
                        `
                    } >
                    <div class="">
                    <img src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3211778/youtube-subscription-icon-md.png" alt="" className='w-[3vh]'/>
                    </div>
                    <span class=" p-[1px] font-mono   text-[10px]">Subscriptions</span>
                </NavLink>
                </li>
                <li className=''>
                <NavLink
                    to="/YourChannel"
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center pt-[15px] pb-[15px]  hover:rounded-md hover:bg-gray-200  ${isActive ? "bg-gray-300" : ""} 
                        `
                    } >
                    <div class="">
                    <FontAwesomeIcon fontSize={'2.6vh'}  icon={faUser} style={{color: "black"}} />
                    </div>
                    <span class=" p-[1px] font-mono   text-[10px]">You</span>
                </NavLink>
                </li>
            </ol>
        </div>
    )
}