import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    likes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    images : [String],
});

const Post = new mongoose.model('Post', postSchema);

export default Post;