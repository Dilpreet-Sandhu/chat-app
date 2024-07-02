import express from 'express';
import {registerUser} from '../controllers/user.controller.js'
export const userRouter = express();


userRouter.route('/reg').post(registerUser)