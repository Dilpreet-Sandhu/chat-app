import {Schema,model} from 'mongoose';

const requestSchema = new Schema({
    status:{
        type:String,
        enum :["PENDING","ACCEPTED","REJECTED"],
        default : "PENDING"
    },
    sender :{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    reciever :{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
},{timestamps:true})


export const Request = model("Request",requestSchema)