import { Request, Response } from "express"
import mongoose from "mongoose";
import { userModel } from "../models/user.model";
import axios from "axios";
import { AuthRequest } from "../middleware.ts/auth";
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
export async function getProfile(req:AuthRequest,res:Response){
    const { username } = req.body;
    try{
        //fetch the latest access token
        const user = await userModel.findOne({
            githubUsername : username
        });
        const access_token  = user?.access_token
        console.log(user);
        if(!user){
            return res.json({
                message : "user not found",
                status : 404
            })
        }
        // fetch the profile from github api
        const response = await axios.get("https://api.github.com/user", {
            headers: {
            Authorization: `Bearer ${access_token} `,
            Accept: "application/vnd.github+json",
            }
        })
        
        console.log(response.data)
        return res.json({
            data : response.data,
            mediumStatus:user?.mediumIntegrated,
            hashnodeStatus:user?.hashNodeIntegrated,
            status:200
        })
    }   
    catch(e){
        return res.json({
            message : "error fetching profile",
            status : 500
        })
    }

}
export async function distinguishUser(req:Request, res:Response){
    const token = req.headers.authorization;
    const { username } = req.body;

    console.log("Authorization Token:", token);
    console.log("Requested Username:", username);

    if (!token) {
    return res.json({
        status: 404,
        message: "User not authorized",
    });
    }

    const check = await userModel.findOne({
    access_token: token,
    githubUsername: username, // Assuming 'username' is stored in DB
    });

    if (!check) {
    return res.json({
        viewer: "visitor",
        status: 200,
    });
    }

    return res.json({
    viewer: "owner",
    status: 200,
    });

}