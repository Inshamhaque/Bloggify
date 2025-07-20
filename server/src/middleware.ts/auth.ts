import { NextFunction, Request, Response } from "express";
import { userModel } from "../models/user.model";
import { ObjectId } from "mongodb";

export interface AuthRequest extends Request{
    userId? : ObjectId
}
export async  function auth(req:AuthRequest, res:Response, next:NextFunction){
     const token = req.headers.authorization;
     console.log(token)
     console.log("authorization header is : ",);
     if(!token){
        return res.json({
            status:404,
            message : "user not authorized"
        })
     }
     // verify if the token is correct by searching against the db
     const check = await userModel.findOne({
        access_token : token
     })
     if(!check){
        return res.json({
            message : "chalaki krro choro",
            status : 404
        })
     }
     // set the userId as githubUserId
     req.userId = check._id;
     next();

}