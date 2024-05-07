import mongoose from 'mongoose';

const WatchedSchema = new mongoose.Schema({
    Channel_Id: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});

const WatchedModel = mongoose.model('Watched', WatchedSchema, 'Watched');

export default WatchedModel;
