import User from "../models/user.model.js";
import Post from "../models/posts.model.js";

export const getuser = async (req, res) => {
    try {
        const userid = req.params.userid;

        const finduser = await User.findOne(
            { _id: userid, isAvailable: { $ne: false } },
            'username email posts'
        )
            .populate({
                path: 'posts',
                match: { isAvailable: { $ne: false } },
                populate: {
                    path: 'author',
                    select: 'username email',
                    match: { isAvailable: { $ne: false } }
                }
            });

        if(!finduser) {
            return res
            .status(403)
            .json({message : 'User doesn\'t exist'});
        }

        const user = finduser.toObject();
        user.posts = (user.posts || []).filter((post) => Boolean(post?.author));

        return res
        .status(200)
        .json({message : `user fetched successfully`, user})


    } catch (error) {
        console.log(error);
        return res
        .status(500)
        .json({message : `error while finding user`});
    }
}

export const getusers = async (req, res) => {
    try {
        const findusers = await User.find({ isAvailable: { $ne: false } });

        if(!findusers) {
            return res
            .status(403)
            .json({message : 'User doesn\'t exist'});
        }

        return res
        .status(200)
        .json({message : `user fetched successfully`, users : findusers});


    } catch (error) {
        console.log(error);
        return res
        .status(500)
        .json({message : `error while finding user`});
    }
}

export const updateuser = async (req, res) => {
    try {
        const {username, email} = req.body;

        const userid = req.user.id;

        let finduser = await User.findOne({ _id: userid, isAvailable: { $ne: false } });

        if(!finduser) {
            return res
            .status(403)
            .json({message : 'User doesn\'t exist'});
        }

        if(username !== finduser.username) 
            finduser = await User.findByIdAndUpdate(userid, { username }, { new: true, runValidators: true });
        if(email !== finduser.email) 
            finduser = await User.findByIdAndUpdate(userid, { email }, { new: true, runValidators: true });

        return res
        .status(200)
        .json({message : `user updated successfully`, users : finduser});


    } catch (error) {
        console.log(error);
        return res
        .status(500)
        .json({message : `error while updating user`});
    }
}

export const deleteuser = async (req, res) => {
    try {
        const userid = req.user?.id;

        const finduser = await User.findOneAndUpdate(
            { _id: userid, isAvailable: { $ne: false } },
            { isAvailable: false },
            { new: true }
        );

        if(!finduser) {
            return res
            .status(403)
            .json({message : 'User doesn\'t exist'});
        }

        await Post.updateMany(
            { author: userid, isAvailable: { $ne: false } },
            { isAvailable: false }
        );

        return res
        .status(200)
        .json({message : 'user and authored posts marked unavailable successfully'});


    } catch (error) {
        console.log(error);
        return res
        .status(500)
        .json({message : `error while deleting user`});
    }
}

export const getuserlikes = async (req, res) => {
    try {
        const userid = req.user.id;

        const finduser = await User.findOne({ _id: userid, isAvailable: { $ne: false } }, 'likes')
            .populate({
                path: 'likes',
                match: { isAvailable: { $ne: false } },
                populate: {
                    path: 'author',
                    select: 'username email',
                    match: { isAvailable: { $ne: false } }
                }
            });

        if(!finduser) {
            return res
            .status(403)
            .json({message : 'User doesn\'t exist'});
        }

        return res
        .status(200)
        .json({message : `user likes fetched successfully`, liked_posts : finduser})


    } catch (error) {
        console.log(error);
        return res
        .status(500)
        .json({message : `error while finding user`});
    }
}

export const getusersavedposts = async (req, res) => {
    try {
        const userid = req.user.id;

        const finduser = await User.findOne({ _id: userid, isAvailable: { $ne: false } }, 'savedPosts')
            .populate({
                path: 'savedPosts',
                match: { isAvailable: { $ne: false } },
                populate: {
                    path: 'author',
                    select: 'username email',
                    match: { isAvailable: { $ne: false } }
                }
            });

        if(!finduser) {
            return res
            .status(403)
            .json({message : 'User doesn\'t exist'});
        }

        return res
        .status(200)
        .json({message : `user saved posts fetched successfully`, saved_posts : finduser})


    } catch (error) {
        console.log(error);
        return res
        .status(500)
        .json({message : `error while finding user saved posts`});
    }
}
