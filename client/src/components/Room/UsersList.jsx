import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
// import { useWebSocket } from '../context/WebSocketContext';

const UsersList = ({users}) => {
//   const { users } = useWebSocket();

  return (
    <Box
      sx={{
        flex: 1,
        p: 2,
        borderLeft: { xs: 'none', sm: '1px solid #ccc' },
        overflowY: 'auto',
        height: { xs: '40vh', sm: 'auto' },
      }}
    >
      <Typography variant="h6" gutterBottom>
        Users
      </Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user?._id}>
            <ListItemText primary={user.userName} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UsersList;