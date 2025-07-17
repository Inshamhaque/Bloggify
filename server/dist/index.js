"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
(0, db_1.connectToDB)();
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
