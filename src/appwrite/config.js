import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";
// Done 
export class Service{
    client = new Client();
    databases;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async SetSub({ Channel_Id }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                Channel_Id, // Use Channel_Id as the document ID
                {
                   Channel_Id
                }
            );
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }
    
    async SetWatchedVideoId({ CatograyWatchVideo_ID, Unique_ID }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionWatchId,
                Unique_ID,
                {
                    CatograyWatchVideo_ID
                }
            );
        } catch (error) {
            console.log("Appwrite serive :: SetWatchedVideoId :: error", error);
        }
    }

    async getWatchedVideos() {
        try {
            // Use the listDocuments method to retrieve all documents from the collection
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionWatchId
            );
        } catch (error) {
            console.log("Appwrite serive :: getWatchedVideos :: error", error);
            return false;
        }
    }
    
    

    async deleteSub(Channel_Id) {
        try {
            // Delete the document based on the Channel_Id
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                Channel_Id
            );
            return true;
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false;
        }
    }
    
    async getSub() {
        try {
            // Use the listDocuments method to retrieve all documents from the collection
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId
            );
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false;
        }
    }
    

  
}


const service = new Service()
export default service