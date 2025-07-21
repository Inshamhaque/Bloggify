import {Request, Response} from "express"
import { blogModel } from "../models/blog.model"
import { userModel } from "../models/user.model"
import mongoose from "mongoose"

export async function createBlog(req: Request, res: Response) {
    const { title, subtitle, content, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        const newBlog = await blogModel.create({
            user: userId,
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
    try {
        const blogs = await blogModel.find().populate("user", "name email avatarUrl");
        return res.status(200).json({ blogs });
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch blogs", error });
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
// export async function createBlog(){

// }
// export async function editBlog(){

// }
// export async function deleteBlog(){

// }
// export async function getBlogs(){
    
// }