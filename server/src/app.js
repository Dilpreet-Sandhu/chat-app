import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
dotenv.config();



export const app = express();
app.use(cors({
    origin : process.env.FRONTEND_URL
}))
app.use(express.json({limit : '17kb'}))
app.use(express.urlencoded());
app.use(cookieParser());


//routes imports 
import {userRouter} from './routes/user.routes.js';
import { chatRouter } from './routes/chat.routes.js';

app.use('/api/v1/users',userRouter)
app.use('/api/v1/chats',chatRouter)



