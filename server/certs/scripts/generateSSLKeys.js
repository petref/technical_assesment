import { join } from "node:path";
import { fileURLToPath } from 'url';
import forge from "node-forge";
import fs from "fs";
import path from "path";
import "dotenv/config";

const keypair = forge.pki.rsa.generateKeyPair(2048);

const publicKeyPem = forge.pki.publicKeyToPem(keypair.publicKey);
const privateKeyPem = forge.pki.privateKeyToPem(keypair.privateKey);

// const __dirname = dirname(fileURLToPath(import.meta.url));

fs.writeFileSync(`${join(import.meta.dirname, process.env.SSL_KEYS_PATH)}publicKey.pem`, publicKeyPem);
fs.writeFileSync(`${join(import.meta.dirname, process.env.SSL_KEYS_PATH)}privateKey.pem`, privateKeyPem);

console.log('Server keys generated and saved to publicKey.pem and privateKey.pem');