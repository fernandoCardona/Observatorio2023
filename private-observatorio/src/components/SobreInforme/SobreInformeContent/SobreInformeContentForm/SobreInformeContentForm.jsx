//IMPORTS DE REACT:
import { useState, useCallback } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Form, Input, TextArea, Image, Embed } from "semantic-ui-react";
import { useFormik } from "formik";
//IMPORTS DEPENDENCIAS DE LA APP:
import { initialValues, validationSchema } from "./SobreInformeContentForm.form.js";
import { SobreInformeContent } from '../../../../api';
import { useAuth } from "../../../../hooks";
import { ENV } from "../../../../utils";
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import './SobreInformeContentForm.scss';



const sobreInformeContentController = new SobreInformeContent();
 

export const SobreInformeContentForm = ( props ) => {
    //Extraemos las props que recibimos:
    const { close, onReload, sobreInformeContent } = props;
    //Obtenemos el accessToken de useAuth();
    const { accessToken } = useAuth();
 
    //Controlamos los datos del formulario con el hook useFormik:
    const formik = useFormik({
      initialValues: initialValues(sobreInformeContent),
      validationSchema: validationSchema(sobreInformeContent),
      validateOnChange: false,
      onSubmit: async ( formValue ) => {
        try {
           
            const data = {
                title: formValue.title,
                subtitle1: formValue.subtitle1,
                content1: formValue.content1,
                subtitle2: formValue.subtitle2,
                content2: formValue.content2,
                subtitle3: formValue.subtitle3,
                content3: formValue.content3,
                subtitle4: formValue.subtitle4,
                content4: formValue.content4,
                subtitle5: formValue.subtitle5,
                content5: formValue.content5,
                subtitle6: formValue.subtitle6,
                content6: formValue.content6,
                subtitle7: formValue.subtitle7,
                content7: formValue.content7,
                subtitle8: formValue.subtitle8,
                content8: formValue.content8, 
                btnTxt: formValue.btnTxt,   
                order: formValue.order,
                active: formValue.active,
            };

            if (!sobreInformeContent) {
              await sobreInformeContentController.createSobreInformeContent(accessToken, data);
            }else {
              await sobreInformeContentController.updateSobreInformeContent(accessToken, sobreInformeContent._id, data);
            }
            console.log('DATA', data)
            onReload();
            close();
            
           
        } catch (error) {
          console.error(error);
        }
      },
    });

    
 
    
    return (
      <Form className="sobreInformeContent-form" onSubmit={formik.handleSubmit}>
            <Form.Group widths="equal">
              
                <Form.Input
                    name="title"
                    placeholder="Titular"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    error={formik.errors.title}
                />

                <Form.Input
                    name="subtitle1"
                    placeholder="Subtitular1"
                    onChange={formik.handleChange}
                    value={formik.values.subtitle1}
                    error={formik.errors.subtitle1}
                />
                <Form.TextArea
                    name="content1"
                    placeholder="Content1"
                    onChange={formik.handleChange}
                    value={formik.values.content1}
                    error={formik.errors.content1}
                />
                
                <Form.Input
                    name="subtitle2"
                    placeholder="Subtitular2"
                    onChange={formik.handleChange}
                    value={formik.values.subtitle2}
                    error={formik.errors.subtitle2}
                />
                <Form.TextArea
                    name="content2"
                    placeholder="Content2"
                    onChange={formik.handleChange}
                    value={formik.values.content2}
                    error={formik.errors.content2}
                />

                <Form.Input
                    name="subtitle3"
                    placeholder="Subtitular3"
                    onChange={formik.handleChange}
                    value={formik.values.subtitle3}
                    error={formik.errors.subtitle3}
                />
                <Form.TextArea
                    name="content3"
                    placeholder="Content3"
                    onChange={formik.handleChange}
                    value={formik.values.content3}
                    error={formik.errors.content3}
                />

                <Form.Input
                    name="subtitle4"
                    placeholder="Subtitular4"
                    onChange={formik.handleChange}
                    value={formik.values.subtitle4}
                    error={formik.errors.subtitle4}
                />
                <Form.TextArea
                    name="content4"
                    placeholder="Content4"
                    onChange={formik.handleChange}
                    value={formik.values.content4}
                    error={formik.errors.content4}
                />

                <Form.Input
                    name="subtitle5"
                    placeholder="Subtitular5"
                    onChange={formik.handleChange}
                    value={formik.values.subtitle5}
                    error={formik.errors.subtitle5}
                />
                <Form.TextArea
                    name="content5"
                    placeholder="Content5"
                    onChange={formik.handleChange}
                    value={formik.values.content5}
                    error={formik.errors.content5}
                />

                <Form.Input
                    name="subtitle6"
                    placeholder="Subtitular6"
                    onChange={formik.handleChange}
                    value={formik.values.subtitle6}
                    error={formik.errors.subtitle6}
                />
                <Form.TextArea
                    name="content6"
                    placeholder="Content6"
                    onChange={formik.handleChange}
                    value={formik.values.content6}
                    error={formik.errors.content6}
                />

                <Form.Input
                    name="subtitle7"
                    placeholder="Subtitular7"
                    onChange={formik.handleChange}
                    value={formik.values.subtitle7}
                    error={formik.errors.subtitle7}
                />
                <Form.TextArea
                    name="content7"
                    placeholder="Content7"
                    onChange={formik.handleChange}
                    value={formik.values.content7}
                    error={formik.errors.content7}
                />

                <Form.Input
                    name="subtitle8"
                    placeholder="Subtitular8"
                    onChange={formik.handleChange}
                    value={formik.values.subtitle8}
                    error={formik.errors.subtitle8}
                />
                <Form.TextArea
                    name="content8"
                    placeholder="Content8"
                    onChange={formik.handleChange}
                    value={formik.values.content8}
                    error={formik.errors.content8}
                />
               
               <Form.Input 
                    name="btnTxt"
                    type="text"
                    placeholder="Texto boton Descarga"
                    onChange={formik.handleChange}
                    value={formik.values.btnTxt}
                    error={formik.errors.btnTxt}
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
                {sobreInformeContent ? "Update sobreInformeContent" : "Create sobreInformeContent"}
            </Form.Button>
            
            <Form.Group/>
      </Form>
    )
}