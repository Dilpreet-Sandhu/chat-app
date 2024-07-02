import mongoose from 'mongoose';


export async function connectDb() {
    try {
        await mongoose.connect(`${process.env.MONGOURI}/${process.env.DBNAME}`);

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