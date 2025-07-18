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
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
(0, db_1.connectToDB)();
// auth checkpoints
app.get("/auth/github", (req, res) => {
    const redirectURL = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user,repo`;
    res.redirect(redirectURL);
});
app.get("/auth/github/callback", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    try {
        const tokenRes = yield axios_1.default.post(`https://github.com/login/oauth/access_token`, {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
        }, {
            headers: { Accept: "application/json" },
        });
        const access_token = tokenRes.data.access_token;
        const userRes = yield axios_1.default.get(`https://api.github.com/user`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        res.redirect(`${process.env.FRONTEND_URL}/loading/?token=${access_token}`);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("GitHub auth failed");
    }
}));
// health checkpoint
app.get('/health', (req, res) => {
    res.send("server is running healthy");
});
// blog routes
app.get('/blogs', (req, res) => {
    // list all blogs
});
app.post('/blog', (req, res) => {
    // create a blog
});
app.get('/blog/:id', (req, res) => {
});
// server listening here
app.listen(3001, () => {
    console.log("server running at 3001");
});
