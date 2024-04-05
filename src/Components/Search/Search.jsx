import React, { useEffect, useState } from 'react';
import { LoadingVideo } from '../LoadingPage/LoadingComponents'; 
import { ApiKey } from '../../Api';
import axios from 'axios';
import VideoDiv from '../ReuseComps/VideoDiv';
import { NavLink, useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';




function Search() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { urlQuery } = useParams(); // Get the urlQuery parameter from the URL

    useEffect(() => {
        if (urlQuery) {
            const fetchVideos = async () => {
                try {
                    const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${ApiKey}&part=snippet&q=${urlQuery}`;
                    const response = await fetch(apiUrl);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    const videoData = data.items.map(item => ({
                        id: item.id,
                        snippet: item.snippet,
                        statistics: item.statistics
                    }));
                    setVideos(videoData);
                    setLoading(false);
                } catch (error) {
                    console.error('There was a problem with the fetch operation:', error);
                    setLoading(false);
                }
            };
            fetchVideos();
        }
    }, [urlQuery]);

    return (
        <NavLink to="/Search">
            <div>
                {loading ? (
                    <LoadingVideo />
                ) : videos.length > 0 ? (
                    <div>
                        <ul className="flex flex-wrap w-[90vw] md:justify-between justify-center">
                            {videos.map(video => (
                                <li key={video.id}>
                                    <VideoDiv
                                        id={video.id}
                                        Thumbmail={video.snippet.thumbnails.default.url}
                                        title={video.snippet.title}
                                        ChannelTitle={video.snippet.channelTitle}
                                        UploadTime={formatDistanceToNow(new Date(video.snippet.publishedAt), { addSuffix: true })}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No videos found.</p>
                )}
            </div>
        </NavLink>
    );
}

export default Search;
