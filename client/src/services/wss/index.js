
import WebSocketFacade from '../../libs/wss';
import forge from 'node-forge';
// Generate client key pair
const clientKeypair = forge.pki.rsa.generateKeyPair(2048);
const clientPublicKeyPem = forge.pki.publicKeyToPem(clientKeypair.publicKey);
const clientPrivateKeyPem = forge.pki.privateKeyToPem(clientKeypair.privateKey);

const wSocket = (token) => new WebSocketFacade(
    `wss://localhost:8080?token=${token}&clientPublicKeyPem=${encodeURIComponent(clientPublicKeyPem)}`, 
    clientPublicKeyPem,
    clientPrivateKeyPem,
);

export default wSocket;