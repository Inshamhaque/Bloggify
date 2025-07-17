import mongoose from "mongoose";
export const userSchema = new mongoose.Schema({
    githubUserid:{
        type: String, 
        required : true,
        uniqe:true,
    },
    name:{
        type:String,
        required:true
    },
    githubUsername:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },
    avatarUrl:{
        type:String,
    },
    bio: {
        type: String,
        default: "",
    },
})
export const userModel = mongoose.model("User",userSchema)