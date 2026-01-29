import Post from "../models/posts.model.js";
import User from "../models/user.model.js";

export const getposts = async (req, res) => {
    try {

        const posts = await Post.find()
            .populate('author', 'username avatar email')
            .limit(20);

        return res
        .status(200)
        .json({message : 'posts loaded successfully', posts})

    } catch (error) {
        console.log(error);
        return res
        .status(500)
        .json({message : 'error while getting posts'});
    }
}

export const getpost = async (req, res) => {
    try {
        const postid = req.params.postid;

        const findpost = await Post.findById(postid);

        if(!findpost) {
            return res
            .status(403)
            .json({message : 'this post doesn\'t exist'});
        }

        return res
        .status(200)
        .json({message : `posts with id ${postid} loaded successfully`, findpost});

    } catch (error) {
        console.log(error);
        return res
        .status(500)
        .json({message : `error while getting post`});
    }
}

export const generatepost = async (req, res) => {
    try {
        const userid = req.user.id;

        const {title, description} = req.body;

        if(!title && !description) {
            return res
            .status(400)
            .json({message : 'both title and description are needed for creating a post'});
        }


        const newpost = await Post.create({
            title,
            description,
            author : userid
        })

        if(!newpost) {
            return res
            .status(500)
            .json({message : 'error while creating post'});
        }

        return res
        .status(200)
        .json({message : `posts created successfully by user with id ${userid}`, newpost});

    } catch (error) {
        console.log(error);
        return res
        .status(500)
        .json({message : `error while getting post`});
    }
}

export const likepost = async (req, res) => {
    try {
        const userid = req.user.id;
        const postid = req.params.postid;

        const liked_post = await Post.findByIdAndUpdate(
            postid, 
            { $addToSet: { likes: userid } },
            { new: true }
        );

        const likeByUser = await User.findByIdAndUpdate(
            userid,
            { $addToSet: { likes: postid } },
            { new: true }
        )

        if(!liked_post || !likeByUser) {
            return res
            .status(404)
            .json({message : 'error while liking'});
        }

        return res
        .status(200)
        .json({message : `post liked successfully by user with id ${userid}`, liked_post});

    } catch (error) {
        console.log(error);
        return res
        .status(500)
        .json({message : `error while liking post`});
    }
}

export const unlikepost = async (req, res) => {
    try {
        const userid = req.user.id;
        const postid = req.params.postid;

        const liked_post = await Post.findByIdAndUpdate(
            postid, 
            { $pull: { likes: userid } },
            { new: true }
        );
        
        const user_liked_post = await User.findByIdAndUpdate(
            userid, 
            { $pull: { likes: postid } },
            { new: true }
        );

        if(!liked_post || !user_liked_post) {
            return res
            .status(404)
            .json({message : 'post not found'});
        }

        return res
        .status(200)
        .json({message : `post unliked successfully by user with id ${userid}`, liked_post});

    } catch (error) {
        console.log(error);
        return res
        .status(500)
        .json({message : `error while liking post`});
    }
}

export const deletepost = async (req, res) => {
    try {
        const postid = req.params.postid;

        const deletedpost = await Post.findByIdAndDelete(postid);

        // console.log(deletedpost);

        if(!deletedpost) {
            return res
            .status(404)
            .json({message : 'post not found'});
        }

        return res
        .status(200)
        .json({message : `post with id ${postid} deleted successsfully`});

    } catch (error) {
        console.log(error);
         return res
        .status(500)
        .json({message : `error while deleting post`});
    }
}

export const getlikes = async (req, res) => {
    try {
        const postid = req.params.postid;
        const post = await Post.findById(postid, 'likes').populate('likes', 'username avatar');

        if(!post) {
            return res
            .status(400)
            .json({message:'post not found'});
        }

        return res
        .status(200)
        .json({message:'all likes for post sent', post});

    } catch (error) {
        
    }
}