import React, { useState, useEffect } from 'react';
import {ApiKey} from '../../Api'
function RandomYouTubeVideo() {
  const [videoId, setVideoId] = useState('');

  useEffect(() => {
    // Function to fetch a random video from YouTube
    const fetchRandomVideo = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${ApiKey}&part=snippet&maxResults=1&type=video&q=random`
        );
        const data = await response.json();
        const randomVideoId = data.items[0].id.videoId;
        setVideoId(randomVideoId);
      } catch (error) {
        console.error('Error fetching random video:', error);
      }
    };

    fetchRandomVideo();
  }, []);

  return (
    <div>
      {videoId && (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Random YouTube Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}

export default RandomYouTubeVideo;
