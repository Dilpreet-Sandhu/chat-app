import express from 'express';
import {loginUser, logoutUser, registerUser} from '../controllers/user.controller.js';
import {upload} from '../middlewares/multer.middleware.js';
import {verifyJWT} from '../middlewares/auth.middleware.js'

export const userRouter = express();



userRouter.route('/reg').post(upload.single("avatar"),registerUser)
userRouter.route('/login').post(loginUser)
userRouter.route('/logout').delete(verifyJWT,logoutUser)