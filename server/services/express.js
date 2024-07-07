import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import https from "https";

import fs from "fs";
import 'dotenv/config'

import authRoutes from "../routes/auth.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/', authRoutes);

const server = https.createServer({
    cert: fs.readFileSync("./certs/ssl/cert.pem"),
    key: fs.readFileSync('./certs/ssl/key.pem'),
    passphrase: process.env.SSL_PASS,
}, app);



export default server;