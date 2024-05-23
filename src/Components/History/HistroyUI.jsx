import React from 'react';
import PlayVideo from '../ReuseComps/watch/PlayVideo';
import useWatchedChannels from '../Watch/useWatchedChannels';

function HistoryUI() {
    const channelIds = useWatchedChannels();

    return (
        <div className='mt-14 bg-red-400 w-[98vw] flex justify-center flex-col items-center'>
            <h1 className='bg-gray-800 text-5xl font-mono mt-3 text-white p-2'>Your History</h1>
            <ul>
                {channelIds.map((channelId, index) => (
                    <li key={index}>
                         <PlayVideo videoId={channelId} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HistoryUI;
