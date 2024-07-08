import mongoose from 'mongoose';


export async function connectDb() {
    try {
        await mongoose.connect(`${process.env.MONGOURI || "mongodb+srv://chat_app:kB0pSifPJXhAI0aH@chat.3u86ldp.mongodb.net"}/${process.env.DBNAME || "chat"}`).then(() => console.log('db connected'))


        const connect = mongoose.connection;

        connect.on('connected',() => {
            console.log('connected to database')
        })

        connect.on('error',(err) => {
            console.log('error in connecting' + err)
        })

    } catch (error) {
        console.log("error while connecting to databsae" + error)
    }
}