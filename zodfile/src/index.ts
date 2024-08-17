import { TypeOf, z } from 'zod';

export const signupinput = z.object({
    email: z.string().email().min(1).max(255),
    password: z.string().min(1).max(255),
    name: z.string()
})
export type signupinput = z.infer<typeof signupinput>

export const signininput = z.object({
    email: z.string().email().min(1).max(255),
    password: z.string().min(1).max(255)
})
export type signininput = z.infer<typeof signininput>

export const createblog = z.object({
    title : z.string(),
    content : z.string()
})
export type createblog = z.infer<typeof createblog>

export const updateBlog = z.object({
    id : z.string(),
    title : z.string(),
    content : z.string()
})
export type updateBlog = z.infer<typeof updateBlog>

export const getBlogbyAuthor = z.object({
    authorId : z.string()
})
export type getBlogbyAuthor = z.infer<typeof getBlogbyAuthor> 