import {Schema,model} from 'mongoose';


const messageSchema = new Schema({
    text : {
        type : String,
        default : ""
    },
    imageUrl : {
        type : String,
        default : ""
    },
    videoUrl : {
        type : String,
        default : ""
    },
    seen : {
        type : Boolean,
        default : false
    }
},{timestamps : true});


export const Message = model("Message",messageSchema);