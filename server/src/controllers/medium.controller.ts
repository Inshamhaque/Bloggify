import RSSParser from 'rss-parser';
import { Request, Response } from 'express';

const parser = new RSSParser();

export async function medium_integration(req:Request, res:Response ) {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const feed = await parser.parseURL(`https://medium.com/feed/@${username}`);

    const blogs = feed.items.map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      description: item.contentSnippet || item.content?.slice(0, 150),
    }));

    res.status(200).json({ username, blogs });
  } catch (error:any) {
    res.status(500).json({ error: "Failed to fetch Medium feed", details: error.message });
  }
}
