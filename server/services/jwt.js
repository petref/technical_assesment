import jwt from 'jsonwebtoken';
import fs from 'fs';
import { join } from 'path';

const privateKey = fs.readFileSync(`${join(import.meta.dirname, "../certs/" + process.env.SSL_KEYS_PATH)}privateKey.pem`, 'utf8');
const generateToken = (user) => {
console.log(privateKey)

  return jwt.sign(user, privateKey, { algorithm: 'RS256', expiresIn: '1h' });
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, privateKey, { algorithms: ['RS256'] }, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
export { generateToken, authenticateToken };