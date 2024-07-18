import { useState } from 'react';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import PowerIcon from '@mui/icons-material/Power';
import PowerOffIcon from '@mui/icons-material/PowerOff';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useWebSocket } from '../../context/WithWebSocket';
import { useTheme } from '@mui/material/styles';



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
    const theme = useTheme();

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
                            <Link to={`/room?roomName=${room?.roomName}`} style={{"textDecoration": "unset", color: theme.palette.primary.main}}>
                                <ListItemButton key={room?._id}>
                                    <ListItemText primary={room?.roomName} />
                                </ListItemButton >
                            </Link>
                        ))
                        : users.map((item, index) => (
                            <ListItemButton key={item?._id} >
                                <ListItemIcon>
                                    {item?.isLoggedIn ? <PowerIcon color={theme.palette.primary.dark} /> : <PowerOffIcon color='secondary.main' />}
                                </ListItemIcon>
                                <ListItemText primary={item?.userName} />
                            </ListItemButton >
                        ))
                    )}
                    {/* {list("left")} */}
                </SwipeableDrawer>
            </>
        </div>
    );
}

export default SwipeableTemporaryDrawer;