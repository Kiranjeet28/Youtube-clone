import React, { useEffect, useState } from 'react';

function Homelayout({ category }) {
  const [videos, setVideos] = useState([]);
  const [Catogray, setCatogray] = useState([]);

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    let apiUrl;
    if (category) {
      setCatogray(category)
      console.log(Catogray)
      apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=5&videoCategoryId=${Catogray}&key=AIzaSyBodI_aQueIY74F0G6BeaMs1qvjL_8naAs
      `;
    } else {
      apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=5&key=AIzaSyBodI_aQueIY74F0G6BeaMs1qvjL_8naAs`;
    }
+
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
        }));
        setVideos(videoData);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setLoading(false);
      });
  }, [category]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : videos.length > 0 ? (
        <div>
          <ul>
            {videos.map((video) => (
              <li key={video.id}>
                <div className="video">
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.snippet.title}
                    allowFullScreen
                  ></iframe>
                  <h2>{video.snippet.title}</h2>
                  <p>Channel: {video.snippet.channelTitle}</p>
                  <p>Published At: {video.snippet.publishedAt}</p>
                  <img
                    src={video.snippet.thumbnails.default.url}
                    alt="Video Thumbnail"
                  />
                </div>
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
