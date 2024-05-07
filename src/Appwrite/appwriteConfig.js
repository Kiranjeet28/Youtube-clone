import {Client,Account} from 'appwrite'
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66269d3c2403b1bb2eeb');

export const account = new Account(client);
export default client;