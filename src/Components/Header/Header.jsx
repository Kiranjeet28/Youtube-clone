import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMicrophone, faArrowUp, faBell, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import SugSearch from '../ReuseComps/HomeComp/SugSearch';
import { NavLink } from 'react-router-dom';
import List from '../List/List';
import { ApiKey } from '../../Api';
import Logo from '../Logo';

function Header() {
    const [barOn, setBarOn] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [query, setQuery] = useState('');
    const [isInput, setIsInput] = useState(false);

    const [micInput, setMicInput] = useState(false);
    const [isListening, setIsListening] = useState(false);

    const toggleBar = () => {
        setBarOn(!barOn);
    };

    const handleChange = (event) => {
        const userInput = event.target.value;
        setQuery(userInput);
        if (userInput.length === 0) {
            setIsInput(false);
            setSuggestions([]);
            return;
        }
        debouncedHandleChange(userInput);
    };

    const clearFilled = () => {
        setQuery('');
        setSuggestions([]);
    };

    const setInputAsSug = (Sug) => {
        setQuery(Sug);
        setSuggestions([]);
    };

    const setSugAsEmptyOnClick = () => {
        setSuggestions([]);
        setQuery('');
    };

    const OpenMic = () => {
        if (!micInput) {
            setMicInput(true);
            startListening();
        } else {
            setMicInput(false);
            stopListening();
        }
    };

    const startListening = () => {
        setIsListening(true);
        const recognition = window.webkitSpeechRecognition ? new window.webkitSpeechRecognition() : null;
        if (!recognition) {
            console.error('Speech recognition is not supported.');
            return;
        }
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = event => {
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    setQuery(prevTranscript => prevTranscript + transcript);
                } else {
                    interimTranscript += transcript;
                }
            }
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    const stopListening = () => {
        setIsListening(false);
        setMicInput(false);
    };

    const debounce = (func, delay) => {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), delay);
        };
    };

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
        }, 500),
        []
    );

    return (
        <div className="md:w-full fixed z-10 bg-white">
            <ol className="flex items-center md:justify-between pt-2">
                <div className="flex items-center">
                    <li className="md:ml-2 ml-1 md:mr-2 hover:rounded-full p-2 md:hover:bg-gray-100" onClick={toggleBar}>
                        <FontAwesomeIcon icon={faBars} className='text-black text-[2.3vh] md:text-[3vh]' />
                    </li>
                    <li>
                       <Logo/>
                    </li>
                </div>
                <div className="flex items-center flex-grow">
                    <li className="md:ml-3 ml-1 md:w-auto w-full">
                        <div className="flex border-2  border-gray-150 rounded-full">
                            <input
                                className="text-xsm md:text-md w-full px-4 py-2 rounded-l-full md:p-1 "
                                value={query}
                                onChange={handleChange}
                                type="text" placeholder='Search'
                            />
                            {query.length !== 0 && isInput ?
                                <div onClick={clearFilled} className='md:visible invisible text-gray-500 absolute top-[50%] transform -translate-y-1/2 right-3 md:right-4 cursor-pointer'>X</div> :
                                null}
                            <NavLink to={`/Search/${query}`} onClick={clearFilled} className='bg-gray-50 rounded-r-full md:p-1 border-l border-gray-150'>
                                <FontAwesomeIcon icon={faSearch} className='text-black text-[2.3vh] md:text-[3vh]' />
                            </NavLink>
                        </div>
                        {query.length > 0 ? (
                            <ul className='md:w-auto w-full absolute top-[7.6vh]   bg-white h-max rounded-md'>
                                {suggestions.map((item) => (
                                    <SugSearch
                                        key={item.id.videoId}
                                        id={item.id.videoId}
                                        titleVideo={item.snippet.title}
                                        functions={() => setInputAsSug(item.snippet.title)} />
                                ))}
                            </ul>
                        ) : null}

                    </li>
                    <li className="md:ml-3 ml-2">
                        <div className='bg-gray-200 rounded-full p-2 flex h-8 w-8 md:h-8 md:w-8 items-center justify-center'>
                            <FontAwesomeIcon icon={faMicrophone} className='text-black text-[2.3vh] md:text-[3vh]' onClick={OpenMic} />
                        </div>
                    </li>
                </div>
                <div className="flex items-center">
                <NavLink to={`/Lobby`}>
                    <li className="md:ml-3 ml-2 md:mr-2 mr-1">
                            <FontAwesomeIcon icon={faArrowUp} className='text-black text-[2.1vh] md:text-[3vh]' />
                        </li>
                </NavLink>
                   
                    <li className="md:ml-3 ml-2 md:mr-2 mr-1">
                        <FontAwesomeIcon icon={faBell} className='text-black text-[2.1vh] md:text-[3vh]' />
                    </li>
                    <NavLink to ="/MainRL">
                    <li className="md:ml-3 ml-2 ">
                        <FontAwesomeIcon icon={faUser} className='text-black text-[2.1vh] md:text-[3vh]' />
                    </li>
                    </NavLink>
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

            {/* for the Mic */}
            {
                micInput && (
                    <div className='p-[1vh] m-2 bg-blue-50 w-max absolute z-10 right-[13vh]'>
                        <p className='absolute right-1 w-auto text-xs font-bold' onClick={OpenMic} >X</p>
                        <button className='rounded-lg p-1 bg-red-400 text-white m-1' onClick={stopListening} disabled={!isListening}>
                            Stop
                        </button>
                    </div>
                )
            }
        </div>
    );
}

export default Header;
