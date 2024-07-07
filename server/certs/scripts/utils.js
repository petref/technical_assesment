import { join } from "path";
import forge from "node-forge";
import fs from "fs";

// Load RSA keys
export const privateKeyPem = fs.readFileSync(`${join(import.meta.dirname, "../" + process.env.SSL_KEYS_PATH)}privateKey.pem`, 'utf8');
export const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
export const publicKeyPem = fs.readFileSync(`${join(import.meta.dirname, "../" + process.env.SSL_KEYS_PATH)}publicKey.pem`, 'utf8');


export function decryptMessage(encryptedMessage) {
    try {
        const encryptedBytes = forge.util.decode64(encryptedMessage);
        const decryptedBytes = privateKey.decrypt(encryptedBytes, 'RSA-OAEP', {
            md: forge.md.sha256.create(),
            mgf1: {
                md: forge.md.sha1.create()
            }
        });
        return forge.util.decodeUtf8(decryptedBytes);
    } catch (error) {
        console.error('Decryption error:', error);
        return null;
    }
}

export function encryptMessage(message, clientPublicKeyPem) {
    const clientPublicKey = forge.pki.publicKeyFromPem(clientPublicKeyPem);
    const encryptedBytes = clientPublicKey.encrypt(forge.util.encodeUtf8(message), 'RSA-OAEP', {
        md: forge.md.sha256.create(),
        mgf1: {
            md: forge.md.sha1.create()
        }
    });
    return forge.util.encode64(encryptedBytes);
}