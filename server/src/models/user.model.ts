import mongoose from "mongoose";
export const userSchema = new mongoose.Schema({
    githubUserid:{
        type:String,// better wud be to change to Number as oAuth sends that only 
        required : true,
        unique:true,
    },
    name:{
        type:String,
        required:true
    },
    githubUsername:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        lowercase:true,
    },
    avatarUrl:{
        type:String,
    },
    bio: {
        type: String,
        default: "",
    },
    access_token:{
        type:String,
        required:true
    }
})
export const userModel = mongoose.model("User",userSchema)