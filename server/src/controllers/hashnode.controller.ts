import { Request, Response } from "express";
import fetch from "node-fetch"; // for Node <18. (For Node 18+, use global fetch)
import {userModel} from "../models/user.model";   
import {hashnodeBlog} from "../models/hashnodeblog.model";  

export async function hashnode_integration(req: Request, res: Response) {
  const { hashnodeusername, githubUsername } = req.body;
  // console.log(hashnodeusername);
  // const stringHashnodeUsername = hashnodeusername.toString()
  const username= String(hashnodeusername)

  if (!hashnodeusername) {
    return res.status(400).json({ error: "Username is required" });
  }
  // fetch the user from the DB
  const user  = await userModel.findOne({
    githubUsername
  })
  if(!user){
    return res.json({
      message : "user not ecists",
      status:404
    })
  }

  try {
    let allBlogs: any[] = [];
    let page = 1;
    const pageSize = 20;

    while (page <= 50) {
      const query = `
        query getUserArticles($username: String!, $page: Int!, $pageSize: Int!) {
          user(username: $username) {
            posts(page: $page, pageSize: $pageSize) {
              edges {
                node {
                  title
                  brief
                  slug
                  publishedAt
                }
              }
            }
          }
        }`;

      const response = await fetch("https://gql.hashnode.com/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables: { username , page, pageSize } }),
      });

      const result = await response.json() as any;

      if (result.errors) {
        return res.status(400).json({ error: result.errors[0].message });
      }

      if (!result.data?.user) {
        return res.status(404).json({ error: "User not found" });
      }

      const edges = result.data.user.posts?.edges || [];
      
      if (edges.length === 0) break;

      const batch = edges.map((edge: any) => ({
        title: edge.node.title,
        link: `https://${hashnodeusername}.hashnode.dev/${edge.node.slug}`,
        pubDate: edge.node.publishedAt,
        description: edge.node.brief,
      }));

      allBlogs.push(...batch);

      if (edges.length < pageSize) break;
      
      page++;
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    if (allBlogs.length === 0) {
      return res.status(404).json({ error: "No posts found for this user" });
    }
    console.log(allBlogs);
    // save to db
    const blogPromises = allBlogs.map(item =>
          hashnodeBlog.create({
            user: user._id, 
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            description:item.description
          })
        );
    
        // TODO: mark the user as hashnode integrated and every user shud have onlty one hashnode username associated with it 
        // one to one relation 
    
    // mark hashnode as integrate
    const blogs = await Promise.all(blogPromises);
    const marked = await userModel.updateOne({
      githubUsername
    },{
      hashNodeIntegrated : true
    })


    res.status(200).json({ 
      githubUsername, 
      blogs,
      totalCount: allBlogs.length
    });

  } catch (error: any) {
    res.status(500).json({ 
      error: "Failed to fetch Hashnode posts", 
      details: error.message 
    });
  }
}


export async function fetchHashnodeBlogs(req: Request, res: Response) {
  const { username } = req.body;

  try {
    const userfound = await userModel.findOne({ githubUsername: username });
    console.log(userfound);

    if (!userfound) {
      return res.status(404).json({
        message: "User not found",
        status: 404
      });
    }

    const hashnodeBlogs = await hashnodeBlog.find({
      user: userfound._id
    });

    return res.json({
      message: "Fetched Hashnode blogs",
      hashnodeBlogs,
      status: 200
    });
  } catch (e) {
    console.error("Error fetching Hashnode blogs:", e);
    return res.status(500).json({
      message: "Error fetching Hashnode blogs",
      status: 500
    });
  }
}
