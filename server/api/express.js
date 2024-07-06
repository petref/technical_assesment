import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import https from "https";
import fs from "fs";
const app = express();

app.use(bodyParser.json());
app.use(cors());

const server = https.createServer({
    cert: fs.readFileSync("./certs/sssl/cert.pem"),
    key: fs.readFileSync('./certs/sssl/key.pem'),
    passphrase: "Greutrece@33"
}, app);


export default server;