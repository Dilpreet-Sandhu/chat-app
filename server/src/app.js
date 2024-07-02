import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();



export const app = express();
app.use(cors({
    origin : process.env.FRONTEND_URL
}))
app.use(express.json({limit : '17kb'}))



//routes imports 
import {userRouter} from './routes/user.routes.js';

app.use('/api/v1/users',userRouter)



