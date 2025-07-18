import express from "express";
import cors from "cors"
import { connectToDB } from "./db";
import axios from "axios";
import dotenv from "dotenv"
const app = express();
dotenv.config()
app.use(express.json());
connectToDB();


// auth checkpoints
app.get("/auth/github", (req, res) => {
  const redirectURL = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user,repo`;
  res.redirect(redirectURL);
});

app.get("/auth/github/callback", async (req, res) => {
  const code = req.query.code;

  try {
    const tokenRes = await axios.post(
      `https://github.com/login/oauth/access_token`,
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: "application/json" },
      }
    );

    const access_token = tokenRes.data.access_token;

    const userRes = await axios.get(`https://api.github.com/user`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    res.redirect(`${process.env.FRONTEND_URL}/loading/?token=${access_token}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("GitHub auth failed");
  }
});

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