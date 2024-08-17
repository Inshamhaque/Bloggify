"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogbyAuthor = exports.updateBlog = exports.createblog = exports.signininput = exports.signupinput = void 0;
const zod_1 = require("zod");
exports.signupinput = zod_1.z.object({
    email: zod_1.z.string().email().min(1).max(255),
    password: zod_1.z.string().min(1).max(255),
    name: zod_1.z.string()
});
exports.signininput = zod_1.z.object({
    email: zod_1.z.string().email().min(1).max(255),
    password: zod_1.z.string().min(1).max(255)
});
exports.createblog = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string()
});
exports.updateBlog = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string(),
    content: zod_1.z.string()
});
exports.getBlogbyAuthor = zod_1.z.object({
    authorId: zod_1.z.string()
});
