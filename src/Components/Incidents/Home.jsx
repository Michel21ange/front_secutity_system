import { Box, useTheme, Button } from "@mui/material";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Incidents from "./Incidents";
import Header from "../Header";
import { useEffect } from "react";
const Home=() =>{

    useEffect(() => {
        document.title = 'Liste des incidents';
      }, []);

    const [incidents, setIncidents] = useState(Incidents);
    const handleDelete = (id) =>{
        const index = incidents.findIndex((incident) => incident.id === id);

        if (index !== -1) {
          const updatedIncidents = [...incidents];
          updatedIncidents.splice(index, 1);
          setIncidents(updatedIncidents);
        }
/*             var index = Incidents.map(function(e){
                return e.id
            }).indexOf(id); */

            // Incidents.splice(index);
    }
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        { field: "id", headerName: "ID" },
        {
          field: "gravité",
          headerName: "Gravité",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
          field: "date",
          headerName: "Date",
          type: "number",
          headerAlign: "left",
          align: "left",
        },
        {
          field: "etat_actuel",
          headerName: "Etat actuel",
          flex: 1,
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: (params) => (
            <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(params.row.id)}  
            >
                Supprimer
            </Button>
            ),
        },
      ];

    return (
        <Box m="20px">
        <Header title="LISTE DES INCIDENTS" />
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid checkboxSelection rows={incidents} columns={columns} />
        </Box>
      </Box>
    )
}

export default Home;