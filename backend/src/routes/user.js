import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { sign } from 'hono/jwt';
import { signininput, signupinput } from '@haqueinsham/medium';
// import { signupinput } from '@100xdevs/medium-common'
// import { signininput } from '@haqueinsham/project'
// Create the main Hono app
const userRouter = new Hono();
//sign-up route with authentication 
userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    try {
        const { success } = signupinput.safeParse(body);
        if (!success) {
            return c.json({ error: 'Invalid input' }, 400);
        }
        const user = await prisma.users.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name
            }
        });
        const jwt = await sign({ user }, c.env.JWT_SECRET);
        return c.json({ jwt });
    }
    catch (e) {
        console.log("error :", e);
        c.status(403);
        return c.json({ error: "error while signing up" });
    }
});
//sign-in route 
userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    try {
        const { success } = signininput.safeParse(body);
        if (!success) {
            return c.json({ error: 'Invalid input' }, 400);
        }
        // Find user by email
        const user = await prisma.users.findUnique({
            where: {
                email: body.email,
            },
        });
        if (!user) {
            c.status(404);
            return c.json({ error: "User not found" });
        }
        // Verify password
        // const isValid = await verify(body.password, user.password);
        // if (!isValid) {
        // 	c.status(403);
        // 	return c.json({ error: "Invalid password" });
        // 	}
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({
            jwt,
            msg: `Welcome ${user.name}`,
        });
    }
    catch (e) {
        console.error("Error during sign-in:  ", e);
        c.status(500);
        return c.json({ error: "Error while signing in" });
    }
});
export default userRouter;
