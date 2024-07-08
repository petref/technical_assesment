import { useState } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../components/topbar/";
import Sidebar from "../components/Sidebar/";

const Layout = () => {
    const [isDrawerOpen, setHandleDrawer] = useState(false);
    
    return (
    <div>
        <Topbar setSideBar={() => setHandleDrawer(!isDrawerOpen)}/>
        <Sidebar setSideBar={() => setHandleDrawer(!isDrawerOpen)} isDrawerOpen={isDrawerOpen}/>
        <Outlet />
    </div>
)};

export default Layout;