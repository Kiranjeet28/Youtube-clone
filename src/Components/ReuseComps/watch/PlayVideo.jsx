import React from 'react';
function PlayVideo({ videoId }) {

    const isValidYouTubeId = (id) => {
        // Regular expression to match YouTube video IDs
        const regex = /^[A-Za-z0-9_-]{11}$/;
        return regex.test(id);
    };

    return (
        <div className='m-[4vh]'>
            {isValidYouTubeId(videoId) ? (
                <iframe 
                    className='md:w-[70vw] md:h-[60vh] w-[80vw] h-[30vh]'
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="Random YouTube Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            ) : (
                <p className="text-red-500">Invalid YouTube video ID</p>
            )}
        </div>
    );
}

export default PlayVideo;
