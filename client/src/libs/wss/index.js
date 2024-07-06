import forge from 'node-forge';

class WebSocketFacade {
  constructor(url, clientPublicKeyPem, clientPrivateKeyPem) {
    this.url = url;
    this.clientPublicKeyPem = clientPublicKeyPem;
    this.clientPrivateKeyPem = clientPrivateKeyPem;
    this.clientPublicKey = forge.pki.publicKeyFromPem(clientPublicKeyPem);
    this.clientPrivateKey = forge.pki.privateKeyFromPem(clientPrivateKeyPem);
    this.websocket = null;
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
    });
    const { publicKey } = await response.json();
    this.serverPublicKey = forge.pki.publicKeyFromPem(publicKey);
    
    this.websocket = new WebSocket(`${this.url}?token=${token}&publicKey=${JSON.stringify(this.clientPublicKeyPem).replaceAll("+","??")}`);

    this.websocket.onopen = (event) => {
      this.listeners.open.forEach(callback => callback(event));
    };

    this.websocket.onmessage = (event) => {
      const { encryptedMessage } = JSON.parse(event.data);
      const decryptedMessage = this.decrypt(encryptedMessage);
      this.listeners.message.forEach(callback => callback(decryptedMessage));
    };

    this.websocket.onclose = (event) => {
      this.listeners.close.forEach(callback => callback(event));
    };

    this.websocket.onerror = (event) => {
      this.listeners.error.forEach(callback => callback(event));
    };
  }

  send(data) {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      const encryptedData = this.encrypt(data);
      const message = JSON.stringify({
        encryptedMessage: encryptedData,
      });
      this.websocket.send(message);
    } else {
      console.error('WebSocket is not open');
    }
  }

  encrypt(data) {
    const encryptedBytes = this.serverPublicKey.encrypt(forge.util.encodeUtf8(data), 'RSA-OAEP', {
      md: forge.md.sha256.create(),
      mgf1: {
        md: forge.md.sha1.create()
      }
    });
    return forge.util.encode64(encryptedBytes);
  }

  decrypt(data) {
    const encryptedBytes = forge.util.decode64(data);
    const decryptedBytes = this.clientPrivateKey.decrypt(encryptedBytes, 'RSA-OAEP', {
      md: forge.md.sha256.create(),
      mgf1: {
        md: forge.md.sha1.create()
      }
    });
    return forge.util.decodeUtf8(decryptedBytes);
  }

  addEventListener(type, callback) {
    if (this.listeners[type]) {
      this.listeners[type].push(callback);
    } else {
      console.error(`Unsupported event type: ${type}`);
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
    }
  }
}

export default WebSocketFacade;