import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();



const app = express();
app.use(cors({
    origin : process.env.FRONTEND_URL
}))
app.use(express.json({limit : '17kb'}))

app.get('/',(req,res) => {
    res.json({message : "server started"})
})


