import {Request, Response} from "express"
import { blogModel } from "../models/blog.model"
import { userModel } from "../models/user.model"
import mongoose from "mongoose"
import { AuthRequest } from "../middleware.ts/auth";

export async function createBlog(req: AuthRequest, res: Response) {
    const { title, subtitle, content, userId } = req.body;

    try {
        const newBlog = await blogModel.create({
            user: req.userId,
            title,
            subtitle,
            content
        });

        return res.status(201).json({ blog: newBlog });
    } catch (error) {
        return res.status(500).json({ message: "Failed to create blog", error });
    }
}

export async function getAllBlogs(req: Request, res: Response) {
    try{
        const blogs = await blogModel.find().populate("user");
        if(!blogs){
            return res.json({
                message : "Not blogs found",
                status:411
            })
        }
        return res.json({
            message : "blogs fetched successfully",
            blogs,
            status : 200
        })
    }
    catch(e){
        return res.json({
            message : "some error occurred",
            status: 500
        })
    }
}

export async function getUserBlogs(req: Request, res: Response) {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        const blogs = await blogModel.find({ user: userId }).populate("user", "name email");
        return res.status(200).json({ blogs });
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch user blogs", error });
    }
}

export async function getBlogbyId(){

}

export async function editBlog(){

// }
// export async function deleteBlog(){

}
// get blogs by id
export async function getSingleBlogById(req: Request, res: Response) {
    try {
        const { id } = req.params; // Get blog ID from URL parameters
        
        const blog = await blogModel.findById(id).populate("user");
        
        if (!blog) {
            return res.json({
                message: "Blog not found",
                status: 404
            });
        }
        
        return res.json({
            message: "Blog fetched successfully",
            blog,
            status: 200
        });
    }
    catch (e) {
        return res.json({
            message: "Some error occurred",
            status: 500
        });
    }
}