import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {Server} from 'socket.io';
import {createServer} from 'node:http'

dotenv.config();



export const app = express();
export const server = createServer(app)
export const io = new Server(server,{
    cors : {
        origin : 'http://localhost:3000',
    }
})
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true,
}))
app.use(express.json({limit : '17kb'}))
app.use(express.urlencoded());
app.use(cookieParser());
export const userSocketIDs = new Map();

app.get('/',(req,res) => {
    res.json({message:"hello world"})
})




//routes imports 
import {userRouter} from './routes/user.routes.js';
import { chatRouter } from './routes/chat.routes.js';
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from './constants/constants.js';
import { v4 } from 'uuid';
import { getSocket } from './utils/helper.js';

app.use('/api/v1/users',userRouter)
app.use('/api/v1/chats',chatRouter)



io.on("connection",(socket) => {

    console.log('a user connected' + socket.id);

    const user = {_id:"3wa32ay7sdkjlf",name : "baba"};

    userSocketIDs.set(user._id.toString(),socket.id);

    console.log(userSocketIDs)

    
    
    
    socket.on(NEW_MESSAGE,async({chatId,members,message}) => {
        
        const messageForRealTime = {
            content:message,
            _id :v4(),
            sender : {
                _id: user?._id,
                name:user.name,
            },
            chat:chatId,
            createdAt : new Date().toISOString()
        }

        const messageForDb = {
            content: message,
            sender : user?._id,
            chat:chatId
        }
        const userSockets = getSocket(members);

        io.to(userSockets).emit(NEW_MESSAGE,{
            chatId,
            message: messageForRealTime
        })
        io.to(userSockets).emit(NEW_MESSAGE_ALERT,{chatId})
        
        console.log(messageForRealTime)
        
    })

    socket.on("disconnect",() => {
        console.log('a user disconnected')
        userSocketIDs.delete(user._id.toString())
    })
})


