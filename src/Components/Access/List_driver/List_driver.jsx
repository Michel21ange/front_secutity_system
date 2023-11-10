import React, { useState, useEffect } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { db } from "../../../firebase_config";
import Header from "../../Header";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"; // Import deleteDoc to delete documents
import { tokens } from "../../../theme";

const ListDriver = () => {
  const [drivers, setDrivers] = useState([]); // Use an array to store drivers

  const getDrivers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const driverData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDrivers(driverData);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  useEffect(() => {
    getDrivers();
    document.title = "Liste des chauffeurs";
  }, []);

  const handleDelete = async (id) => {
    try {
      // Find the driver with the given ID
      const driverToDelete = drivers.find((driver) => driver.id === id);
  
      if (driverToDelete) {
        // Delete the driver document from Firestore
        await deleteDoc(doc(db, "users", id));
  
        // Remove the deleted driver from the local state
        setDrivers((prevDrivers) =>
          prevDrivers.filter((driver) => driver.id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "carName",
      headerName: "Nom de la voiture",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "fistName",
      headerName: "Prenom",
      flex: 1,
      align: "left",
    },
    {
      field: "lastName",
      headerName: "Nom",
      flex: 1,
      align: "left",
    },
    {
      field: "immatriculation",
      headerName: "Immatriculation",
      flex: 1,
      align: "left",
    },
    {
      field: "oil",
      headerName: "Niveau d'huile",
      flex: 1,
      align: "left",
    },
    {
      field: "places",
      headerName: "Nombre de places",
      flex: 1,
    },
    {
      field: "speed",
      headerName: "Vitesse",
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
      <Header title="LISTE DES CHAUFFEURS" />
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
        <DataGrid checkboxSelection rows={drivers} columns={columns} />
        <Box display="flex" justifyContent="end" mt="20px">
          <a href="/register_driver"><Button color="secondary" variant="contained" style={{ backgroundColor: 'red', color: 'white' }}>
            Retour
          </Button></a>
        </Box>
      </Box>
    </Box>
  );
};

export default ListDriver;
