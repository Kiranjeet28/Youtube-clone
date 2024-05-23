import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import SubModel from './Schema/Subscribe.js';
import WatchedModel from './Schema/WatchedVideo.js'
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const Url = process.env.VITE_SOME_KEY
// MongoDB Connection
mongoose.connect(Url)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  app.post('/check', async (req, res) => {
    const { email, Channel_Id } = req.body;
    try {
      const existingSub = await SubModel.findOne({ email, Channel_Id });
      if (!existingSub) {
        return res.json({ exists: false }); // Subscription does not exist, can be added
      }
      return res.json({ exists: true }); // Subscription already exists
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Function to handle POST requests for adding subscribers
  const handlePostRequest = async (model, req, res) => {
    try {
      const newData = new model(req.body);
      const savedData = await newData.save();
      console.log(res)
      res.status(201).json(savedData);
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Route for adding subscribers
  app.post('/postSubscribers', async (req, res) => {
    await handlePostRequest(SubModel, req, res);
  });
  
// Route for adding Watched Video
app.post('/postWatched', async (req, res) => {
  await handlePostRequest(WatchedModel, req, res);
});

  // Function to handle GET requests for retrieving subscribers
  const handleGetRequest = async (model, req, res) => {
    const { email } = req.query;
    try {
      const documents = await model.find({ email });
      if (documents.length === 0) {
        return res.status(404).json({ error: 'No documents found for the given email' });
      }
      // Extracting channelIds and urls from documents
      const channelIds = documents.map(doc => doc.Channel_Id);
      const urls = documents.map(doc => doc.url); // Corrected typo here
      console.log("In Main i am call");
      return res.status(200).json({ channelIds, urls });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  // Route for getting subscribers
  app.get('/GetSubscribers', async (req, res) => {
    console.log("get it ")
    await handleGetRequest(SubModel, req, res);
  });

   // Route for getting WatchedVideos
   // different method is required 

    const GetWatchedVideo = async (model, req, res) => {
    const { email } = req.query;
    try {
      const documents = await model.find({ email });
      if (documents.length === 0) {
        return res.status(404).json({ error: 'No documents found for the given email' });
      }
      // Extracting channelIds and urls from documents
      const channelIds = documents.map(doc => doc.Channel_Id);
      console.log(res)
      return res.status(200).json({ channelIds});
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

   app.get('/GetWatchedChannels', async (req, res) => {
    await GetWatchedVideo(WatchedModel, req, res);
  });