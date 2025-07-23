import { Request, Response } from "express";
import fetch from "node-fetch"; // for Node <18. (For Node 18+, use global fetch)

export async function hashnode_integration(req: Request, res: Response) {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const query = `
        query getUserArticles($username: String!) {
            user(username: $username) {
            posts(page: , pageSize: 10) {
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
      body: JSON.stringify({ query, variables: { username } }),
    });

    const result = (await response.json()) as any;
    console.log(result);

    if (!result.data?.user?.posts?.edges?.length) {
      return res.status(404).json({ error: "User or publication not found" });
    }

    const blogs = result.data.user.posts.edges.map((edge: any) => ({
         title: edge.node.title,
         link: `https://${username}.hashnode.dev/${edge.node.slug}`,
         pubDate: edge.node.publishedAt,
         description: edge.node.brief,
    }));

    res.status(200).json({ username, blogs });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Failed to fetch Hashnode posts", details: error.message });
  }
}
