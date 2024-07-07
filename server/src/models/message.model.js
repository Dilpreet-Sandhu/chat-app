import {Schema,model} from 'mongoose';

const messageSchema = new Schema({
    sender : {
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    chat : {
        type:Schema.Types.ObjectId,
        ref:"Chat",
        required:true
    },
    content : String || Number,
    attachments : [
        {
            url :{
                type:String
            }
        }
    ]
},{timestamps:true})



export const Message = model('Message',messageSchema)