import { Request, Response } from "express"
import mongoose from "mongoose";
import { userModel } from "../models/user.model";
// this will be required in the first time only
export async function login(req:Request, res:Response){
    const { id, name, githubUsername, email, avatarUrl, bio } = req.body;
    const user = await userModel.findOne({
        githubUserid : id
    })
    if(!user){
        userModel.create({
            githubUserid:id, 
            githubUsername,
            name,
            email,
            bio, 
            avatarUrl,
        });
    }
}