import { generateToken } from "../services/jwt.js";

const auth = (req, res) => {
    const { username, password } = req.body;
    // Validate user credentials (in a real application, you should check against a database)
    if (username === 'user' && password === 'password') {
        const user = { username };
        const token = generateToken(user);
        res.json({ token });
    } else {
        res.sendStatus(403);
    }
}

export {
    auth,
}