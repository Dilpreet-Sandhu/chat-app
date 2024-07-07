import {ApiError,ApiResponse} from '../utils/apiHanlder.js'
import jwt from 'jsonwebtoken';
import {User} from '../models/user.model.js'

export const verifyJWT = async (req,res,next) => {
    try {
        const token = req.cookies?.accessToken;

        if (!token) {
            throw new ApiError(400,'you are not logged in')
        }
        
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

        if (!decodedToken){
            throw new ApiError(400,"couldn't decode the token")
        }

        const user = await User.findById(decodedToken._id);

        if (!user) {
            throw new ApiError(400,"no user found")
        }

        req.user = user;
        next()

    } catch (error) {
        throw new ApiError(400,error.message || 'somethin went wrong')
    }
}