import React from "react";
import { Box } from "@mui/material";
import Header from "../../Components/Header.jsx";
import { useEffect } from "react";

const Dashboard = () => {

    useEffect(() => {
        document.title = 'Tableau de bord';
      }, []);


    return(
        <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="TABLEAU DE BORD" subtitle="Bienvenu à votre tableau de bord" />
      </Box>
    )
}

export default Dashboard