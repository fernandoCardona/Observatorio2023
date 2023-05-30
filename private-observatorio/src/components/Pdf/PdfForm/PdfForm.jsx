//IMPORTS DE REACT:
import { useState, useCallback } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Form, Input, Image, Embed } from "semantic-ui-react";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";

//IMPORTS DEPENDENCIAS DE LA APP:
import { initialValues, validationSchema } from "./PdfFrom.form";
import { Pdf } from '../../../api';
import { useAuth } from "../../../hooks";
import { ENV } from "../../../utils";
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import { image } from "../../../assets";
import './PdfForm.scss';



const PdfController = new Pdf();
 

export const PdfForm = ( props ) => {
    //Extraemos las props que recibimos:
    const { close, onReload, pdf } = props;
    //Obtenemos el accessToken de useAuth();
    const { accessToken } = useAuth();
 
    //Controlamos los datos del formulario con el hook useFormik:
    const formik = useFormik({
      initialValues: initialValues(pdf),
      validationSchema: validationSchema(pdf),
      validateOnChange: false,
      onSubmit: async ( formValue ) => {
        try {
           
            const data = {
                pdfName: formValue.pdfName,
                pdf: formValue.pdf,
                btnPath: formValue.btnPath,
                order: formValue.order,
                active: formValue.active,
            };

            if (!pdf) {
              await PdfController.createPdf(accessToken, data);
            }else {
              await PdfController.updatePdf(accessToken, pdf._id, data);
            }
            
            onReload();
            close();
            
           
        } catch (error) {
          console.error(error);
        }
      },
    });
//////////////////////////////
const handleFileDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        formik.setFieldValue("pdf", acceptedFiles[0]);
      }
    },
    [formik]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileDrop,
    accept: ".pdf",
  });
////////////
  
   
    
    return (
      <Form className="pdf-form" onSubmit={formik.handleSubmit}>
            <div className="pdf-form__images-wrapper" {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the PDF file here...</p>
                ) : (
                    <p>Drag and drop a PDF file here, or click to select file</p>
                )}
                
            </div>
            <Form.Group widths="equal">
              
                <Form.Input
                    name="pdfName"
                    placeholder="Nombre del Pdf"
                    onChange={formik.handleChange}
                    value={formik.values.pdfName}
                    error={formik.errors.pdfName}
                />
                {/* <Form.Input
                    name="btnPath"
                    placeholder="url pdf"
                    onChange={formik.handleChange}
                    value={formik.values.btnPath}
                    error={formik.errors.btnPath}
                /> */}
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
                {pdf ? "Update pdf" : "Create pdf"}
            </Form.Button>
            
            <Form.Group/>
      </Form>
    )
}


