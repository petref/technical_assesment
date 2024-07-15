import fs from "fs";
import { join } from 'path';
import { WebSocketServer } from 'ws';
import forge from  'node-forge';
import jwt from "jsonwebtoken";
import { URLSearchParams } from 'url';

import { ACTION_TYPES } from "./wsHandlers/index.js";
import { encryptMessageForClient, decryptAESKey, decryptMessage } from '../../certs/scripts/utils.js';

// Maintain a list of connected clients
const clients = new Map();
const publicKeyPem = fs.readFileSync(`${join(import.meta.dirname, "../../certs/" + process.env.SSL_KEYS_PATH)}publicKey.pem`, 'utf8');

const sendMessage = (message, clientPublicKeyPem) =>  JSON.stringify(encryptMessageForClient(JSON.stringify(message), clientPublicKeyPem));

const webSocket = async (app) => {

    const wss = new WebSocketServer({ server: app });

    wss.on('connection', (ws, req) => {
        const params = new URLSearchParams(req.url.replace('/?', ''));
        const token = params.get('token');
        const clientPublicKeyPem = decodeURIComponent(params.get('clientPublicKeyPem'));
        
        if (!token) {
            ws.close();
            return;
        }
        jwt.verify(token, publicKeyPem, { algorithms: ['RS256'] }, (err, user) => {
            if (err) {
                ws.close();
                return;
            }
            console.log(user)
            //initial data
            // ACTION_TYPES.UPDATE_USER()
            //     .then((res) => ws.send(sendMessage(res, clientPublicKeyPem)));
            ACTION_TYPES.GET_USERS()
                .then((res) => ws.send(sendMessage(res, clientPublicKeyPem)));
            ACTION_TYPES.GET_ROOMS()
                .then((res) => ws.send(sendMessage(res, clientPublicKeyPem)));
            

            try {
                forge.pki.publicKeyFromPem(clientPublicKeyPem);
                clients.set(ws, { user, clientPublicKeyPem });
              } catch (e) {
                console.error('Invalid client public key PEM:', e.message);
                ws.close();
                return;
              }


            ws.on('message', (message) => {
                const { encryptedMessage, encryptedKey, iv, authTag } = JSON.parse(message);
              
                const aesKey = decryptAESKey(encryptedKey);
                const decryptedMessage = JSON.parse(decryptMessage(encryptedMessage, aesKey, iv, authTag));
                if (decryptedMessage) {
                  
                    if (decryptedMessage?.type === 'ping') {
                        return ws.send(sendMessage({ type: 'pong' }, clientPublicKeyPem));
                    }

                    if (decryptedMessage?.params) {
                        if(ACTION_TYPES?.[decryptedMessage?.method]) console.log(decryptedMessage?.method + ": no method available")
                        ACTION_TYPES?.[decryptedMessage?.method](decryptedMessage?.params)
                    }

                    clients.forEach((clientInfo, client) => {
                        // const encryptedResponse = JSON.stringify(encryptMessageForClient(`From ${user.username}: ${JSON.stringify(decryptedMessage)}`, clientInfo.clientPublicKeyPem));
                        client.send(sendMessage(decryptedMessage, clientInfo.clientPublicKeyPem));
                    })
                }
            });

            ws.on('close', () => {
                // delete clientsList[ws];
                console.log('Client disconnected');
            });
        });
    });
}

export default webSocket;