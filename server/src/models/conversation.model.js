import {Schema,model} from 'mongoose';



const converstationSchema = new Schema({
    sender : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    reciever : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    message : [
        {
            type : Schema.Types.ObjectId,
            ref : "Message"
        }
    ]
})

export const Conversation = model("Conversation",converstationSchema)