import express from 'express';
import {registerUser} from '../controllers/user.controller.js';
import {upload} from '../middlewares/multer.middleware.js'

export const userRouter = express();



userRouter.route('/reg').post(upload.single("profilePic"),registerUser)