import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';

function List({pop}) {
    return (
        <div  className={`w-[40vh] overflow-y-auto absolute -left-[40vh] ${pop} bg-white`}>
            <ol id='list' className=" m-4 overflow-y-auto h-max md:h-[89vh] mt-2 ">
                <li className=" border-b border-gray-200 pt-2 pb-2">
                   
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `flex rounded-md flex-row items-center justify-left hover:bg-gray-300 ${isActive ? "bg-gray-200" : ""} 
                                `
                            } >
                            <div className="ml-4">
                            <FontAwesomeIcon fontSize={'2.6vh'}  icon={faHome} style={{color: "#000"}} />
                            </div>
                            <span className="p-2 font-mono ml-3  text-[16px]">Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/Short"
                            className={({ isActive }) =>
                                `flex rounded-md flex-row items-center justify-left hover:bg-gray-300 ${isActive ? "bg-gray-200" : ""} 
                                `
                            } >
                            <div className="ml-4">
                            <FontAwesomeIcon fontSize={'2.6vh'}  icon={faHome} style={{color: "#000"}} />
                            </div>
                            <span className="p-2 font-mono ml-3  text-[16px]">Shorts</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/Subscriptions"
                            className={({ isActive }) =>
                                `flex rounded-md flex-row items-center justify-left hover:bg-gray-300 ${isActive ? "bg-gray-200" : ""} 
                                `
                            } >
                            <div className="ml-4">
                            <FontAwesomeIcon fontSize={'2.6vh'}  icon={faHome} style={{color: "#000"}} />
                            </div>
                            <span className="p-2 font-mono ml-3  text-[16px]">Subscriptions</span>
                        </NavLink>
                    </li>
           
                <li className=" border-b border-gray-200 pt-2 pb-2">
                    <ol>
                        <li className="flex flex-row ml-[10px] items-center">
                            <span className="p-2 font-mono  font-bold  text-[16px]">You</span>
                            <FontAwesomeIcon  className="  text-xsm h-3 text-gray-500"  icon={faAngleRight}  />
                            
                        </li>
                        <li>
                            <NavLink
                                to="/YourChannel"
                                className={({ isActive }) =>
                                    `flex rounded-md flex-row items-center justify-left hover:bg-gray-300 ${isActive ? "bg-gray-200" : ""} 
                                    `
                                } > 
                                <div className="ml-4">
                                <FontAwesomeIcon fontSize={'2.6vh'}  icon={faHome} style={{color: "#000"}} />
                                </div>
                                <span className="p-2 font-mono ml-3  text-[16px]">Your Channel</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/History"
                                className={({ isActive }) =>
                                    `flex rounded-md flex-row items-center justify-left hover:bg-gray-300 ${isActive ? "bg-gray-200" : ""} 
                                    `
                                } >
                                <div className="ml-4">
                                <FontAwesomeIcon fontSize={'2.6vh'}  icon={faHome} style={{color: "#000"}} />
                                </div>
                                <span className="p-2 font-mono ml-3  text-[16px]">History</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/YourVideo"
                                className={({ isActive }) =>
                                    `flex rounded-md flex-row items-center justify-left hover:bg-gray-300 ${isActive ? "bg-gray-200" : ""} 
                                    `
                                } >
                                <div className="ml-4">
                                <FontAwesomeIcon fontSize={'2.6vh'}  icon={faHome} style={{color: "#000"}} />
                                </div>
                                <span className="p-2 font-mono ml-3  text-[16px]">Your videos</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/WatchLater"
                                className={({ isActive }) =>
                                    `flex rounded-md flex-row items-center justify-left hover:bg-gray-300 ${isActive ? "bg-gray-200" : ""} 
                                    `
                                } >
                                <div className="ml-4">
                                <FontAwesomeIcon fontSize={'2.6vh'}  icon={faHome} style={{color: "#000"}} />
                                </div>
                                <span className="p-2 font-mono ml-3  text-[16px]">Watch Later</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/ShowMore"
                                className={({ isActive }) =>
                                    `flex rounded-md flex-row items-center justify-left hover:bg-gray-300 ${isActive ? "bg-gray-200" : ""} 
                                    `
                                } >
                                <div className="ml-4">
                                <FontAwesomeIcon className="  text-xsm h-3 text-gray-500"  icon={faAngleDown}   />
                                </div>
                                <span className="p-2 font-mono ml-3  text-[16px]">Show more</span>
                            </NavLink>
                        </li>
                    </ol>
                </li>
                <li className=" border-b border-gray-200 pt-2 pb-2">
                     <li className="flex flex-row ml-[10px] items-center">
                        <span className="p-2 font-mono  font-bold  text-[16px]">Subscriptions</span>
                    </li>
                </li>
                <li className=" border-b border-gray-200 pt-2 pb-2">
                    <ol>
                     <li className="flex flex-row ml-[10px] items-center">
                        <span className="p-2 font-mono  font-bold  text-[16px]">Explore</span>
                    </li>
                        <li>
                            <NavLink
                                to="/Trending"
                                className={({ isActive }) =>
                                    `flex rounded-md flex-row items-center justify-left hover:bg-gray-300 ${isActive ? "bg-gray-200" : ""} 
                                    `
                                } > 
                                <div className="ml-4">
                                <FontAwesomeIcon fontSize={'2.6vh'}  icon={faHome} style={{color: "#000"}} />
                                </div>
                                <span className="p-2 font-mono ml-3  text-[16px]">Trending</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/Shopping"
                                className={({ isActive }) =>
                                    `flex rounded-md flex-row items-center justify-left hover:bg-gray-300 ${isActive ? "bg-gray-200" : ""} 
                                    `
                                } > 
                                <div className="ml-4">
                                <FontAwesomeIcon fontSize={'2.6vh'}  icon={faHome} style={{color: "#000"}} />
                                </div>
                                <span className="p-2 font-mono ml-3  text-[16px]">Shopping</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/Music"
                                className={({ isActive }) =>
                                    `flex rounded-md flex-row items-center justify-left hover:bg-gray-300 ${isActive ? "bg-gray-200" : ""} 
                                    `
                                } > 
                                <div className="ml-4">
                                <FontAwesomeIcon fontSize={'2.6vh'}  icon={faHome} style={{color: "#000"}} />
                                </div>
                                <span className="p-2 font-mono ml-3  text-[16px]">Music</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/Films"
                                className={({ isActive }) =>
                                    `flex rounded-md flex-row items-center justify-left hover:bg-gray-300 ${isActive ? "bg-gray-200" : ""} 
                                    `
                                } > 
                                <div className="ml-4">
                                <FontAwesomeIcon fontSize={'2.6vh'}  icon={faHome} style={{color: "#000"}} />
                                </div>
                                <span className="p-2 font-mono ml-3  text-[16px]">Films</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/Live"
                                className={({ isActive }) =>
                                    `flex rounded-md flex-row items-center justify-left hover:bg-gray-300 ${isActive ? "bg-gray-200" : ""} 
                                    `
                                } > 
                                <div className="ml-4">
                                <FontAwesomeIcon fontSize={'2.6vh'}  icon={faHome} style={{color: "#000"}} />
                                </div>
                                <span className="p-2 font-mono ml-3  text-[16px]">Live</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/Gaming"
                                className={({ isActive }) =>
                                    `flex rounded-md flex-row items-center justify-left hover:bg-gray-300 ${isActive ? "bg-gray-200" : ""} 
                                    `
                                } > 
                                <div className="ml-4">
                                <FontAwesomeIcon fontSize={'2.6vh'}  icon={faHome} style={{color: "#000"}} />
                                </div>
                                <span className="p-2 font-mono ml-3  text-[16px]">Gaming</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/News"
                                className={({ isActive }) =>
                                    `flex rounded-md flex-row items-center justify-left hover:bg-gray-300 ${isActive ? "bg-gray-200" : ""} 
                                    `
                                } > 
                                <div className="ml-4">
                                <FontAwesomeIcon fontSize={'2.6vh'}  icon={faHome} style={{color: "#000"}} />
                                </div>
                                <span className="p-2 font-mono ml-3  text-[16px]">News</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/Sport"
                                className={({ isActive }) =>
                                    `flex rounded-md flex-row items-center justify-left hover:bg-gray-300 ${isActive ? "bg-gray-200" : ""} 
                                    `
                                } > 
                                <div className="ml-4">
                                <FontAwesomeIcon fontSize={'2.6vh'}  icon={faHome} style={{color: "#000"}} />
                                </div>
                                <span className="p-2 font-mono ml-3  text-[16px]">Sport</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/Courses"
                                className={({ isActive }) =>
                                    `flex rounded-md flex-row items-center justify-left hover:bg-gray-300 ${isActive ? "bg-gray-200" : ""} 
                                    `
                                } > 
                                <div className="ml-4">
                                <FontAwesomeIcon fontSize={'2.6vh'}  icon={faHome} style={{color: "#000"}} />
                                </div>
                                <span className="p-2 font-mono ml-3  text-[16px]">Courses</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/Fashion & beauty"
                                className={({ isActive }) =>
                                    `flex rounded-md flex-row items-center justify-left hover:bg-gray-300 ${isActive ? "bg-gray-200" : ""} 
                                    `
                                } > 
                                <div className="ml-4">
                                <FontAwesomeIcon fontSize={'2.6vh'}  icon={faHome} style={{color: "#000"}} />
                                </div>
                                <span className="p-2 font-mono ml-3  text-[16px]">Fashion & beauty</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/Podcasts"
                                className={({ isActive }) =>
                                    `flex rounded-md flex-row items-center justify-left hover:bg-gray-300 ${isActive ? "bg-gray-200" : ""} 
                                    `
                                } > 
                                <div className="ml-4">
                                <FontAwesomeIcon fontSize={'2.6vh'}  icon={faHome} style={{color: "#000"}} />
                                </div>
                                <span className="p-2 font-mono ml-3  text-[16px]">Podcasts</span>
                            </NavLink>
                        </li>
                    </ol>                        
                </li>
                <li className=" border-b border-gray-200 pt-2 pb-2">
                    <ol>
                    <li className="flex flex-row ml-[10px] items-center">
                            <span className="p-2 font-mono  font-bold  text-[16px]">More From Youtube</span>
                         
                        </li>
                    <li className=" ">
                        
                        <NavLink
                            to="/YouTubePremium"
                            className={({ isActive }) =>
                                `flex rounded-md flex-row items-center justify-left hover:bg-gray-300 ${isActive ? "bg-gray-200" : ""} 
                                `
                            } >
                            <div className="ml-4">
                            <FontAwesomeIcon fontSize={'2.6vh'}  icon={faHome} style={{color: "#000"}} />
                            </div>
                            <span className="p-2 font-mono ml-3  text-[16px]">YouTube Premium</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/YouTubeStudio"
                            className={({ isActive }) =>
                                `flex rounded-md flex-row items-center justify-left hover:bg-gray-300 ${isActive ? "bg-gray-200" : ""} 
                                `
                            } >
                            <div className="ml-4">
                            <FontAwesomeIcon fontSize={'2.6vh'}  icon={faHome} style={{color: "#000"}} />
                            </div>
                            <span className="p-2 font-mono ml-3  text-[16px]">YouTube Studio</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/YouTubeMusic"
                            className={({ isActive }) =>
                                `flex rounded-md flex-row items-center justify-left hover:bg-gray-300 ${isActive ? "bg-gray-200" : ""} 
                                `
                            } >
                            <div className="ml-4">
                            <FontAwesomeIcon fontSize={'2.6vh'}  icon={faHome} style={{color: "#000"}} />
                            </div>
                            <span className="p-2 font-mono ml-3  text-[16px]">YouTube Music</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/YouTubeKids"
                            className={({ isActive }) =>
                                `flex rounded-md flex-row items-center justify-left hover:bg-gray-300 ${isActive ? "bg-gray-200" : ""} 
                                `
                            } >
                            <div className="ml-4">
                            <FontAwesomeIcon fontSize={'2.6vh'}  icon={faHome} style={{color: "#000"}} />
                            </div>
                            <span className="p-2 font-mono ml-3  text-[16px]">YouTube Kids</span>
                        </NavLink>
                    </li>
                    </ol> 
                </li>
                
                <li className=" border-b border-gray-200 pt-2 pb-2">
                        <NavLink
                            to="/Setting"
                            className={({ isActive }) =>
                                `flex rounded-md flex-row items-center justify-left hover:bg-gray-300 ${isActive ? "bg-gray-200" : ""} 
                                `
                            } >
                            <div className="ml-4">
                            <FontAwesomeIcon fontSize={'2.6vh'}  icon={faHome} style={{color: "#000"}} />
                            </div>
                            <span className="p-2 font-mono ml-3  text-[16px]">Settings</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/ReportHistory"
                            className={({ isActive }) =>
                                `flex rounded-md flex-row items-center justify-left hover:bg-gray-300 ${isActive ? "bg-gray-200" : ""} 
                                `
                            } >
                            <div className="ml-4">
                            <FontAwesomeIcon fontSize={'2.6vh'}  icon={faHome} style={{color: "#000"}} />
                            </div>
                            <span className="p-2 font-mono ml-3  text-[16px]">Report History</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/Subscriptions"
                            className={({ isActive }) =>
                                `flex rounded-md flex-row items-center justify-left hover:bg-gray-300 ${isActive ? "bg-gray-200" : ""} 
                                `
                            } >
                            <div className="ml-4">
                            <FontAwesomeIcon fontSize={'2.6vh'}  icon={faHome} style={{color: "#000"}} />
                            </div>
                            <span className="p-2 font-mono ml-3  text-[16px]">Help</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/SendFeedback"
                            className={({ isActive }) =>
                                `flex rounded-md flex-row items-center justify-left hover:bg-gray-300 ${isActive ? "bg-gray-200" : ""} 
                                `
                            } >
                            <div className="ml-4">
                            <FontAwesomeIcon fontSize={'2.6vh'}  icon={faHome} style={{color: "#000"}} />
                            </div>
                            <span className="p-2 font-mono ml-3  text-[16px]">Send feedback</span>
                        </NavLink>
                    </li>
            
                <li>
                    <p className="text-sm text-black">
                        Kiranjeet Youtube Clone
                        <br/>
                        <span className="text-gray-900 font-bold">kiranjeetkour144@gmail.com</span>
                        
                    </p>
                </li>
            </ol>
        </div>
    )
}
export default List;