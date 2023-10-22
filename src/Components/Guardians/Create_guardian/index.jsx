import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Header";
import { useEffect } from "react";

const initialValues = {
  name: "",
  age: "",
  identification: "",
  numero: "",
  email: "",
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;


const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  age: yup
    .string()
    .required("required"),
  identification: yup.string().required("required"),
  numero: yup.string().matches(phoneRegExp, "Phone number is not valid").required("required"),
  email: yup.string().required("required"),
});



const CreateGuardian = () => {

    useEffect(() => {
        document.title = 'Ajout de gardiens';
      }, []);

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        console.log(values);
      };

        return (
        <Box m="20px">
            <Header title="AJOUTER UN GARDIEN"  />
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
                          label="Nom"
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
                          label="Age"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.description}
                          name="age"
                          error={!!touched.description && !!errors.description}
                          helperText={touched.description && errors.description}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Identification"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.privilege}
                          name="identification"
                          error={!!touched.privilege && !!errors.privilege}
                          helperText={touched.privilege && errors.privilege}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Numéro de télephone"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.privilege}
                          name="numero"
                          error={!!touched.privilege && !!errors.privilege}
                          helperText={touched.privilege && errors.privilege}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.privilege}
                          name="email"
                          error={!!touched.privilege && !!errors.privilege}
                          helperText={touched.privilege && errors.privilege}
                          sx={{ gridColumn: "span 4" }}
                        />

                    </Box>

                    <Box display="flex" justifyContent="end" mt="20px">
                      <Button type="submit" color="secondary" variant="contained">
                        Ajouter un gardien
                      </Button>
                      <Box ml={2}>
                      <a href="/list_guardian"><Button color="secondary" variant="contained" style={{ backgroundColor: 'red', color: 'white' }}>
                        Voir la liste des guardiens
                      </Button></a>
                      </Box>
                    </Box>

                  </form>
                )}
            </Formik>

        </Box>)
}



export default CreateGuardian;