//IMPORTS DE REACT:
import { useState, useCallback } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Form, Input, Image } from "semantic-ui-react";
import { useFormik } from "formik";
//IMPORTS DEPENDENCIAS DE LA APP:
import { initialValues, validationSchema } from "./HomeHeaderAncorsForm.form";
import { HomeHeaderAncors } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from "../../../../utils";
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
 
import './HomeHeaderAncorsForm.scss';



const homeHeaderAncorsController = new HomeHeaderAncors();
 

export const HomeHeaderAncorsForm = ( props ) => {
    //Extraemos las props que recibimos:
    const { close, onReload, homeHeaderAncor } = props;
    //Obtenemos el accessToken de useAuth();
    const { accessToken } = useAuth();

    //Controlamos los datos del formulario con el hook useFormik:
    const formik = useFormik({
      initialValues: initialValues(homeHeaderAncor),
      validationSchema: validationSchema(homeHeaderAncor),
      validateOnChange: false,
      onSubmit: async ( formValue ) => {
        try {
         
            const data = {
              txt: formValue.txt,
              path: `${formValue.path}`,
              order: formValue.order,
              active: formValue.active,
            };

            if (!homeHeaderAncor) {
              await homeHeaderAncorsController.createHomeHeaderAncor(accessToken, data);
            }else {
              await homeHeaderAncorsController.updateHomeHeaderAncor(accessToken, homeHeaderAncor._id, data);
            }
            
            onReload();
            close();
            console.log( formValue );
           
        } catch (error) {
          console.error(error);
        }
      },
    });

 
    return (
      <Form className="homeHeaderAncor-form" onSubmit={formik.handleSubmit}>
            
            <Form.Group widths="equal">
                <Form.Input
                    name="txt"
                    placeholder="Titulo"
                    onChange={formik.handleChange}
                    value={formik.values.txt}
                    error={formik.errors.txt}
                />
                <Form.Input 
                    name="order"
                    type="number"
                    placeholder="Posicion"
                    onChange={formik.handleChange}
                    value={formik.values.order}
                    error={formik.errors.order}
                />
            </Form.Group>
            
            <Input
                name="path"
                placeholder="URL"
                fluid
                onChange={ formik.handleChange }
                value={ formik.values.path }
                error={ formik.errors.path }
            />
 
            <Form.Group/>

            <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
                {homeHeaderAncor ? "Update Ancors" : "Create Ancors"}
            </Form.Button>
            
            <Form.Group/>
      </Form>
    )
}