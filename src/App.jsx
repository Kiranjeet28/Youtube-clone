import React, { useEffect } from 'react';

function App() {
  // Define the API endpoint
  const apiUrl = 'https://www.googleapis.com/youtube/v3/search?q=programming&key=AIzaSyBodI_aQueIY74F0G6BeaMs1qvjL_8naAs&part=id&type=video&maxResults=50';

  useEffect(() => {
    // Fetch data from the API
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const videoIds = data.items.map(item => item.id.videoId);
        console.log('Video URLs:', videoIds.map(id => `https://www.youtube.com/watch?v=${id}`));
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div>
      <h1>Fetching Data</h1>
    </div>
  );
}

export default App;