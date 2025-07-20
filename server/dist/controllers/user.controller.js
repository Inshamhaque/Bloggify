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
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.getUser = getUser;
const user_model_1 = require("../models/user.model");
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
