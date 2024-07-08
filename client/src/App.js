import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WebSocketFacade from './libs/wss';
import forge from 'node-forge';
import { Route, Routes } from "react-router-dom";

import Layout from './layout';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import NotFound from './pages/NotFound';
import ProtectedRoute from './HOC/withProtectedRoute';

// Generate client key pair
const clientKeypair = forge.pki.rsa.generateKeyPair(2048);
const clientPublicKeyPem = forge.pki.publicKeyToPem(clientKeypair.publicKey);
const clientPrivateKeyPem = forge.pki.privateKeyToPem(clientKeypair.privateKey);


const App = () => {
  const [token, setToken] = useState(null);
  const [wsFacade, setWsFacade] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (token) {
      const ws = new WebSocketFacade('wss://localhost:8080', clientPublicKeyPem, clientPrivateKeyPem);

      ws.addEventListener('open', () => {
        console.log('WebSocket connection opened');
      });

      ws.addEventListener('message', (message) => {
        setMessages(prevMessages => [...prevMessages, message]);
      });

      ws.addEventListener('close', () => {
        console.log('WebSocket connection closed');
      });

      ws.addEventListener('error', (error) => {
        console.error('WebSocket error:', error);
      });

      ws.connect(token);
      setWsFacade(ws);
    }
  }, [token]);

  const handleLogin = async () => {
    const response = await axios.post('https://localhost:8080/login', {
      username: 'user',
      password: 'password'
    });
    setToken(response.data.token);
  };

  const handleSendMessage = () => {
    if (wsFacade) {
      wsFacade.send(input);
      setInput('');
    }
  };

  return (
    <div>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route exact element={<ProtectedRoute />} />
              <Route path='/dashboard' element={<Dashboard />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {/* {!token && <button onClick={handleLogin}>Login</button>}
      {token && (
        <div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default App;