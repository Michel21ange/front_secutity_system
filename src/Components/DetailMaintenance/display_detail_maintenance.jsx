import React, { useState, useEffect, useCallback } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { db } from "../../firebase_config";
import Header from "../Header";
import { collection, getDocs } from "firebase/firestore"; // Import deleteDoc to delete documents
import { tokens } from "../../theme";

const calculateTotalPrice = (details) => {
  let totalPrice = 0;
  details.forEach((detail) => {
    const price = parseFloat(detail.price); // Convertir en nombre
    if (!isNaN(price)) {
      totalPrice += price;
    }
  });
  ;
  return totalPrice;
};

const DisplayDetMaint = () => {
  const [details, setDetails] = useState([]); // Use an array to store drivers
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedUID, setSelectedUID] = useState(null);

  const getDetails =  useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "maintenances"));
      const detailData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const filteredDetails = selectedUID
      ? detailData.filter((detail) => detail.userID === selectedUID)
      : detailData;
      setDetails(filteredDetails);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  }, [selectedUID]);

  useEffect(() => {
    getDetails();
    document.title = "Details de la maintenance";
    setTotalPrice(calculateTotalPrice(details));
  }, [getDetails, details]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    {
      field: "notes",
      headerName: "Notes",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "numFacture",
      headerName: "Numéro de facture",
      flex: 1,
      align: "left",
    },
    {
      field: "price",
      headerName: "Prix",
      flex: 1,
      align: "left",
    },
    {
      field: "userID",
      headerName: "User id",
      flex: 1,
      align: "left",
    },
  ];

  return (
    <Box m="20px">
      <Header title="DETAILS DES MAINTENANCES" />
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
        <DataGrid checkboxSelection rows={details} columns={columns} />
        <Box mt="20px">
  <strong>Total des prix : {totalPrice} F CFA</strong>
</Box>
<Box>
  <label>Sélectionner un UID : </label>
  <select
    value={selectedUID}
    onChange={(e) => setSelectedUID(e.target.value)}
  >
    <option value="">Tous les UID</option>
    {[...new Set (details.map((detail) => detail.userID))].map((uniqueUID)=> (
      <option key={uniqueUID} value={uniqueUID}>
        {uniqueUID}
      </option>
    ))}
  </select>
  </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <a href="/dashboard"><Button color="secondary" variant="contained" style={{ backgroundColor: 'red', color: 'white' }}>
            Retour
          </Button></a>
        </Box>
      </Box>
    </Box>
  );
};

export default DisplayDetMaint;
