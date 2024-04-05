import { ApiKey } from "../../../Api";
export async function ApiPPChannel(channelId) {
    console.log("channel id", channelId);
    const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&id=${channelId}&key=${ApiKey}`);
    const data = await response.json();
    
    if (data.items.length === 0) {
        throw new Error('Channel not found');
    }
    console.log(data.items[0].snippet.thumbnails.default.url)
    
    return data.items[0].snippet.thumbnails.default.url;
}
