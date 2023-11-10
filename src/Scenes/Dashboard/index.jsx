import React from "react";
import { Box } from "@mui/material";
import Header from "../../Components/Header.jsx";
import { useEffect, useState } from "react";
import Sidebar from "../Global/Sidebar.jsx";
import Topbar from "../Global/Topbar.jsx";

const Dashboard = () => {
  const [isSidebar, setIsSidebar] = useState(true);

    useEffect(() => {
        document.title = 'Tableau de bord';
      }, []);


    return(
      <>
      <div className="app">
      <Sidebar isSidebar={isSidebar} />
      
      <main className='content'>
      <Topbar setIsSidebar={setIsSidebar} />
     
      
        <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="TABLEAU DE BORD" subtitle="Bienvenu à votre tableau de bord" />
      </Box>
      </main>
      </div>

      </>
      
    )
}

export default Dashboard