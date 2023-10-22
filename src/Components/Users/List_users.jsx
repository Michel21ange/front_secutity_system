import { Box, useTheme, Button } from "@mui/material";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Users from "./Users";
import Header from "../Header";
import { useEffect } from "react";
const ListUsers=() =>{

    useEffect(() => {
        document.title = 'Liste des utilisateurs';
      }, []);

    const [users, setIncidents] = useState(Users);
    const handleDelete = (id) =>{
        const index = users.findIndex((user) => user.id === id);

        if (index !== -1) {
          const updatedUsers = [...users];
          updatedUsers.splice(index, 1);
          setIncidents(updatedUsers);
        }
    }
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        { field: "id", headerName: "ID" },
        {
          field: "name",
          headerName: "Nom",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
          field: "surname",
          headerName: "Prenom",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
          field: "access",
          headerName: "Accès",
          flex: 1,
          cellClassName: "name-column--cell",
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
        <Header title="LISTE DES UTILISATEURS" />
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
          <DataGrid checkboxSelection rows={users} columns={columns} />
        </Box>
      </Box>
    )
}

export default ListUsers;