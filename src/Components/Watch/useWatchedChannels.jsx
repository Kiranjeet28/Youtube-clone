import React, { useState, useEffect } from 'react';
import { useAuth } from '../../PrivateRouter/AuthContext';

export default function useWatchedChannels() {
    const [channelIds, setChannelIds] = useState([]);
    const { DetailUser } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDetails = await DetailUser();
                const userEmail = userDetails.email;
                const response = await fetch(`http://localhost:5000/GetWatchedChannels?email=${userEmail}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setChannelIds(data.channelIds);
                } else {
                    console.error('Failed to fetch data:', data.error);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return channelIds;
}
