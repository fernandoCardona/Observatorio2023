//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";

//IMPORTS DEPENDENCIAS DE LA APP:
import { Auth } from "../../../api";
import { useAuth } from "../../../hooks";
import { initialValues, validationSchema } from './LoginForm.form';
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:


//instanciamos la class Auth:
const authController = new Auth();

export const LoginForm = () => {
    const { login } = useAuth();

    //Definimos formik:
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
          try {
            const response = await authController.login(formValue);
            //console.log(response)
            authController.setAccessToken(response.access);
            authController.setRefreshToken(response.refresh);
            login(response.access);

          } catch (error) {
            //setError("Server error");
          }
        },
    });

  return (
    <Form className="register-form" onSubmit={ formik.handleSubmit }>
            <Form.Input 
                name="email" 
                placeholder="Email" 
                onChange={ formik.handleChange } 
                value={ formik.values.email }
                error={ formik.errors.email }
            />
            <Form.Input 
                name="company" 
                placeholder="Empresa" 
                onChange={ formik.handleChange } 
                value={ formik.values.company }
                error={ formik.errors.company }
            />
            
            <Form.Input 
                name="password" 
                type="password" 
                placeholder="Password"
                onChange={ formik.handleChange } 
                value={ formik.values.password }
                error={ formik.errors.password }
            />
            

            <Button type="submit" primary fluid loading={formik.isSubmitting}>
                Login
            </Button>

             
        </Form>
  )
}