import {Client,Account} from 'appwrite'
const client = new Client();
const AppwriteUrl = process.env.VITE_APPWRITE_KEY
const ProjectUrl = process.env.VITE_APPWRITEPROJECT_KEY
client
    .setEndpoint(AppwriteUrl)
    .setProject(ProjectUrl);

export const account = new Account(client);
export default client;