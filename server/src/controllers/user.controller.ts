import { Request, Response } from "express"
import mongoose from "mongoose";
import { userModel } from "../models/user.model";
// this will be required in the first time only
export async function login(req:Request, res:Response){
    try{
        const { id, name, githubUsername, email, avatarUrl, bio, access_token } = req.body;
        const user = await userModel.findOne({
            githubUserid : id
        })
        // if user exists then also, update the token ... 
        if(user){
            await user.updateOne({
                access_token
            })
        }
        // if it was created, then just create with the first token
        else{
            userModel.create({
                githubUserid:id, 
                githubUsername,
                name,
                email,
                bio, 
                avatarUrl,
                access_token
            });
        }
        return res.json({
            status : 201, 
            message : "user logged in successfully"
        })
    }
    catch(e){
        return res.json({
            message : "some error occurred",
            status:500
        })
    }
    
}
export async function getUser(req:Request, res:Response){
    const { userId } = req.body;
    const findUser = await userModel.findOne({
        githubUserid : userId
    })
    if(!findUser){
        return res.json({
            message : "user not found",
            status : 500
        })
    }
    return res.json({
        message : "user found",
        profile : findUser,
        status : 200
    })
}