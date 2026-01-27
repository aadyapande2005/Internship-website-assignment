import User from "../models/user.model.js";
import Post from "../models/posts.model.js";

export const getuser = async (req, res) => {
    try {
        const userid = req.params.userid;

        const finduser = await User.findById(userid);

        if(!finduser) {
            return res
            .status(403)
            .json({message : 'User doesn\'t exist'});
        }

        return res
        .status(200)
        .json({message : `user fetched successfully`, user : finduser})


    } catch (error) {
        console.log(error);
        return res
        .status(500)
        .json({message : `error while finding user`});
    }
}

export const getusers = async (req, res) => {
    try {
        const findusers = await User.find();

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

        let finduser = await User.findById(userid);

        if(!finduser) {
            return res
            .status(403)
            .json({message : 'User doesn\'t exist'});
        }

        if(username !== finduser.username) 
            finduser = await User.findByIdAndUpdate(userid, {username});
        if(email !== finduser.email) 
            finduser = await User.findByIdAndUpdate(userid, {email});

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

        const finduser = await User.findByIdAndDelete(userid);

        if(!finduser) {
            return res
            .status(403)
            .json({message : 'User doesn\'t exist'});
        }

        await Post.deleteMany({ author: userid });
        await Post.updateMany({ likes: userid }, { $pull: { likes: userid } });

        return res
        .status(200)
        .json({message : 'user and posts deleted successfully'});


    } catch (error) {
        console.log(error);
        return res
        .status(500)
        .json({message : `error while deleting user`});
    }
}
