import mongoose from 'mongoose';


async function connectDb() {
    try {
        await mongoose.connect()
    } catch (error) {
        console.log("error while connecting to databsae" + error)
    }
}