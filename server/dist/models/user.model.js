"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = exports.userSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.userSchema = new mongoose_1.default.Schema({
    githubUserid: {
        type: String, // better wud be to change to Number as oAuth sends that only 
        required: true,
        uniqe: true,
    },
    name: {
        type: String,
        required: true
    },
    githubUsername: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
    },
    avatarUrl: {
        type: String,
    },
    bio: {
        type: String,
        default: "",
    },
    access_token: {
        type: String,
        required: true
    }
});
exports.userModel = mongoose_1.default.model("User", exports.userSchema);
