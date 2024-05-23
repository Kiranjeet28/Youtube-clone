import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faSubscript,faVideo, faHeart, faUser, faHistory, faNeuter, faRegistered } from '@fortawesome/free-solid-svg-icons';
import Components from './Componets';

function List({pop}) {
    return (
        <div  className={`w-[40vh] overflow-y-auto absolute -left-[40vh] ${pop} bg-white`}>
            <ol id='list' className=" m-4 overflow-y-auto h-max md:h-[89vh] mt-2 ">    
                   < Components
                   to= "/"
                   icon = {faHome}
                   Name="Home"/>
                    < Components
                   to= "/Favourite"
                   icon = {faHeart}
                   Name="Favourite"/>
                    < Components
                   to= "/Subscriptions"
                   icon = {faSubscript}
                   Name="Subscriptions"/>
                      < Components
                   to= "/MainRL"
                   icon = {faUser}
                   Name="You"/>
                      < Components
                   to= "/Lobby"
                   icon = {faVideo}
                   Name="Video Call"/>
                      < Components
                   to= "/History"
                   icon = {faHistory}
                   Name="Your History"/>
                    < Components
                   to= "/register"
                   icon = {faRegistered}
                   Name="Registor"/>
                    < Components
                   to= "/Subscriptions"
                   icon = {faSubscript}
                   Name="Subscriptions"/>
                      < Components
                   to= "/MainRL"
                   icon = {faUser}
                   Name="You"/>
                      < Components
                   to= "/Lobby"
                   icon = {faVideo}
                   Name="Video Call"/>
                      < Components
                   to= "/History"
                   icon = {faHistory}
                   Name="Your History"/>
              </ol>     
 
        </div>
    )
}
export default List;