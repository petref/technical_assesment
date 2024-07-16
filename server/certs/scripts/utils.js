import { join } from "path";
import forge from "node-forge";
import fs from "fs";

// Load RSA keys
export const privateKeyPem = fs.readFileSync(`${join(import.meta.dirname, "../" + process.env.SSL_KEYS_PATH)}privateKey.pem`, 'utf8');
export const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
export const publicKeyPem = fs.readFileSync(`${join(import.meta.dirname, "../" + process.env.SSL_KEYS_PATH)}publicKey.pem`, 'utf8');


export function decryptAESKey(encryptedKey) {
  const encryptedBytes = forge.util.decode64(encryptedKey);
  const decryptedBytes = privateKey.decrypt(encryptedBytes, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
    mgf1: {
      md: forge.md.sha1.create()
    }
  });
  return decryptedBytes;
}

export function decryptMessage(encryptedMessage, aesKey, iv, authTag) {
  const encryptedBytes = forge.util.decode64(encryptedMessage);
  const decipher = forge.cipher.createDecipher('AES-GCM', aesKey);
  decipher.start({
    iv: forge.util.decode64(iv),
    tag: forge.util.decode64(authTag),
  });
  decipher.update(forge.util.createBuffer(encryptedBytes, 'raw'));
  const pass = decipher.finish();
  if (pass) {
    return decipher.output.toString('utf8');
  } else {
    console.error('Decryption failed');
    return null;
  }
}


export function encryptMessageForClient(message, clientPublicKeyPem) {
  const aesKey = forge.random.getBytesSync(32);
  const iv = forge.random.getBytesSync(12);

  const cipher = forge.cipher.createCipher('AES-GCM', aesKey);
  cipher.start({ iv });
  cipher.update(forge.util.createBuffer(message, 'utf8'));
  cipher.finish();
  const encryptedMessage = forge.util.encode64(cipher.output.getBytes());
  const authTag = forge.util.encode64(cipher.mode.tag.getBytes());

  const clientPublicKey = forge.pki.publicKeyFromPem(clientPublicKeyPem);
  const encryptedKey = clientPublicKey.encrypt(aesKey, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
    mgf1: {
      md: forge.md.sha1.create()
    }
  });

  return {
    encryptedMessage,
    encryptedKey: forge.util.encode64(encryptedKey),
    iv: forge.util.encode64(iv),
    authTag,
  };
}
