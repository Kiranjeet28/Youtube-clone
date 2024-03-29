import React, { useState } from 'react';
import axios from 'axios';

function YouTubeSearch() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = async (event) => {
        const userInput = event.target.value;
        setQuery(userInput);
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    key: 'YOUR_API_KEY',
                    part: 'snippet',
                    q: userInput,
                    type: 'video',
                    maxResults: 5 // Adjust this as needed
                },
            });
            setSuggestions(response.data.items);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search for videos..."
            />
            <ul>
                {suggestions.map((item) => (
                    <li key={item.id.videoId}>{item.snippet.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default YouTubeSearch;
