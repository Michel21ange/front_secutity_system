import './App.css';
import { useState } from "react";
import { Routes, Route,  } from "react-router-dom";
import LoginSignUp from './Components/LoginSignUp/LoginSignUp';
import Dashboard from './Scenes/Dashboard/index';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Sidebar from './Scenes/Global/Sidebar';
import Topbar from './Scenes/Global/Topbar';
import Home from './Components/Incidents/Home';
import CreateAccess from './Components/Access/Create_access/Index';
import ListAccess from './Components/Access/List_access/List_access';
import CreateGuardian from './Components/Guardians/Create_guardian';
import ListGuardian from './Components/Guardians/List_guardian/List_guardian';
import ListUsers from './Components/Users/List_users';


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
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='app'>
        {window.location.pathname !== '/' && <Sidebar isSidebar={isSidebar} />}
          <main className='content'>
          {window.location.pathname !== '/' && <Topbar setIsSidebar={setIsSidebar} />}
            
            <Routes>
              <Route path="/" element={<LoginSignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/incidents" element={<Home />} />
              <Route path="/create_access" element={<CreateAccess />} />
              <Route path="/list_access" element={<ListAccess />} />
              <Route path="/create_guardian" element={<CreateGuardian />} />
              <Route path="/list_guardian" element={<ListGuardian />} />
              <Route path="/list_users" element={<ListUsers />} />
            </Routes>
            
            {/* <RouterProvider router={router}/> */}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );

}

export default App;
