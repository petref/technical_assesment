import { useState } from 'react';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useWebSocket } from '../../context/WithWebSocket';



const TabButton = styled(Button)(({ theme }) => ({
    flex: 1,
    borderRadius: 0,
}));


const ButtonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
}));

const SwipeableTemporaryDrawer = ({ setSideBar, isDrawerOpen }) => {

    const [selectedList, setSelectedList] = useState('list1');
    const { rooms, users } = useWebSocket();

    const handleListChange = (list) => {
        setSelectedList(list);
    };

    const toggleDrawer = () => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        // setState({ ...state, [anchor]: open });
        setSideBar()
    };

    const list = (anchor) => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    return (
        <div>
            <>
                <SwipeableDrawer
                    anchor="left"
                    open={isDrawerOpen}
                    onClose={toggleDrawer()}
                    onOpen={toggleDrawer()}
                >
                    <ButtonContainer>
                        <TabButton
                            variant={selectedList === 'list1' ? 'contained' : 'outlined'}
                            onClick={() => handleListChange('list1')}
                        >
                            Camere
                        </TabButton>
                        <TabButton
                            variant={selectedList === 'list2' ? 'contained' : 'outlined'}
                            onClick={() => handleListChange('list2')}
                        >
                            Utilizatori
                        </TabButton>
                    </ButtonContainer>
                        {(rooms && users) && (selectedList === 'list1'
                            ? rooms.map((room) => (
                                <ListItem button key={room._id}>
                                    <ListItemText primary={room.roomName} />
                                </ListItem>
                            ))
                            : users.map((item, index) => (
                                <ListItem button key={item._id}>
                                    <ListItemText primary={item.name} />
                                </ListItem>
                            ))
                        )}
                    {/* {list("left")} */}
                </SwipeableDrawer>
            </>
        </div>
    );
}

export default SwipeableTemporaryDrawer;