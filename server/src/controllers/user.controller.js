import {ApiError,ApiResponse} from '../utils/apiHanlder.js';
import {User} from '../models/user.model.js';

const registerUser = async (req,res) => {
    try {
        const {name,email,password,profilePic} = req.body;

        const user = await User.findOne({email});

        if (user) {
            throw new ApiError(400,"user already exists")
        }

        user = await User.create({
            name,
            email,
            profilePic,
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
        throw new ApiError(500,error);
    }
}