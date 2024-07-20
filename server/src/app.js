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
        origin : ['http://localhost:3000',"http://localhost:5173",'https://chat-app-ruby-seven.vercel.app'],
        credentials : true
        
    }
});
app.set("io",io)
app.use(cors({
    origin : process.env.FRONTEND_URL || 'https://chat-app-ruby-seven.vercel.app',
    credentials : true,
}))
app.use(express.json({limit : '17kb'}))
app.use(express.urlencoded());
app.use(cookieParser());


export const userSocketIDs = new Map();
export const onlineUsers = new Set();

app.get('/',(req,res) => {
    res.json({message:"hello world"})
})




//routes imports 
import {userRouter} from './routes/user.routes.js';
import { chatRouter } from './routes/chat.routes.js';
import { CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, NEW_MESSAGE_ALERT } from './constants/constants.js';
import { v4 } from 'uuid';
import { getSocket } from './utils/helper.js';
import { verifySocket } from './middlewares/auth.middleware.js';
import { Message } from './models/message.model.js';
import { ONLINE_USERS, START_TYPING, STOP_TYPING } from '../../client/src/utils/constants.js';

app.use('/api/v1/users',userRouter)
app.use('/api/v1/chats',chatRouter)

io.use((socket,next) => {
    cookieParser()(socket.request,socket.request.res,async (err) => {
        return await verifySocket(err,socket,next)
    })
})

io.on("connection",(socket) => {

   

    const user = socket.user;

    userSocketIDs.set(user._id.toString(),socket.id);

  
    
    
    socket.on(NEW_MESSAGE,async({chatId,members,message}) => {
        
        const messageForRealTime = {
            content:message,
            attachments: [],
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
        io.to(userSockets).emit(NEW_MESSAGE_ALERT,{chatId});
        
       const MessageForDatabase =  await Message.create(messageForDb);
        
    })

    socket.on(START_TYPING,async ({members,chatId}) => {
        const membersSockets = getSocket(members);

        socket.to(membersSockets).emit(START_TYPING,{chatId})
    })

    socket.on(STOP_TYPING,async ({members,chatId}) => {
        const membersSockets = getSocket(members)

        socket.to(membersSockets).emit(STOP_TYPING,{members,chatId })
    })

    

    socket.on("disconnect",() => {
        userSocketIDs.delete(user._id.toString())
    })
})


