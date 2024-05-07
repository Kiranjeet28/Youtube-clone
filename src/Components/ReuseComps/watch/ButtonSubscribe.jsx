import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../PrivateRouter/AuthContext';

const checkSubscriber = async (email, channelId) => {
    try {
        const response = await fetch('http://localhost:5000/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, Channel_Id: channelId })
        });
        const data = await response.json();
        return data.exists; // true if subscriber exists, false if not
    } catch (error) {
        console.error('Error checking subscriber:', error);
        throw new Error('An error occurred while checking subscriber');
    }
};

const addSubscriber = async (subscriberData) => {
    try {
        const response = await fetch('http://localhost:5000/postSubscribers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(subscriberData)
        });
        const data = await response.json();
        return data; // Newly added subscriber data
    } catch (error) {
        console.error('Error adding subscriber:', error);
        throw new Error('An error occurred while adding subscriber');
    }
};

function ButtonSubscribe({ channel_Title, urlProfile }) {
    const [subscribe, setSubscribe] = useState("Subscribe");
    const { DetailUser } = useAuth();
    const [Id, setId] = useState('');
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);
    const [success, setSuccess] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        setId(channel_Title);
        setUrl(urlProfile);
    }, [channel_Title, urlProfile]);

    const handleClickSubscribe = async () => {
        try {
            console.log("clicked");
            const userDetails = await DetailUser();
            const userEmail = userDetails.email;
            const exists = await checkSubscriber(userEmail, Id);
            if (!exists) {
                const subscriberData = { email: userEmail, Channel_Id: Id, url: url };
                await addSubscriber(subscriberData);
                setSubscribe("Unsubscribe");
                setSuccess("Successfully subscribed");
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                }, 3000);
            } else {
                setError("You are already subscribed");
                setShowError(true);
                setTimeout(() => {
                    setShowError(false);
                }, 3000);
            }
        } catch (error) {
            setError(error.message || 'An error occurred');
            setShowError(true);
            console.error('Error subscribing:', error);
            setTimeout(() => {
                setShowError(false);
            }, 3000);
        }
    };

    return (
        <div>
            {showError && (
                <div className="bg-red-800 font-bold text-white p-2 fixed top-[13vh] left-0 right-0 text-center">
                    {error}
                </div>
            )}
            {showSuccess && (
                <div className="bg-green-600 font-bold text-white p-2 fixed top-[13vh] left-0 right-0 text-center">
                    {success}
                </div>
            )}
            <button onClick={handleClickSubscribe} className="rounded-full h-max text-white p-1 pl-3 pr-3 text-xs font-bold bg-black">
                {subscribe}
            </button>
        </div>
    );
}

export default ButtonSubscribe;
