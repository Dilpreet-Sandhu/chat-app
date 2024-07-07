import {Schema,model} from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    name : {
        type : String,
        required : [true,"useranem is required"]
    },
    bio : {
        type : String,
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
    avatar : {
        type : String,
        default : ""
    },
    refreshToken :{
        type:String
    }
},{timestamps : true});


userSchema.pre("save",async function(next) {
    if (
    this.isModified(this.password)
    ) next();

    this.password = await bcrypt.hash(this.password,10);
    next()
})

userSchema.methods.isPasswordCorrect = async function(password) {

    return await bcrypt.compare(password,this.password);
    
}
 
userSchema.methods.generateAccessToken = function() {

    return jwt.sign({
        _id : this._id,
        name : this.name
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
)
}


userSchema.methods.generateRefreshToken = function() {

    return jwt.sign({
        _id : this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    }
)
}




export const User = model('User',userSchema)