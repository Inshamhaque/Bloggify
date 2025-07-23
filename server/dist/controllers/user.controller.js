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
exports.login = login;
exports.getUser = getUser;
exports.getProfile = getProfile;
exports.distinguishUser = distinguishUser;
const user_model_1 = require("../models/user.model");
const axios_1 = __importDefault(require("axios"));
// this will be required in the first time only
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, name, githubUsername, email, avatarUrl, bio, access_token } = req.body;
            const user = yield user_model_1.userModel.findOne({
                githubUserid: id
            });
            // if user exists then also, update the token ... 
            if (user) {
                yield user.updateOne({
                    access_token
                });
            }
            // if it was created, then just create with the first token
            else {
                user_model_1.userModel.create({
                    githubUserid: id,
                    githubUsername,
                    name,
                    email,
                    bio,
                    avatarUrl,
                    access_token
                });
            }
            return res.json({
                status: 201,
                message: "user logged in successfully"
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
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.body;
        const findUser = yield user_model_1.userModel.findOne({
            githubUserid: userId
        });
        if (!findUser) {
            return res.json({
                message: "user not found",
                status: 500
            });
        }
        return res.json({
            message: "user found",
            profile: findUser,
            status: 200
        });
    });
}
function getProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username } = req.body;
        try {
            //fetch the latest access token
            const user = yield user_model_1.userModel.findOne({
                githubUsername: username
            }).select("access_token");
            const access_token = user === null || user === void 0 ? void 0 : user.access_token;
            // fetch the profile from github api
            const response = yield axios_1.default.get("https://api.github.com/user", {
                headers: {
                    Authorization: `Bearer ${access_token} `,
                    Accept: "application/vnd.github+json",
                }
            });
            console.log(response.data);
            return res.json({
                data: response.data,
                status: 200
            });
        }
        catch (e) {
            return res.json({
                message: "error fetching profile",
                status: 500
            });
        }
    });
}
function distinguishUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.authorization;
        const { username } = req.body;
        console.log("Authorization Token:", token);
        console.log("Requested Username:", username);
        if (!token) {
            return res.json({
                status: 404,
                message: "User not authorized",
            });
        }
        // ✅ Match both access_token and username
        const check = yield user_model_1.userModel.findOne({
            access_token: token,
            githubUsername: username, // Assuming 'username' is stored in DB
        });
        if (!check) {
            return res.json({
                viewer: "visitor",
                status: 200,
            });
        }
        return res.json({
            viewer: "owner",
            status: 200,
        });
    });
}
