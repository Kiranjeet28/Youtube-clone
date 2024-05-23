import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ApiKey } from '../../Api';
import Desc from '../ReuseComps/watch/Desc';
import PlayVideo from '../ReuseComps/watch/PlayVideo';
import Home from '../Home/Home';
import { useAuth } from '../../PrivateRouter/AuthContext';
import Comments from '../ReuseComps/watch/Comments';

const addWatched = async (watchedData) => {
    try {
        const response = await fetch('http://localhost:5000/postWatched', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(watchedData)
        });
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error adding subscriber:', error);
        throw new Error('An error occurred while adding subscriber');
    }
};

function Watch() {
    const { id } = useParams(); 
    const [data, setData] = useState(null);
    const { DetailUser } = useAuth();

    
    const handleClickWatched = async () => {
        try {
            console.log("clicked");
            const userDetails = await DetailUser();
            const userEmail = userDetails.email;
            const subscriberData = { email: userEmail, Channel_Id: id };
            await addWatched(subscriberData);
        } catch (error) {
            console.log("error")
        }
    };


    useEffect(() => {
        let apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${id}&key=${ApiKey}`;
        
        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const videoData = {
                id: data.items[0].id,
                snippet: data.items[0].snippet,
                statistics: data.items[0].statistics,
                channelId: data.items[0].snippet.channelId,
                categoryId: data.items[0].snippet.categoryId,
            };
            handleClickWatched()
            setData(videoData);

        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }, [id]);



    return (
        <div className='absoult'>
            {data && (
                <div className='flex flex-row justify-center '>
                    <div className='mt-[4vh]'>
                        <PlayVideo videoId={id} />
                        <Desc
                            Title={data.snippet.title}
                            ProfilePhoto= {data.channelId}
                            ChannelName={data.snippet.channelTitle}
                            Like={data.statistics.likeCount}
                            views={data.statistics.viewCount}
                            timeAgo={data.snippet.publishedAt}
                            desc={data.snippet.description}
                            id = {id}
                        />
                        <Comments 
                            videoId={id}
                            countOfComment={data.statistics.commentCount}
                        />
                    </div>
                    <div className=''>
                        <Home width={"20"}
                          categorys = {data.categoryId}    />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Watch;
