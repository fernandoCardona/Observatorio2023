//IMPORTS DE REACT:
import { useState, useCallback } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Form, Input, Image } from "semantic-ui-react";
import { useFormik } from "formik";
// import { useDropzone } from "react-dropzone";
//IMPORTS DEPENDENCIAS DE LA APP:
import { initialValues, validationSchema } from "./FooterTxtForm.form.js";
import { FooterTxt } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from "../../../../utils";
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import { image } from "../../../../assets";
import './FooterTxtForm.scss';


const footerTxtController = new FooterTxt();
 

export const FooterTxtForm = ( props ) => {
    //Extraemos las props que recibimos:
    const { close, onReload, footerTxt } = props;
    //Obtenemos el accessToken de useAuth();
    const { accessToken } = useAuth();
 
    //Controlamos los datos del formulario con el hook useFormik:
    const formik = useFormik({
      initialValues: initialValues(footerTxt),
      validationSchema: validationSchema(footerTxt),
      validateOnChange: false,
      onSubmit: async ( formValue ) => {
        try {
           
            const data = {
              txt: formValue.txt,
              order: formValue.order,
              active: formValue.active,
            };
            console.log('data',data)
            if (!footerTxt) {
              await footerTxtController.createFooterTxt(accessToken, data);
              
            }else {
              await footerTxtController.updateFooterTxt(accessToken, footerTxt._id, data);
            }
            
            onReload();
            close();
            //console.log( formValue );
           
        } catch (error) {
          console.error(error);
        }
      },
    });


    
    return (
      <Form className="footerTxt-form" onSubmit={formik.handleSubmit}>
            
            <Form.Group widths="equal">
                <Form.Input
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
                {footerTxt ? "Update footerTxt" : "Create footerTxt"}
            </Form.Button>
            
            <Form.Group/>
      </Form>
    )
}