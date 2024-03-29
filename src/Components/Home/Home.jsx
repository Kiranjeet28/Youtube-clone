import React, { useCallback, useEffect, useState } from 'react';
import { LoadingCato, LoadingVideo } from '../LoadingPage/LoadingComponents'; // Import LoadingCato and LoadingVideo
import axios from 'axios';
import { ApiKey } from '../../Api';
import CatograyDiv from '../ReuseComps/CatograyDiv';
import VideoDiv from '../ReuseComps/VideoDiv';
import { formatDistanceToNow } from 'date-fns';

function formatViewCount(viewCount) {
  if (viewCount >= 1000000) {
    return (viewCount / 1000000).toFixed(1) + 'M';
  } else if (viewCount >= 1000) {
    return (viewCount / 1000).toFixed(1) + 'k';
  } else {
    return viewCount;
  }
}

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null); // Corrected typo in state variable name
  const [categories, setCategories] = useState([]); // Initialize categories state

  useEffect(() => {
    let apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=50&key=${ApiKey}`;
    if (category !== null) {
      apiUrl += `&videoCategoryId=${category}`;
    }

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
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setLoading(false);
      });
  }, [category]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=IN&key=${ApiKey}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const data = await response.json();
        setCategories(data.items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const clickHandler = useCallback((category) => {
    setCategory(category);
  }, []);

  return (
    <div className='flex flex-col'>
      <div>
        {loading ? (
          <LoadingCato/>
        ) : (
          <div className='w-[90vw] overflow-hidden scrollbar-hide'>
            <ul id="cato" className='flex flex-row m-4 overflow-x-auto scroll-smooth cursor-pointer scrollbar-hide whitespace-nowrap'>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <CatograyDiv
                    key={category.id} // Add key prop
                    id={category.id}
                    functions={() => clickHandler(category)} // Correct clickHandler usage
                    title={category.snippet.title}
                  />
                ))
              ) : (
                <li>No categories available</li>
              )}
            </ul>
          </div>
        )}
      </div>
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
                    ChannelPP={video.profilePicture} // Where is profilePicture coming from?
                    title={video.snippet.title}
                    ChannelTitle={video.snippet.channelTitle}
                    viewCount={formatViewCount(video.statistics.viewCount)}
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
    </div>
  );
}

export default Home;
