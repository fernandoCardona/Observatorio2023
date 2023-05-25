//IMPORTS DE REACT:
import { useState, useCallback } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Form, Input, Image } from "semantic-ui-react";
import { useFormik } from "formik";
// import { useDropzone } from "react-dropzone";
//IMPORTS DEPENDENCIAS DE LA APP:
import { initialValues, validationSchema } from "./FooterLinksForm.form.js";
import { FooterLinks } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from "../../../../utils";
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import { image } from "../../../../assets";
import './FooterLinksForm.scss';


const footerLinksController = new FooterLinks();
 

export const FooterLinksForm = ( props ) => {
    //Extraemos las props que recibimos:
    const { close, onReload, footerLinks } = props;
    //Obtenemos el accessToken de useAuth();
    const { accessToken } = useAuth();
 
    //Controlamos los datos del formulario con el hook useFormik:
    const formik = useFormik({
      initialValues: initialValues(footerLinks),
      validationSchema: validationSchema(footerLinks),
      validateOnChange: false,
      onSubmit: async ( formValue ) => {
        try {
           
            const data = {
              title: formValue.title,
              path: `${formValue.path}`,
              order: formValue.order,
              active: formValue.active,
            };
            console.log('data',data)
            if (!footerLinks) {
              await footerLinksController.createFooterLink(accessToken, data);
              
            }else {
              await footerLinksController.updateFooterLink(accessToken, footerLinks._id, data);
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
      <Form className="footerLinks-form" onSubmit={formik.handleSubmit}>
            
            <Form.Group widths="equal">
                <Form.Input
                    name="title"
                    placeholder="Title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    error={formik.errors.title}
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
                // label={
                //     !footerLinks ? (   <Dropdown  
                //                     options={ options } 
                //                     onChange={
                //                         (_, data) => formik.setFieldValue( 'protocol', data.value )
                //                     }
                //                     value={ formik.values.protocol }
                //                     error={ formik.errors.protocol }
                //                 /> 
                //             ) : null
                // }
            />
 
            <Form.Group/>

            <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
                {footerLinks ? "Update footerLinks" : "Create footerLinks"}
            </Form.Button>
            
            <Form.Group/>
      </Form>
    )
}