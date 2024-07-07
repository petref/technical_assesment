import express from "express";
import {auth} from "../controllers/auth.js";
import { authenticateToken } from "../services/jwt.js"

import { publicKeyPem } from "../certs/scripts/utils.js";


const router = express.Router();

router.post('/login', auth);

router.get('/public-key', authenticateToken, (req, res) => {
    res.json({ publicKey: publicKeyPem });
});

export default router;