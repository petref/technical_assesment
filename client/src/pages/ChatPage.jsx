import { useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box } from '@mui/material';

import MessagesArea from '../components/Room/MesssageArea';
import InputArea from '../components/Room/InputArea';
import UsersList from '../components/Room/UsersList';
import { useWebSocket } from '../context/WithWebSocket';
import { useAuth } from '../context/WithAuth';

const ChatPage = () => {
  const { ADD_USER_TO_ROOM, roomData, wsD, roomRef } = useWebSocket();
  const { userNames } = useAuth();
  
  const [searchParams, setSearchParams] = useSearchParams();
  const roomName =  searchParams.get("roomName");
  useEffect(() => {console.log(roomData)}, [roomData])
  useEffect(() => {
    if (wsD) {
      ADD_USER_TO_ROOM(userNames, roomName, wsD);
    }
    
  }, [roomName])


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '90vh' }}>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <MessagesArea roomName={roomRef.current?.roomName} />
        <UsersList users={roomRef.current?.roomUsers || []} />
      </Box>
      <InputArea roomName={roomRef.current?.roomName}/>
    </Box>
  );
};

export default ChatPage;