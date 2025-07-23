import mongoose from "mongoose";
export const mediumBlogSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    link:{
        type:String,
        required:true,
        minLength:[40,"Content must be at least 40 characters long"]
    }, 
    pubDate:{
        type: String
    }
})
export const mediumBlog = mongoose.model("medumBlog",mediumBlogSchema)