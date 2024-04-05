import React from 'react';

function PlayVideo({ videoId }) {
   console.log(videoId)
    return (
        <div className='m-[4vh]'>
        {videoId && (
            <iframe
             className='md:w-[70vw] md:h-[60vh] w-[80vw] h-[30vh] '
            src={`https://www.youtube.com/embed/${videoId}`}
            title="Random YouTube Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            ></iframe>
        )}
        </div>
    );
}

export default PlayVideo;
