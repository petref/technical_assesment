import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
// import { useWebSocket } from '../context/WebSocketContext';

const MessagesArea = ({roomName}) => {
//   const { messages } = useWebSocket();

  return (
    <Box
      sx={{
        flex: 2,
        p: 2,
        borderRight: { xs: 'none', sm: '1px solid #ccc' },
        overflowY: 'auto',
        height: { xs: '60vh', sm: 'auto' },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {roomName}
      </Typography>
      <List>
        {/* {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText primary={msg.text} secondary={msg.user} />
          </ListItem>
        ))} */}
      </List>
    </Box>
  );
};

export default MessagesArea;