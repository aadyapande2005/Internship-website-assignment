import User from '../models/user.model.js';


export const register = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        if(!username && !email && !password){
            return res
            .status(400)
            .json({message : 'Enter values for all fields'});
        }

        const finduser = await User.findOne({
            username
        });

        if(finduser){
            return res
            .status(400)
            .json({message : 'user already exists'});
        }

        const newuser = await User.create({
            username,
            email,
            password
        })

        // const accessToken = newuser.generateAccessToken();
        const refreshToken = newuser.generateRefreshToken();

        newuser.refreshToken = refreshToken;

        await newuser.save();

        return res
        .status(200)
        .json({message : 'register successful', user : newuser});
    } catch (error) {
        console.log(error);
        return res
        .status(500)
        .json({message : 'Error while registering...'})
    }    
}

export const login = async (req, res) => {
    try {
        console.log(process.env.CORS_ORIGIN);
        const {username, email, password} = req.body;

        if(!password) {
            return res
            .status(400)
            .json({message : 'password is required for login'});
        }

        if(!username && !email) {
            return res
            .status(400)
            .json({message : 'Username or email is required for login'});
        }

        const finduser = await User.findOne({
            $or : [{username}, {email}]
        });

        if(!finduser) {
            return res
            .status(400)
            .json({message : 'user does not exist'});
        }

        //const foundpassword = finduser.password;

        const isPasswordCorrect = await finduser.validatePassword(password)

        if(!isPasswordCorrect) {
            return res
            .status(400)
            .json({message : 'Wrong password'});
        }

        const accessToken = finduser.generateAccessToken();

        const {password: userpassword, refreshToken, ...user} = finduser.toObject()

        res
        .status(200)
        .cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })
        .json({message : 'Login successful', user});

    } catch (error) {
        console.log(error);
        res
        .status(500)
        .json({message : 'Error while logging in...'})
    }  
}

export const logout = async (req, res) => {
    try {        
        res
        .status(200)
        .clearCookie('accessToken')
        .json({message : 'logout successful'});
    } catch (error) {
        res
        .status(500)
        .json({message : 'Error while logging out...'})
    }  
}

export const isLoggedIn = async (req, res) => {
    try {
        if(!req.user) {
            return res
            .status(400)
        }

        const user = await User.findById(req.user.id, 'username email avatar');

        return res
        .status(200)
        .json({user})

    } catch (error) {
        console.log(error)
        return res
        .status(500)
        .json({message: 'error while authenticating'})
    }
}



