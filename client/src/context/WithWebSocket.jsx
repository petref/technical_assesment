import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
// import WebSocketFacade from '../libs/wss';
import wSocket, { ADD_USER_TO_ROOM, GET_ROOM } from '../services/wss/index';
import { useAuth } from './WithAuth';


const WebSocketContext = createContext();

export const useWebSocket = () => useContext(WebSocketContext);



export const WebSocketProvider = ({ children }) => {
  const [roomsData, setRooms] = useState(null);
  const [roomData, setRoom] = useState(null);
  const roomRef = useRef(false);

  roomRef.current = roomData;

  const [userData, setUser] = useState(null);
  const [wsD, setWS] = useState(null);

  const { token } = useAuth();




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
        if (!message) return;
        const data = JSON.parse(JSON.stringify(message));
        console.log(data);

        const parsedMessage = JSON.parse(message);
        if (parsedMessage.method == "GET_ROOMS") setRooms(parsedMessage.result);
        if (parsedMessage.method == "GET_USERS") setUser(parsedMessage.result);
        if (parsedMessage.method == "GET_ROOM") {
          setRoom(parsedMessage.result)
        };


        //   console.log(roomsData)
      });

      ws.addEventListener('close', () => {
        console.log('WebSocket connection closed');
      });

      ws.addEventListener('error', (error) => {
        console.error('WebSocket error:', error);
      });

      ws.connect(token)
      setWS(ws);

    }
  }, [token]);

  return (
    <WebSocketContext.Provider value={{ rooms: roomsData, users: userData, roomData, roomRef, ADD_USER_TO_ROOM, GET_ROOM, wsD }}>
      {children}
    </WebSocketContext.Provider>
  );
};
