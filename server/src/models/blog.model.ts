import mongoose from "mongoose"
export const blogSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    subtitle:{
        type:String,
    },
    content:{
        type:String,
        required:true,
        minLength:[40,"Content must be at least 40 characters long"]
    }
})
export const blogModel = mongoose.model("Blog",blogSchema)