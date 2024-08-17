import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt';

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  },
  Variables: {
    authorId?: string,
  }
}>();

// Auth middleware -> for authorization and getting the userId.
// blogRouter.use('/*', async (c, next) => {
//   const token = c.req.header("authorization")?.replace("Bearer ", "");
//   if (!token) {
//     c.status(401);
//     return c.json({
//       msg: "No header found"
//     });
//   }
//   try {
//     const user = await verify(token, c.env.JWT_SECRET);
//     if (!user) {
//       c.status(403);
//       return c.json({
//         msg: "Incorrect Authorization"
//       });
//     }
//     // c.set("authorId", user.id);
//     await next();
//   } catch (e) {
//     c.status(403);
//     console.log("error :: ", e);
//     return c.json({
//       msg: "Error encountered"
//     });
//   }
// });

// Adding a post
blogRouter.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const authorId = c.get("authorId");
  const post = await prisma.posts.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: body.authorId,
      // author:body.author
    }
  });

  if (!post) {
    c.status(402);
    return c.json({
      msg: "Post not created"
    });
  }

  return c.json({
    msg: "Post created!!!"
  });
});

// Updating a post
blogRouter.put('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const post = await prisma.posts.update({
    where: {
      id: body.id
    },
    data: {
      title: body.title,
      content: body.content,
    }
  });

  return c.json({
    id: post.id
  });
});

// Get blogs by author ID
blogRouter.get('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const posts = await prisma.posts.findMany({
      where: {
        authorId: body.id
      }
    });
    return c.json({
      posts
    });
  } catch (e) {
    c.status(403);
    return c.json({
      error: "There was an error fetching blogs, try again later"
    });
  }
});

// Get blogs in bulk
blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const posts = await prisma.posts.findMany({
    include:{
      author: true,

    }
  });
  return c.json({
    posts
  });
});
// Get blog by ID
blogRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param('id'); // Get the ID from request parameters

  try {
    const post = await prisma.posts.findMany({
      where: {
        id: id
      },
      select:{
        id:true,
        date:true,
        title:true,
        content:true,
        author:{
          select:{
            name:true,
          }
        }
      }
    });

    if (!post) {
      c.status(404);
      return c.json({
        msg: "Post not found"
      });
    }

    return c.json({
      post
    });
  } catch (e) {
    console.log(e);
    c.status(403);
    return c.json({
      error: "Error encountered"
    });
  }
});

export default blogRouter;