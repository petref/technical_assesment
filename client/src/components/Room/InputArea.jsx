import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useWebSocket } from "../../context/WithWebSocket";

const InputArea = ({roomName}) => {
  const [message, setMessage] = useState('');
  const { sendMessage, wsD } = useWebSocket();

  const handleSendMessage = () => {
    wsD(message, roomName); // Replace 'general' with the current room
    setMessage('');
  };

  return (
    <Box sx={{ p: 2, borderTop: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
      <TextField
        variant="outlined"
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSendMessage}
        sx={{ ml: 2, flexShrink: 0 }}
      >
        Send
      </Button>
    </Box>
  );
};

export default InputArea;