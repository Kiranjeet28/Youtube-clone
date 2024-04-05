import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMicrophone, faArrowUp, faBell, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import List from '../List/List';
import { ApiKey } from '../../Api';
import axios from 'axios';
import SugSearch from '../ReuseComps/SugSearch';
import { NavLink } from 'react-router-dom';

function Header() {
    const [barOn, setBarOn] = useState(false);
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isInput, setIsInput] = useState(false);

    // To Clear the field of Search by clicking the X
    const clearFilled = () => {
        setQuery('');
        setSuggestions([]); // Clear suggestions when input is empty
    };

    // SetInputAsSug
    const setInputAsSug = (Sug) => {
        console.log("Suggestion:", Sug);
        setQuery(Sug); // Setting category ID as state
    };

    // Debounce function
    const debounce = (func, delay) => {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), delay);
        };
    };

    // Debounced version of handleChange
    const debouncedHandleChange = useCallback(
        debounce(async (userInput) => {
            setIsInput(true);
            try {
                const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                    params: {
                        key: ApiKey,
                        part: 'snippet',
                        q: userInput,
                        maxResults: 5
                    },
                });
                setSuggestions(response.data.items);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        }, 500), // Adjust delay as needed
        []
    );
    const handleChange = (event) => {
        const userInput = event.target.value;
        setQuery(userInput);
        if (userInput.length === 0) {
            setIsInput(false);
            setSuggestions([]); // Clear suggestions when input is empty
            return;
        }
        debouncedHandleChange(userInput);
    };

    const setSugAsEmptyonClik = () => {
        setSuggestions([]);
        query('')
    };

    const toggleBar = () => {
        setBarOn(!barOn);
    };

    return (
        <div className="md:w-full fixed z-10 bg-white">
            <ol className="flex items-center md:justify-between pt-2">
                <div className="flex items-center">
                    <li className="md:ml-2 ml-1 md:mr-2 hover:rounded-full p-2 md:hover:bg-gray-100" onClick={toggleBar}>
                        <FontAwesomeIcon icon={faBars} className='text-black text-[2.3vh] md:text-[3vh]' />
                    </li>
                    <li>
                        <div className="flex items-center justify-center">
                            <FontAwesomeIcon className='text-red-500 text-[2.5vh] md:text-[3vh]' icon={faYoutube} />
                            <div className='flex items-center text-[2vh] md:text-[3vh] font-sans font-bold'> YouTube <sup className='md:visible invisible font-mono text-gray-500 md:text-[2vh] text-[1vh]'>IN</sup></div>
                        </div>
                    </li>
                </div>
                <div className="flex items-center">
                    <li className="md:ml-3 ml-1">
                        <div className="flex border-2  border-gray-150 rounded-full">
                            <input
                                className="text-xsm md:text-md w-30vw md:w-[50vw] rounded-l-full md:p-1 "
                                value={query}
                                onChange={handleChange}
                                type="text" placeholder='Search'
                            />
                            {query.length !== 0 && isInput ?
                                <div onClick={clearFilled} className='md:visible invisible text-gray-500 absolute top-[2.5vh] md:left-[70vw] left-[50vw] flex justify-center items-center'>X</div> :
                                null}
                            {/* For the particular Click  */}
                            <NavLink to={`/Search/${query}`} className='bg-gray-50 rounded-r-full w-12 md:w-16 flex items-center justify-center p-1 border-l border-gray-150' onClick={setSugAsEmptyonClik}>
                                <FontAwesomeIcon icon={faSearch} className='text-black text-[2.3vh] md:text-[3vh]' />
                            </NavLink>
                        </div>
                        {query.length > 0 ?(
                             <ul className='w-30vw md:w-[55vw] absolute top-[7.6vh]   bg-white h-max rounded-md'>
                             {suggestions.map((item) => (
                                 <SugSearch
                                     key={item.id.videoId}
                                     id={item.id.videoId}
                                     titleVideo={item.snippet.title}
                                     functions={() => setInputAsSug(item.snippet.title)} />
                             ))}
                         </ul>
                        ):null}
                       
                    </li>
                    <li className="md:ml-3 ml-2" >
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
