import { Box, useTheme, Button } from "@mui/material";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Gardien from "./Guardian";
import Header from "../../Header";
import { useEffect } from "react";
const ListGuardian=() =>{

    useEffect(() => {
        document.title = 'Liste des gardiens';
      }, []);

    const [guardian, setGuardian] = useState(Gardien);
    const handleDelete = (id) =>{
        const index = guardian.findIndex((guardian) => guardian.id === id);

        if (index !== -1) {
          const updatedGuardian = [...guardian];
          updatedGuardian.splice(index, 1);
          setGuardian(updatedGuardian);
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
          field: "name",
          headerName: "Nom",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
          field: "age",
          headerName: "Age",
          flex: 1,
          align: "left",
        },
        {
          field: "identification",
          headerName: "Identification",
          flex: 1,
        },
        {
          field: "numero",
          headerName: "Numéro de téléphone",
          flex: 1,
        },
        {
          field: "email",
          headerName: "Email",
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
        <Header title="LISTE DES GARDIENS" />
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
          <DataGrid checkboxSelection rows={guardian} columns={columns} />
        </Box>
      </Box>
    )
}

export default ListGuardian;