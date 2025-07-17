import express from "express";
import cors from "cors"
import { connectToDB } from "./db";
import dotenv from "dotenv"
const app = express();
dotenv.config()
app.use(express.json());
connectToDB();

// health checkpoint
app.get('/health',(req,res)=>{
    res.send("server is running healthy")
})
// blog routes
app.get('/blogs',(req,res)=>{
    // list all blogs
})
app.post('/blog',(req,res)=>{
    // create a blog
})
app.get('/blog/:id',(req,res)=>{

})
// server listening here
app.listen(3001,()=>{
    console.log("server running at 3001")
})