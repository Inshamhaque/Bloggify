import RSSParser from 'rss-parser';
import { Request, Response } from 'express';
import { userModel } from '../models/user.model';
import { mediumBlog } from '../models/mediumblog.model';
import mongoose from 'mongoose';

const parser = new RSSParser();

export async function medium_integration(req: Request, res: Response) {
  const { username, mediumusername } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    // Fetch user by GitHub username
    const user = await userModel.findOne({ githubUsername: username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const feed = await parser.parseURL(`https://medium.com/feed/@${mediumusername}`);

    const blogPromises = feed.items.map(item =>
      mediumBlog.create({
        user: user._id, 
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: item.contentSnippet || item.content?.slice(0, 150),
      })
    );

    // TODO: mark the user as medium integrated

    const blogs = await Promise.all(blogPromises);

    res.status(200).json({ username, blogs });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch Medium feed",
      details: error.message
    });
  }
}
export async function fetchMediumBlogs(req:Request, res:Response){
  const { username } = req.body;
    try{
      const userfound = await userModel.findOne({githubUsername:username});
      console.log(userfound)
      const mediumBlogs = await mediumBlog.find({
        user:userfound?._id
      })
      return res.json({
        message : "fetched medium blogs",
        mediumBlogs,
        status:200
      })
    }
    catch(e){
      return res.json({
        message : "error fetching blogs",
        status:500
      })
    }
}
