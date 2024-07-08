import { useState } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../components/topbar/";
import Sidebar from "../components/Sidebar/";

const Layout = () => {
    const [isDrawerOpen, setHandleDrawer] = useState(false);
    const toggleDrawer = (open) => (event) => {
        if (
          event &&
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
        ) {
          return;
        }
    
      };
    return (
    <div>
        <Topbar setSideBar={() => setHandleDrawer(!isDrawerOpen)}/>
        <Sidebar setSideBar={() => setHandleDrawer(!isDrawerOpen)} isDrawerOpen={isDrawerOpen}/>
        <Outlet />
    </div>
)};

export default Layout;