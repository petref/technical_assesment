import express from "express";
import {auth, logOut} from "../controllers/auth.js";
import { authenticateToken } from "../services/jwt.js"

import { publicKeyPem } from "../certs/scripts/utils.js";


const router = express.Router();

router.post('/login', auth);
router.post('/logout', logOut);


router.get('/public-key', authenticateToken, (req, res) => {
    res.json({ publicKey: publicKeyPem });
});

export default router;