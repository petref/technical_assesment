import { IconButton, Typography } from "@mui/material";

const TopBarButton = ({ setSideBar, icon, text }) => {
    return (
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={setSideBar}
          >
            <div style={{display: "flex", flexDirection:"column"}}>
            {icon} 
            <Typography
              variant="h6"
              fontSize="0.8rem"
            >
              {text}
            </Typography>
            </div>
          </IconButton>
    )
}

export default TopBarButton;