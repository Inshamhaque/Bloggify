import express from "express";
import cors from "cors"
import { connectToDB } from "./db";
import axios from "axios";
import dotenv from "dotenv"
import OpenAI from "openai";
import { validateApiKey } from "./middleware.ts/blocknote";
import { createBlog, getAllBlogs, getBlogByUsername, getSingleBlogById, getUserBlogs } from "./controllers/blog.controller";
import { distinguishUser, getProfile, getUser, login } from "./controllers/user.controller";
import { auth } from "./middleware.ts/auth";
import { fetchMediumBlogs, medium_integration } from "./controllers/medium.controller";
import { hashnode_integration } from "./controllers/hashnode.controller";
const app = express();
dotenv.config()
app.use(express.json());
app.use(cors())
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

// blocknote ai checkpoints

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


// Custom API key validation middleware


// AI completion endpoint for BlockNote
app.post('/ai', validateApiKey, async (req, res) => {
  try {
    const { provider, url } = req.query;
    const { messages, model = 'gpt-4o-mini', stream = false, ...otherParams } = req.body;
    
    console.log('AI request received:', { provider, url, model, stream });
    
    // Handle OpenAI requests
    if (provider === 'openai' && url === 'https://api.openai.com/v1/chat/completions') {
      
      if (stream) {
        // Handle streaming requests
        const streamResponse = await openai.chat.completions.create({
          model,
          messages,
          stream: true,
          ...otherParams,
        });
        
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        //@ts-ignore
        for await (const chunk of streamResponse) {
          res.write(`data: ${JSON.stringify(chunk)}\n\n`);
        }
        
        res.write('data: [DONE]\n\n');
        res.end();
      } else {
        // Handle regular completion requests
        const completion = await openai.chat.completions.create({
          model,
          messages,
          ...otherParams,
        });
        
        res.json(completion);
      }
    } else {
      res.status(400).json({ 
        error: 'Unsupported provider or URL',
        provider,
        url 
      });
    }
  } catch (error:any) {
    console.error('AI completion error:', error);
    res.status(500).json({ 
      error: 'AI completion failed',
      details: error.message 
    });
  }
});



// health checkpoint
app.get('/health',(req,res)=>{
    res.send("server is running healthy")
})
// user login endpoint
app.post('/user/login',(req,res)=>{
  login(req,res)
})
// user profile endpoint -- public endpoint
app.post('/user/profile',(req,res)=>{
  getProfile(req,res);
})
// blog routes
app.get('/blogs',(req,res)=>{
    getAllBlogs(req,res);
})
app.post('/blog',auth,(req,res)=>{
    createBlog(req,res)
})
app.get('/blog/:id',auth,(req,res)=>{
    getSingleBlogById(req,res)
})
app.get('/userblog',auth,(req, res)=>{
  getUserBlogs(req, res)
})
// get blogs by username -- public endpoint
app.post('/user/blog',(req,res)=>{
  getBlogByUsername(req,res);
})
// get modium blogs by username 
app.post('/user/medium/blogs',(req,res)=>{
  fetchMediumBlogs(req,res)
})
// medium blogs
app.post('/user/medium',(req,res)=>{
  medium_integration(req,res);
})
app.get('/user/hashnode',(req,res)=>{
  hashnode_integration(req,res);
})
// viewer distinction endpoint
app.post('/user/distinguish',(req,res)=>{
  distinguishUser(req,res);
})
// server listening here
app.listen(3001,()=>{
    console.log("server running at 3001")
})