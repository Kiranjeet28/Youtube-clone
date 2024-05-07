import mongoose from 'mongoose';

const SubSchema = new mongoose.Schema({
    Channel_Id: {
        type: String,
        required: true,
    },
    
    email: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
});

const SubModel = mongoose.model('Subscribe', SubSchema, 'Subscribe');

export default SubModel;
