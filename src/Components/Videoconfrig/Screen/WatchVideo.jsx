import React, { useState } from 'react';

const WatchVideo = () => {
  const [videoId, setVideoId] = useState('');
  const [inputField, setInputField] = useState(true);

  const handleInputChange = (event) => {
    setVideoId(event.target.value);
    setInputField(false);
  };

  const blankVideoNError = () => {
    setVideoId('');
    setInputField(true);
  };
  const isValidYouTubeId = (id) => {
    // Regular expression to match YouTube video IDs
    const regex = /^[A-Za-z0-9_-]{11}$/;
    return regex.test(id);
  };
  return (
    <div className="w-auto h-auto bg-red-300 m-1  p-0 rounded-md">
      {inputField && (
        <p className='text-md text-gray-700  font-bold '>Lets Watch a Video Together </p>
      )}
      {inputField && (
        <input
          type="text"
          placeholder="Enter YouTube video link"
          value={videoId}
          onChange={handleInputChange}
          className="h-[4vh] w-auto flex-1 mt-[1vh] rounded-md py-2 px-4 mr-2 bg-white text-black focus:outline-none m-2"
        />
      )}



      {videoId && (
        <div onClick={blankVideoNError} className="font-bold cursor-pointer text-red-500">
          X
        </div>
      )}

      {videoId && <div className='m-[1vh]'>
        {isValidYouTubeId(videoId) ? (
          <iframe
            className='md:w-[30vw] md:h-[30vh] w-[30vw] h-[30vh]'
            src={`https://www.youtube.com/embed/${videoId}`}
            title="Random YouTube Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p className="text-red-500">Invalid YouTube video ID</p>
        )}
      </div>}
    </div>
  );
};

export default WatchVideo;
