import ApiKey from '../../Api'

import React from 'react'
function PPofChnl() {
return (
    <div>
        
    </div>
)
}
export default PPofChnl;



export async function youtubeChannelInfoLoader(channelId) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&id=${channelId}&key=${ApiKey}`);
    return response.json();
}
