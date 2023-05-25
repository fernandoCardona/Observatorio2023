//IMPORTS DE REACT:
import { useState, useCallback } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Form, Input, TextArea, Image } from "semantic-ui-react";
import { useFormik } from "formik";
//IMPORTS DEPENDENCIAS DE LA APP:
import { initialValues, validationSchema } from "./HomeHeaderBoxForm.form";
import { HomeHeaderBox } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from "../../../../utils";
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
 
import './HomeHeaderBoxForm.scss';



const homeHeaderBoxController = new HomeHeaderBox();
 

export const HomeHeaderBoxForm = ( props ) => {
    //Extraemos las props que recibimos:
    const { close, onReload, homeHeaderBox } = props;
    //Obtenemos el accessToken de useAuth();
    const { accessToken } = useAuth();

    //Controlamos los datos del formulario con el hook useFormik:
    const formik = useFormik({
      initialValues: initialValues(homeHeaderBox),
      validationSchema: validationSchema(homeHeaderBox),
      validateOnChange: false,
      onSubmit: async ( formValue ) => {
        try {
         
            const data = {
              title: formValue.title,
              txt: formValue.txt,
              order: formValue.order,
              active: formValue.active,
            };

            if (!homeHeaderBox) {
              await homeHeaderBoxController.createHomeHeaderBox(accessToken, data);
            }else {
              await homeHeaderBoxController.updateHomeHeaderBox(accessToken, homeHeaderBox._id, data);
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
      <Form className="homeHeaderBox-form" onSubmit={formik.handleSubmit}>
            
            <Form.Group widths="equal">
                <Form.Input
                    name="title"
                    placeholder="Titulo"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    error={formik.errors.title}
                />
                <Form.TextArea
                    name="txt"
                    placeholder="Texto"
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
            
 
            <Form.Group/>

            <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
                {homeHeaderBox ? "Update Box" : "Create Box"}
            </Form.Button>
            
            <Form.Group/>
      </Form>
    )
}