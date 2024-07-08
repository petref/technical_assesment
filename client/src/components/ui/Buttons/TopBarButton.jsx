import { IconButton } from "@mui/material";

const TopBarButton = ({ setSideBar, icon }) => {
    return (
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={setSideBar}
          >
            {icon}
          </IconButton>
    )
}

export default TopBarButton;