import React, { useState, useEffect } from 'react';
import { useAuth } from '../../PrivateRouter/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
function Sub() {
    const [channelIds, setChannelIds] = useState([]);
    const [urls, setUrls] = useState([]); // Changed variable name to urls
    const { DetailUser } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDetails = await DetailUser();
                const email = userDetails.email;
                const response = await fetch(`http://localhost:5000/GetSubscribers?email=${email}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                console.log(response)
                if (response.ok) {
                    console.log(data)
                    setChannelIds(data.channelIds);
                    setUrls(data.urls);
                } else {
                    console.error('Failed to fetch data:', data.error);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='absolute bg-red-400 w-[93vw] mt-[10vh] ml-[6vw] flex flex-col justify-center items-center'>
    <p className='text-bold text-5xl font-serif text-white mb-4'>Here are your Subscriptions</p>
    <ul className="overflow-y-auto">
        {channelIds.map((channelId, index) => (
            <li key={index} className="flex items-center justify-between w-full border-b border-white p-4">
                {urls[index] ? (
                    <img src={urls[index]} alt="" className="h-[7vh] w-auto rounded-full mr-4" />
                ) : (
                    <div className="h-[7vh] w-[7vh] bg-gray-300 flex items-center justify-center rounded-full mr-4">
                        <FontAwesomeIcon className="text-black text-[2.1vh] md:text-[3vh]" icon={faUser} />
                    </div>
                )}
                <p className="font-bold text-white">{channelId}</p>
            </li>
        ))}
    </ul>
</div>

    );
}

export default Sub;
