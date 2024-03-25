import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMicrophone, faArrowUp, faBell, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import List from '../List/List';

function Header() {
    const [barOn, setBarOn] = useState(false);

    const toggleBar = () => {
        setBarOn(!barOn);
    };

    return (
        <div className="md:w-full sticky z-10 bg-white">
            <ol className="flex items-center md:justify-between pt-2">
                <div className="flex items-center">
                    <li className="md:ml-2 ml-1 md:mr-2 hover:rounded-full p-2 hover:bg-gray-300" onClick={toggleBar}>
                        <FontAwesomeIcon  icon={faBars} className='text-black text-[2.3vh] md:text-[3vh]' />
                    </li>
                    <li >
                        <div className="flex items-center justify-center">
                            <FontAwesomeIcon className='text-red-500 text-[2.5vh] md:text-[3vh]' icon={faYoutube} />
                            <div className='flex items-center text-[2vh] md:text-[3vh] font-sans font-bold'> YouTube <sup className='md:visible invisible font-mono text-gray-500 md:text-[2vh] text-[1vh]'>IN</sup></div>
                        </div>
                    </li>
                </div>
                <div className="flex items-center">
                    <li className="md:ml-3 ml-1">
                        <div className="flex border-2  border-gray-150 rounded-full">
                            <input className="text-xsm md:text-md w-30vw md:w-[50vw] rounded-l-full md:p-1" type="Search" placeholder='Search' />
                            <div className='bg-gray-50 rounded-r-full w-12 md:w-16 flex items-center justify-center p-1 border-l border-gray-150'>
                                <FontAwesomeIcon icon={faSearch} className='text-black text-[2.3vh] md:text-[3vh]' />
                            </div>
                        </div>
                    </li>
                    <li className="md:ml-3 ml-2">
                        <div className='bg-gray-200 rounded-full p-2 flex h-8 w-8 md:h-8 md:w-8 items-center justify-center'>
                            <FontAwesomeIcon icon={faMicrophone} className='text-black text-[2.3vh] md:text-[3vh]' />
                        </div>
                    </li>
                </div>
                <div className="flex items-center">
                    <li className="md:ml-3 ml-2 md:mr-2 mr-1 hidden md:block">
                        <FontAwesomeIcon icon={faArrowUp} className='text-black text-[2.1vh] md:text-[3vh]' />
                    </li>
                    <li className="md:ml-3 ml-2 md:mr-2 mr-1">
                        <FontAwesomeIcon icon={faBell} className='text-black text-[2.1vh] md:text-[3vh]' />
                    </li>
                    <li className="md:ml-3 ml-2 ">
                        <FontAwesomeIcon icon={faUser} className='text-black text-[2.1vh] md:text-[3vh]' />
                    </li>
                </div>
            </ol>
            {barOn ?
                <div className="flex">
                    <List pop={'transform-gpu translate-x-[40vh] z-10 ease-out'} />
                </div> :
                <div>
                    <List />
                </div>
            }
        </div>
    );
}

export default Header;
