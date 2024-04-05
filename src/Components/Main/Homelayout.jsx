import React, { useEffect, useState } from 'react';
import { LoadingVideo } from '../LoadingPage/LoadingComponents';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import { ApiKey } from '../../Api';
import VideoDiv from '../ReuseComps/VideoDiv';

function formatViewCount(viewCount) {
  if (viewCount >= 1000000) {
    return (viewCount / 1000000).toFixed(1) + 'M';
  } else if (viewCount >= 1000) {
    return (viewCount / 1000).toFixed(1) + 'k';
  } else {
    return viewCount;
  }
}

function Homelayout({ category }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [videosLoading, setVideosLoading] = useState(false); // New state for video loading based on category change

  useEffect(() => {
    let apiUrl;
    if (category) {
      apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=50&videoCategoryId=${category}&key=${ApiKey}`;
    } else {
      apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=50&key=${ApiKey}`;
    }

    setCategoryLoading(true); // Start loading for category change
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const videoData = data.items.map(item => ({
          id: item.id,
          snippet: item.snippet,
          statistics: item.statistics,
          channelId: item.snippet.channelId
        }));
        setVideos(videoData);
        setLoading(false);
        setCategoryLoading(false); // Stop loading for category change
        setVideosLoading(false); // Stop loading for videos based on category change
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setLoading(false);
        setCategoryLoading(false); // Stop loading for category change
        setVideosLoading(false); // Stop loading for videos based on category change
      });
      
  }, [category]);

  // Rest of the code remains the same



  const fetchChannelLogoAsync = async (channelId) => {
    try {
      const channelResponse = await axios.get(`https://www.googleapis.com/youtube/v3/channels?id=${channelId}&part=snippet&key=${ApiKey}`);
      const profilePictureUrl = channelResponse.data.items[0].snippet.thumbnails.default.url;
      return profilePictureUrl;
    } catch (error) {
      console.error('Error fetching channel logo:', error);
      return null;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const updatedVideos = await Promise.all(
        videos.map(async (video) => {
          const profilePicture = await fetchChannelLogoAsync(video.channelId);
          return { ...video, profilePicture };
        })
      );
      
    };
    
    fetchData();
  }, [videos]);

  return (
    <div>
      {(loading || categoryLoading) ? (
        <LoadingVideo />
      ) : videos.length > 0 ? (
        <div>
          <ul className="flex flex-wrap  w-[90vw] md:justify-between justify-center ">
            {videos.map(video => (
              <li key={video.id}>
                <VideoDiv 
                  id = {video.id}
                  Thumbmail = {video.snippet.thumbnails.default.url}
                  ChannelPP = {video.profilePicture}
                  title = {video.snippet.title}
                  ChannelTitle = {video.snippet.channelTitle }
                  viewCount = {formatViewCount(video.statistics.viewCount)}
                  UploadTime = {formatDistanceToNow(new Date(video.snippet.publishedAt), { addSuffix: true })}
                 />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No videos found.</p>
      )}
    </div>
  );
}

export default Homelayout;

