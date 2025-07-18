import express from "express";
import cors from "cors"
import { connectToDB } from "./db";
import axios from "axios";
import dotenv from "dotenv"
import OpenAI from "openai";
import { validateApiKey } from "./middleware.ts/blocknote";
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