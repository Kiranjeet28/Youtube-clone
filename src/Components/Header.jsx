import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMicrophone, faArrowUp, faBell, faUser, faYoutube, faSearch, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faYoutube as fabYoutube } from '@fortawesome/free-brands-svg-icons';

function Header() {
    return (
        <div>
            <ol>
                <li>
                    <FontAwesomeIcon icon={faBars} style={{color: "#050505"}} />
                </li>
                <li>
                    <div>
                        <FontAwesomeIcon icon={faYoutube} style={{color: "#e91c1c"}} />
                        YouTube <sup>IN</sup>
                    </div>
                </li>
                <li >
                    <div>
                        <input type="Search" />
                        <div>
                            <FontAwesomeIcon icon={faSearch} style={{color: "#656161"}} />
                        </div>
                    </div>
                </li>
                <li>
                    <FontAwesomeIcon icon={faMicrophone} style={{color: "#000000"}} />
                </li>
                <li>
                    <FontAwesomeIcon icon={faArrowUp} style={{color: "#0d0d0d"}} />
                </li>
                <li>
                    <FontAwesomeIcon icon={faBell} style={{color: "#0d0d0d"}} />
                </li>
                <li>
                    <FontAwesomeIcon icon={faUser} style={{color: "#0a0a0a"}} />
                </li>
            </ol>
        </div>
    );
}

export default Header;
