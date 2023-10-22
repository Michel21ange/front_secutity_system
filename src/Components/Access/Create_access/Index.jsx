import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Header";
import React, { useEffect } from 'react';

const initialValues = {
  name: "",
  description: "",
  privilege: "",
};


const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  description: yup
    .string()
    .required("required"),
  privilege: yup.string().required("required"),
});



const CreateAccess = () => {
  useEffect(() => {
    document.title = "Creation d'acces";
  }, []);

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        console.log(values);
      };

        return (
        <Box m="20px">
            <Header title="CREATION D'ACCES"  />
            <Formik         
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}>

            {({ values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,}) => (
                  <form onSubmit={handleSubmit}>
                    <Box
                      display="grid"
                      gap="30px"
                      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                      sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                      }}
                      >
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Nom de l'accès"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.name}
                          name="name"
                          error={!!touched.name && !!errors.name}
                          helperText={touched.name && errors.name}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Description"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.description}
                          name="description"
                          error={!!touched.description && !!errors.description}
                          helperText={touched.description && errors.description}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Privilège"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.privilege}
                          name="privilege"
                          error={!!touched.privilege && !!errors.privilege}
                          helperText={touched.privilege && errors.privilege}
                          sx={{ gridColumn: "span 4" }}
                        />

                    </Box>

                    <Box display="flex" justifyContent="end" mt="20px">
                      <Button type="submit" color="secondary" variant="contained">
                        Creer un nouvel accès
                      </Button>
                      <Box ml={2}>
                      <a href="/list_access"><Button color="secondary" variant="contained" style={{ backgroundColor: 'red', color: 'white' }}>
                        Voir la liste des accès
                      </Button></a>
                      </Box>
                    </Box>

                  </form>
                )}
            </Formik>

        </Box>)
}



export default CreateAccess;