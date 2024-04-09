import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You can use Axios for making HTTP requests
import {ApiKey} from "../../../Api"; // Assuming ApiKey is a default export

function Comments({videoId,countOfComment}) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        // Use the imported ApiKey directly
        const apiKey = ApiKey;

        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}`
        );
        const commentData = response.data.items.map(item => {
          return {
            id: item.id,
            username: item.snippet.topLevelComment.snippet.authorDisplayName,
            text: item.snippet.topLevelComment.snippet.textDisplay
          };
        });
        setComments(commentData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [videoId]); // Add videoId to dependency array to rerun effect when it changes

  return (
    <div className='w-[70vw] m-[1vw] border-2 border-gray-400'>
      <h1 className='font-bold text-xl font-mono'>{countOfComment} Comments</h1>
      <ul className='flex flex-col ' >
        {comments.map(comment => (
          <li key={comment.id} className='flex flex-col m-[2px] border-2 border-gray-200 '>
            <strong>{comment.username}</strong>
            <p>
                {comment.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
