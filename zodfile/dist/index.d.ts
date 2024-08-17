import { z } from 'zod';
export declare const signupinput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name: string;
}, {
    email: string;
    password: string;
    name: string;
}>;
export type signupinput = z.infer<typeof signupinput>;
export declare const signininput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type signininput = z.infer<typeof signininput>;
export declare const createblog: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export type createblog = z.infer<typeof createblog>;
export declare const updateBlog: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    id: string;
}, {
    title: string;
    content: string;
    id: string;
}>;
export type updateBlog = z.infer<typeof updateBlog>;
export declare const getBlogbyAuthor: z.ZodObject<{
    authorId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    authorId: string;
}, {
    authorId: string;
}>;
export type getBlogbyAuthor = z.infer<typeof getBlogbyAuthor>;
