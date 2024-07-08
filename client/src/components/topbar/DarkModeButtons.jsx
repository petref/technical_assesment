import { useDarkMode } from '../../libs/materialui/DarkModeContext';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { TopBarButton } from '../ui/Buttons';


const DarkModeButtons = () => {
    const { darkMode, toggleDarkMode } = useDarkMode();
    return (darkMode) 
      ? (<TopBarButton setSideBar={()=>toggleDarkMode()} icon={<SettingsBrightnessIcon />}/>)
      : (<TopBarButton setSideBar={()=>toggleDarkMode()} icon={<Brightness4Icon />}/>)
      
  }

export default DarkModeButtons