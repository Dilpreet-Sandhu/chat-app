import {Schema,model} from 'mongoose';


const chatSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    groupChat :{
        type:Boolean,
        default :false
    },
    members :[
        {
            type :Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    ],
    creator :{
        type :Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})



export const Chat = model("Chat",chatSchema)