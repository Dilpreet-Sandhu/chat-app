import {ApiError,ApiResponse, cookieOptions} from '../utils/apiHanlder.js';
import {User} from '../models/user.model.js';
import {uploadToCloudinary} from '../utils/cloudinary.js'

export const registerUser = async (req,res) => {
    try {
        const {name,email,password,bio} = req.body;

        if ([name,email,password].some(item => item == "")) {
            throw new ApiError(400,"name, email and password are required")
        }
        const avatarPath = req.file.path;

        const avatar = await uploadToCloudinary(avatarPath);

        if (!avatar) {
            throw new ApiError(400,"couldn't upload to cloudinary")
        }



        const user = await User.create({
            name,
            email,
            avatar : avatar.url,
            password,
            bio
        })

         if (!user) {
            throw new ApiError(400,"couldn't generate user")
         }

        res
        .status(200)
        .json(
            new ApiResponse(201,user,"user created successfully")
        ) 

    } catch (error) {
       console.log(error)
    }
}


const generateTokens = async (id) => {

    const user = await User.findById(id);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    if (!accessToken || !refreshToken) {
        throw new ApiError(400,"couldn't generate access or refresh token")
    }

    return {accessToken,refreshToken}

}

export const loginUser = async (req,res) => {
    const {email,password} = req.body;

    if (!email && !password) {
        throw new ApiError(400,"email and password are required")
    }

    const user = await User.findOne({email : email});

    const isPasswordCorrect = user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new ApiError(400,"wrong password")
    }

    if (!user) {
        throw new ApiError(400,"no user found with this email")
    }

    const {accessToken,refreshToken} = await generateTokens(user._id);

    const newUser = await User.findById(user._id);
    newUser.refreshToken = refreshToken;
    await newUser.save({validateBeforeSave:false})

    res.status(200)
    .cookie('accessToken',accessToken,cookieOptions)
    .cookie('refreshToken',refreshToken,cookieOptions)
    .json(
        new ApiResponse(200,newUser,"user logged in successfully")
    )


}

export const logoutUser = async (req,res) => {
    
    const user = await User.findByIdAndUpdate(req.user?._id,{
        $unset : {
            refreshToken : ""
        }
    },{
        new : true
    })

    if (!user) {
        throw new ApiError(401,"you are not logged in")
    }

    res
    .status(200)
    .clearCookie("accessToken",cookieOptions)
    .clearCookie("refreshToken",cookieOptions)
    .json(
        new ApiResponse(200,{},"user logged out successfully")
    )
}