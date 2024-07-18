import forge from 'node-forge';

class WebSocketFacade {
  constructor(url, clientPublicKeyPem, clientPrivateKeyPem) {
    this.url = url;
    this.clientPublicKeyPem = clientPublicKeyPem;
    this.clientPrivateKeyPem = clientPrivateKeyPem;
    this.clientPublicKey = forge.pki.publicKeyFromPem(clientPublicKeyPem);
    this.clientPrivateKey = forge.pki.privateKeyFromPem(clientPrivateKeyPem);
    this.websocket = null;
    this.token = null;
    this.pingInterval = null;
    this.reconnectInterval = null;
    this.listeners = {
      open: [],
      message: [],
      close: [],
      error: []
    };
  }

  async connect(token) {
    const response = await fetch('https://localhost:8080/public-key', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }).catch((err) => console.log(err));

    const { publicKey } = await response.json();

    this.serverPublicKey = publicKey;
    this.token = token;
    this.websocket = new WebSocket(`${this.url}?token=${token}&clientPublicKeyPem=${encodeURIComponent(this.clientPublicKeyPem)}`);

    this.websocket.onopen = (event) => {
 
      console.log('WebSocket connection opened');
      this.listeners.open.forEach(callback => callback(event));
      this.startPing();
    };

    this.websocket.onmessage = async (message) => {
      if (!message?.data) return

      const decryptedMessage = this.decryptMessage(message.data);
      // console.log("dec +++++" + JSON.parse(JSON.stringify(decryptedMessage)))
      this.listeners.message.forEach(callback => callback(decryptedMessage));

    };

    this.websocket.onclose = (event) => {

      console.log('WebSocket connection closed');
      this.listeners.close.forEach(callback => callback(event));
      this.stopPing();
      this.reconnect();
    };


    this.websocket.onerror = (event) => {
      console.error('WebSocket error:', event);
      // this.listeners.error.forEach(callback => callback(event));
    };

    return this.websocket;
  }

  send(data) {
    const encryptedPayload = this.encryptMessage(data);
    this.websocket.send(JSON.stringify(encryptedPayload));
  }
  decryptMessage = (data) => {
    try {
      const { encryptedMessage, encryptedKey, iv, authTag } = JSON.parse(data);
      const encryptedKeyBytes = forge.util.decode64(encryptedKey);
      const aesKeyBytes = this.clientPrivateKey.decrypt(encryptedKeyBytes, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
        mgf1: {
          md: forge.md.sha1.create()
        }
      });

      const decipher = forge.cipher.createDecipher('AES-GCM', aesKeyBytes);
      decipher.start({
        iv: forge.util.decode64(iv),
        tag: forge.util.decode64(authTag),
      });
      decipher.update(forge.util.createBuffer(forge.util.decode64(encryptedMessage), 'raw'));
      const pass = decipher.finish();
      if (pass) {
        return decipher.output.toString('utf8');
      } else {
        console.error('Decryption failed');
        return null;
      }
    } catch (error) {
      console.error('Decryption error:', error);
      return null;
    }
  };

  encryptMessage = (message) => {
    const aesKey = forge.random.getBytesSync(32);
    const iv = forge.random.getBytesSync(12);

    const cipher = forge.cipher.createCipher('AES-GCM', aesKey);
    cipher.start({ iv });
    cipher.update(forge.util.createBuffer(message, 'utf8'));
    cipher.finish();
    const encryptedMessage = forge.util.encode64(cipher.output.getBytes());
    const authTag = forge.util.encode64(cipher.mode.tag.getBytes());

    const serverPublicKey = forge.pki.publicKeyFromPem(this.serverPublicKey);
    const encryptedKey = serverPublicKey.encrypt(aesKey, 'RSA-OAEP', {
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
  };


  addEventListener(type, callback) {
    if (this.listeners[type]) {
      this.listeners[type].push(callback);
    } else {
      console.error(`Unsupported event type: ${type}`);
    }
  }

  startPing() {
    this.pingInterval = setInterval(() => {
      if (this.websocket.readyState === WebSocket.OPEN) {
        this.send(JSON.stringify({ type: "ping" }));
      }
    }, 50000);
  }

  stopPing() {
    clearInterval(this.pingInterval);
    this.pingInterval = null;
  }

  reconnect() {
    if (!this.reconnectInterval) {
      this.reconnectInterval = setInterval(() => {
        console.log('Attempting to reconnect...');
        this.connect(this.token);
      }, 5000); // Try to reconnect every 5 seconds
    }
  }

  removeEventListener(type, callback) {
    if (this.listeners[type]) {
      const index = this.listeners[type].indexOf(callback);
      if (index !== -1) {
        this.listeners[type].splice(index, 1);
      }
    } else {
      console.error(`Unsupported event type: ${type}`);
    }
  }

  close() {
    if (this.websocket) {
      this.websocket.close();
      clearInterval(this.reconnectInterval);
    }
  }
}

export default WebSocketFacade;