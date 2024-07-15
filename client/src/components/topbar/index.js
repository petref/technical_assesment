import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import AddCommentIcon from '@mui/icons-material/AddComment';
import AddNewRoomModal from "../Room/AddNewRoomModal";
import { useAuth } from '../../context/WithAuth';


import DarkModeButtons from "./DarkModeButtons";
import { TopBarButton } from '../ui/Buttons';


import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';



export default function Topbar ({ setSideBar }) {
  const {token} = useAuth;
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAddRoomOpen, setAddRoomModal] = useState(false)

  const handleAddRoomModal = (isOpen) => setAddRoomModal(isOpen || !isAddRoomOpen);


  useEffect(() => {
    setAuth(token);

  },[token])



  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <TopBarButton setSideBar={setSideBar} icon={<MenuIcon/>}/>
          <TopBarButton 
            setSideBar={handleAddRoomModal} 
            icon={<AddCommentIcon/>} 
            text="chatroom"
          />
          <Box component="div" sx={{ flexGrow: 1 }}>
          </Box>
          <DarkModeButtons />
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <AddNewRoomModal handleOpen={() => handleAddRoomModal()} isOpen={isAddRoomOpen} />
    </Box>
  );
}
