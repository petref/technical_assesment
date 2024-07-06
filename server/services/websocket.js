import {WebSocketServer} from 'ws';
import jwt from "jsonwebtoken";
import { URLSearchParams } from 'url';

import fs from "fs";
import { join } from 'path';

import { decryptMessage, encryptMessage } from '../certs/scripts/utils.js';
let clientsList = {};


const publicKeyPem = fs.readFileSync(`${join(import.meta.dirname, "../certs/" + process.env.SSL_KEYS_PATH)}publicKey.pem`, 'utf8');

const webSocket = async (app) => {

    const wss = new WebSocketServer({server: app});
    
    
    wss.on('connection', (ws, req) => {
        let clientPublicKey = new URLSearchParams(req.url);
        const params = new URLSearchParams(req.url.replace('/?', ''));
        const token = params.get('token');
        clientPublicKey = JSON.parse(clientPublicKey.get("publicKey")).replaceAll("??", "+");
    
      
        if (!token) {
            ws.close();
            return;
        }
    
        jwt.verify(token, publicKeyPem, { algorithms: ['RS256'] }, (err, user) => {
            if (err) {
                ws.close();
                return;
            }
    
            clientsList = {
                ...clientsList,
                [JSON.stringify(clientPublicKey)]: ws
            }
    
    
            ws.on('message', (message) => {
                const { encryptedMessage } = JSON.parse(message);
                const decryptedMessage = decryptMessage(encryptedMessage);
              
    
                if (decryptedMessage) {
                    // if(!clients.has(JSON.stringify(clientPublicKeyPem)))  clients.add( {[JSON.stringify(clientPublicKeyPem)]: ws})
    
                    Object.keys(testD).forEach((clientPubKey) => {
                        const encryptedResponse = encryptMessage(`Echo: ${decryptedMessage}`, JSON.parse(clientPubKey));
                        // ws.send(JSON.stringify({ encryptedMessage: encryptedResponse }));
                        testD[clientPubKey].send(JSON.stringify({ encryptedMessage: encryptedResponse }))
                    })
                }
            });
    
            ws.on('close', () => {
                console.log('Client disconnected');
            });
        });
    });
}

export default webSocket;