import React, { createContext, useContext, useEffect, useState } from 'react';
// import rooms from '../services/wss/handlers/rooms';
// import WebSocketFacade from '../libs/wss';
import wSocket from '../services/wss/index';
import { useAuth } from './WithAuth';

const WebSocketContext = createContext();

export const useWebSocket = () => useContext(WebSocketContext);


export const WebSocketProvider = ({ children }) => {
  const [roomsData, setRooms] = useState(null);
  const [userData, setUser] = useState(null);

  const {token} = useAuth();

  useEffect(() => {
    if (token) {
      const ws = wSocket(token);

      ws.addEventListener('open', () => {
        console.log('WebSocket connection opened');
      });

      ws.addEventListener('message', (message) => {
        console.log("message");

        // console.log(typeof JSON.parse(message));
        // console.log(JSON.parse(message));

        const parsedMessage = JSON.parse(message);
        console.log(parsedMessage)
        console.log("ok")
        if(parsedMessage.method === "GET_ROOMS") setRooms(parsedMessage.result);
        if(parsedMessage.method === "GET_USERS") setUser(parsedMessage.result);

        //   console.log(roomsData)
      });

      ws.addEventListener('close', () => {
        console.log('WebSocket connection closed');
      });

      ws.addEventListener('error', (error) => {
        console.error('WebSocket error:', error);
      });

      ws.connect(token)

    }
  }, [token]);

  return (
    <WebSocketContext.Provider value={{ rooms: roomsData, users: userData}}>
      {children}
    </WebSocketContext.Provider>
  );
};
