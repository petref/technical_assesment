import { generateToken } from "../services/jwt.js";
import getDB from "../database/index.js";

const auth = async (req, res) => {
    const { username, password } = req.body;
    // Validate user credentials (in a real application, you should check against a database)
    const db = getDB.getDB("users");
    const users = db.collection("users");
   

    const user = await users.find({$and: [{userName: username},{password}]}).toArray();

    if(!user?.[0]) return res.sendStatus(403);

    if (user[0]?.userName === username && user[0]?.password === password ) {
        const user = { username };
        const token = generateToken({username});
        await users.findOneAndUpdate({userName: username}, {$set: {isLoggedIn: true}})
        res.json({ token });
    } else {
        res.sendStatus(403);
    }
}

const logOut = async (req, res) => {
    const { username } = req.body;

    const db = getDB.getDB("users");
    const users = db.collection("users");
    const user = await users.find({userName: username}).toArray();

    if (user) {
        await users.findOneAndUpdate({userName: username}, {$set: {isLoggedIn: false}})
    };

    res.sendStatus(200)

}

export {
    auth,
    logOut,
}