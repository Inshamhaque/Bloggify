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
<<<<<<< HEAD
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlog = createBlog;
exports.getAllBlogs = getAllBlogs;
exports.getUserBlogs = getUserBlogs;
const blog_model_1 = require("../models/blog.model");
const mongoose_1 = __importDefault(require("mongoose"));
function createBlog(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, subtitle, content, userId } = req.body;
        if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        try {
            const newBlog = yield blog_model_1.blogModel.create({
                user: userId,
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
            const blogs = yield blog_model_1.blogModel.find().populate("user", "name email avatarUrl");
            return res.status(200).json({ blogs });
        }
        catch (error) {
            return res.status(500).json({ message: "Failed to fetch blogs", error });
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
=======
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlog = createBlog;
exports.editBlog = editBlog;
exports.deleteBlog = deleteBlog;
exports.getBlogs = getBlogs;
function createBlog() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
function editBlog() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
function deleteBlog() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
function getBlogs() {
    return __awaiter(this, void 0, void 0, function* () {
>>>>>>> 0a752a40dbf57b779b739c6ba8c879cc3dded78a
    });
}
