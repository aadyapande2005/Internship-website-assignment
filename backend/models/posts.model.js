import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    Description : {
        type : String,
        required : true
    },
    likes : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    author : {
        type : String,
        required : true
    }
});

const post = new mongoose.model('Post', postSchema);

export default post;