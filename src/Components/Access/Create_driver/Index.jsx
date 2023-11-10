import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Header";
import React, { useEffect, useState } from 'react';
import Sidebar from "../../../Scenes/Global/Sidebar";
import Topbar from "../../../Scenes/Global/Topbar";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase_config";
import {Snackbar, Alert} from "@mui/material";


const initialValues = {
  carname: "",
  fistName: "",
  immatriculation: "",
  lastName: "",
  oil: "",
  places: "",
  speed: "",
};


const checkoutSchema = yup.object().shape({
  carName: yup.string().required("required"),
  fistName: yup.string().required("required"),
  immatriculation: yup.string().required("required"),
  lastName: yup.string().required("required"),
  oil: yup.string().required("required"),
  places: yup.string().required("required"),
  speed: yup.string().required("required"),
});



const CreateDriver = () => {
////////////////////////////////////////////////
    const [data, setData] = useState({})
    const [open, setOpen] = useState(false);
    const [isSidebar, setIsSidebar] = useState(true);
    const handleClose = () => {
        setOpen(false); // Step 3 - Close the Snackbar
      };

    const handleSign = async(e) =>{
      if (
        !data.carName ||
        !data.fistName ||
        !data.immatriculation ||
        !data.lastName ||
        !data.oil ||
        !data.places ||
        !data.speed
      ) {
        // Si l'un des champs est vide, n'envoyez pas les données
        return ;
      }
        e.preventDefault()
        try{
            await addDoc(collection(db, "users"), {
                ...data,
                timeStamp: serverTimestamp()
              });setOpen(true)
        } catch(err){
            console.log(err)
        }
    }

    const handleInput = (e) =>{
        
        const id = e.target.id
        const value = e.target.value

        setData({...data, [id]:value})
    }

  useEffect(() => {
    document.title = "Enregistrement de chauffeur";
  }, []);

    const isNonMobile = useMediaQuery("(min-width:600px)");



        return (
          <>
          <div className="app">
          <Sidebar isSidebar={isSidebar} />
          
          <main className='content'>
          <Topbar setIsSidebar={setIsSidebar} />
        <Box m="20px">
            <Header title="ENREGISTRER UN CHAUFFEUR"  />
            <Formik         
            onSubmit={handleSign}
            initialValues={initialValues}
            validationSchema={checkoutSchema}>
            

            {({ values,
                errors,
                touched,
                handleBlur,
                handleChange, 
                isValid}) => (
                  <form  onSubmit={handleSign}>
                    <Box
                      display="grid"
                      gap="30px"
                      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                      sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                      }}
                      >
                        <TextField
                          id="carnName"
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Saisir le nom de la voiture"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          onInput={handleInput}
                          value={values.carName}
                          name="carName"
                          error={!!touched.carName && !!errors.carName}
                          helperText={touched.carName && errors.carName}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                          id="fistName"
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Saisir votre Prenom"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          onInput={handleInput}
                          value={values.fistName}
                          name="fistName"
                          error={!!touched.fistName && !!errors.fistName}
                          helperText={touched.fistName && errors.fistName}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                          id="lastName"
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Saisir votre nom"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          onInput={handleInput}
                          value={values.lastName}
                          name="lastName"
                          error={!!touched.lastName && !!errors.lastName}
                          helperText={touched.lastName && errors.lastName}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                          id="immatriculation"
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Saisir l'immatriculation de la voiture"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          onInput={handleInput}
                          value={values.immatriculation}
                          name="immatriculation"
                          error={!!touched.immatriculation && !!errors.immatriculation}
                          helperText={touched.immatriculation && errors.immatriculation}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                          id="oil"
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Saisir le niveau d'huile"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          onInput={handleInput}
                          value={values.oil}
                          name="oil"
                          error={!!touched.oil && !!errors.oil}
                          helperText={touched.oil && errors.oil}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                          id="places"
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Saisir le nombre de places"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          onInput={handleInput}
                          value={values.places}
                          name="places"
                          error={!!touched.places && !!errors.places}
                          helperText={touched.places && errors.places}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                          id="speed"
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Saisir la vitesse"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          onInput={handleInput}
                          value={values.speed}
                          name="speed"
                          error={!!touched.speed && !!errors.speed}
                          helperText={touched.speed && errors.speed}
                          sx={{ gridColumn: "span 4" }}
                        />

                    </Box>

                    <Box display="flex" justifyContent="end" mt="20px">
                      <Button type="submit" color="secondary" variant="contained">
                        Enregistrer un nouveau chauffeur
                      </Button>
                      <Box ml={2}>
                      <a href="/list_driver"><Button color="secondary" variant="contained" style={{ backgroundColor: 'red', color: 'white' }}>
                        Voir la liste des chauffeurs
                      </Button></a>
                      </Box>
                    </Box>

                  </form>
                )}
            </Formik>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical:"top", horizontal:"center" }}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Enregistrement fait avec success
            </Alert>
            </Snackbar>

        </Box>
        </main>
      </div>

      </>)
}



export default CreateDriver;