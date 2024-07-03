import {ApiError,ApiResponse} from '../utils/apiHanlder.js';
import {User} from '../models/user.model.js';
import {uploadToCloudinary} from '../utils/cloudinary.js'

export const registerUser = async (req,res) => {
    try {
        const {name,email,password} = req.body;

        if ([name,email,password].some(item => item == "")) {
            throw new ApiError(400,"name, email and password are required")
        }
        const profilePicPath = req.file.path;

        const profilePic = await uploadToCloudinary(profilePicPath);

        if (!profilePic) {
            throw new ApiError(400,"couldn't upload to cloudinary")
        }



        const user = await User.create({
            name,
            email,
            profilePic : profilePic.url,
            password
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