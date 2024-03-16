import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMicrophone, faArrowUp, faBell, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import List from './List';

function Header() {
    const[barOn,useBarOn] = useState(true);
    const  BarClick=(e)=>{
        if(barOn){
            useBarOn(false);
        }else{
            useBarOn(true);
        }
    }

    return (
        <div  class="md:w-[100vw] w-max  h-[7vh]">
          
            <ol class="flex items-center justify-between pt-2 ">
                <div class="flex items-center">
                    <li  class="ml-[3vh] mr-[3vh]" onClick={BarClick}>
                        <FontAwesomeIcon fontSize={'3vh'} icon={faBars} style={{color: "#050505"}} />
                    </li>
                    <li class="">
                        <div class="flex items-center justify-center">
                            <FontAwesomeIcon fontSize={'4vh'}  icon={faYoutube} style={{color: "#e91c1c"}} />
                            <div class='  flex items-center text-[3vh] font-sans font-bold'> YouTube <sup class=' md:visible invisible font-mono text-gray-500 text-[2vh]'>IN</sup></div>
                        </div>
                    </li>
                </div>
               <div class="flex items-center" >
                    <li  class="ml-[3vh]">
                            <div class="flex border-2  border-gray-150 rounded-full ">
                                <input class="border-hidden w-[40vw] rounded-l-full p-[6px] "type="Search " placeholder='Search' />
                                <div class='bg-gray-50  rounded-e-full w-16 flex items-center justify-center p-[6px] border-l border-gray-150'>
                                    <FontAwesomeIcon icon={faSearch} style={{color: "#656161"}} />
                                </div>
                            </div>
                        </li>
                        <li class="ml-[3vh]">
                            <div class='bg-gray-200 rounded-full p-2 flex h-10 w-10  items-center justify-center'>

                            <FontAwesomeIcon icon={faMicrophone} fontSize={'2.5vh'} style={{color: "#000000"}} />

                            </div>
                        </li>
               </div>
                <div class="flex items-center">
                    <li class="ml-[3vh]  mr-[2vh]   ">
                        <FontAwesomeIcon icon={faArrowUp} fontSize={'2.5vh'} style={{color: "#0d0d0d"}} />
                    </li>
                    <li class="ml-[3vh]  mr-[2vh] ">
                        <FontAwesomeIcon icon={faBell} fontSize={'2.5vh'} style={{color: "#0d0d0d"}} />
                    </li>
                    <li class="ml-[3vh]  mr-[4vh] ">
                        <FontAwesomeIcon icon={faUser} fontSize={'2.5vh'} style={{color: "#0a0a0a"}} />
                    </li>
                </div>
                
            </ol>
            {
                barOn?<div>
                    <List/>
                </div>:
                <div>
                   
                </div>
            }
        </div>
    );
}

export default Header;
