import {Schema,model} from 'mongoose';


const userSchema = new Schema({
    name : {
        type : String,
        required : [true,"useranem is required"]
    },
    email : {
        type : String,
        required : [true,"email is required "],
        unique : true
    },
    password : {
        type : String,
        required : [true,"password is required"]
    },
    profilePic : {
        type : String,
        default : ""
    }
},{timestamps : true});


export const User = model('User',userSchema)