"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlog = createBlog;
exports.getAllBlogs = getAllBlogs;
exports.getUserBlogs = getUserBlogs;
exports.getBlogbyId = getBlogbyId;
exports.editBlog = editBlog;
exports.getBlogs = getBlogs;
const blog_model_1 = require("../models/blog.model");
const mongoose_1 = __importDefault(require("mongoose"));
function createBlog(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, subtitle, content, userId } = req.body;
        try {
            const newBlog = yield blog_model_1.blogModel.create({
                user: req.userId,
                title,
                subtitle,
                content
            });
            return res.status(201).json({ blog: newBlog });
        }
        catch (error) {
            return res.status(500).json({ message: "Failed to create blog", error });
        }
    });
}
function getAllBlogs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const blogs = yield blog_model_1.blogModel.find().populate("user");
            if (!blogs) {
                return res.json({
                    message: "Not blogs found",
                    status: 411
                });
            }
            return res.json({
                message: "blogs fetched successfully",
                blogs,
                status: 200
            });
        }
        catch (e) {
            return res.json({
                message: "some error occurred",
                status: 500
            });
        }
    });
}
function getUserBlogs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        try {
            const blogs = yield blog_model_1.blogModel.find({ user: userId }).populate("user", "name email");
            return res.status(200).json({ blogs });
        }
        catch (error) {
            return res.status(500).json({ message: "Failed to fetch user blogs", error });
        }
    });
}
function getBlogbyId() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
function editBlog() {
    return __awaiter(this, void 0, void 0, function* () {
        // }
        // export async function deleteBlog(){
    });
}
function getBlogs() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
