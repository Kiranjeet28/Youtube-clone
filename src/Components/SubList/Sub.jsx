import React, { useState, useEffect } from 'react';
import { useAuth } from '../../PrivateRouter/AuthContext';

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
        <div className='top-20 left-16 absolute'>
            <h1>Subscribers</h1>
            <ul>
                {channelIds.map((channelId, index) => (
                    <li key={index}>
                        <p>Channel ID: {channelId}</p>
                        {urls[index] && <img src={urls[index]} alt="" />} {/* Added condition to render image */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sub;
