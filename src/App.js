import './App.css';
import { Routes, Route,  } from "react-router-dom";
import Login from './Components/Login/login';
import Signup from './Components/SignUp/Signup';
import Dashboard from './Scenes/Dashboard/index';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import CreateDriver from './Components/Access/Create_driver/Index';
import ListDriver from './Components/Access/List_driver/List_driver';
import Tracking from './Components/Tracking/tracking';
import DetailCarburant from './Components/DetailCarburant/Detail_carburant';
import DetailMaintenance from './Components/DetailMaintenance/Detail_maintenance';
import DisplayDetCar from './Components/DetailCarburant/display_detail_carburant';
import DisplayDetMaint from './Components/DetailMaintenance/display_detail_maintenance';
import Maps from './Components/Tracking/map';

/* import {
  createBrowserRouter, RouterProvider
} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path:'/',
    element:<div><LoginSignUp/></div>
  },
    {
    path:'/dashboard',
    element:<div><Dashboard/></div>
  }
]) */

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='app'>
          <main className='content'>
            
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tracking" element={<Tracking />} />
              <Route path="/register_driver" element={<CreateDriver />} />
              <Route path="/list_driver" element={<ListDriver />} />
              <Route path="/detail_carburant" element={<DetailCarburant />} />
              <Route path="/display_detail_carburant" element={<DisplayDetCar />} />
              <Route path="/detail_maintenance" element={<DetailMaintenance />} />
              <Route path="/display_detail_maintenance" element={<DisplayDetMaint />} />
              <Route path="/map" element={<Maps />} />
            </Routes>
            
            {/* <RouterProvider router={router}/> */}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );

}

export default App;
