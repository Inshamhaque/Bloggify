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
exports.auth = auth;
const user_model_1 = require("../models/user.model");
function auth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.authorization;
        console.log(token);
        console.log("authorization header is : ");
        if (!token) {
            return res.json({
                status: 404,
                message: "user not authorized"
            });
        }
        // verify if the token is correct by searching against the db
        const check = yield user_model_1.userModel.findOne({
            access_token: token
        });
        if (!check) {
            return res.json({
                message: "chalaki krro choro",
                status: 404
            });
        }
        // set the userId as githubUserId
        req.userId = check._id;
        next();
    });
}
