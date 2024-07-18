
import WebSocketFacade from '../../libs/wss';
import forge from 'node-forge';
import rooms from './handlers/rooms';

// Generate client key pair
const clientKeypair = forge.pki.rsa.generateKeyPair(2048);
const clientPublicKeyPem = forge.pki.publicKeyToPem(clientKeypair.publicKey);
const clientPrivateKeyPem = forge.pki.privateKeyToPem(clientKeypair.privateKey);

const wSocket = (token) => new WebSocketFacade(
    `wss://localhost:8080?token=${token}&clientPublicKeyPem=${encodeURIComponent(clientPublicKeyPem)}`,
    clientPublicKeyPem,
    clientPrivateKeyPem,
);

export const ADD_USER_TO_ROOM = async (user, roomName, wSock) => {
    await wSock.send(rooms.addUserToRoom(user, roomName))
};

export const GET_ROOM = async (roomName, wSock) => {
    await wSock.send(rooms.getRoom(roomName));
};


export default wSocket;