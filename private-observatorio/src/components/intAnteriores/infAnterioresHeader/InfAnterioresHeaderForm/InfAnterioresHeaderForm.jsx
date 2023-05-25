//IMPORTS DE REACT:
import { useState, useCallback } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Form, Input, Image, Embed } from "semantic-ui-react";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import ReactPlayer from 'react-player';
//IMPORTS DEPENDENCIAS DE LA APP:
import { initialValues, validationSchema } from "./InfAnterioresHeaderForm.form.js";
import { InfAnterioresHeader } from '../../../../api/index.js';
import { useAuth } from "../../../../hooks/index.js";
import { ENV } from "../../../../utils/index.js";
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import { image } from "../../../../assets/index.js";
import './InfAnterioresHeaderForm.scss';



const infAnterioresHeaderController = new InfAnterioresHeader();
 

export const InfAnterioresHeaderForm = ( props ) => {
    //Extraemos las props que recibimos:
    const { close, onReload, infAnterioresHeader } = props;
    //Obtenemos el accessToken de useAuth();
    const { accessToken } = useAuth();
 
    //Controlamos los datos del formulario con el hook useFormik:
    const formik = useFormik({
      initialValues: initialValues(infAnterioresHeader),
      validationSchema: validationSchema(infAnterioresHeader),
      validateOnChange: false,
      onSubmit: async ( formValue ) => {
        try {
           
            const data = {
              image: formValue.image,
              claim: formValue.claim,
              order: formValue.order,
              active: formValue.active,

            };

            if (!infAnterioresHeader) {
              await infAnterioresHeaderController.createInfAnterioresHeader(accessToken, data);
            }else {
              await infAnterioresHeaderController.updateInfAnterioresHeader(accessToken, infAnterioresHeader._id, data);
            }
            
            onReload();
            close();
            
           
        } catch (error) {
          console.error(error);
        }
      },
    });

    //Funcion que ejecuta el area Dropzone con el hook useCallback:
    
     // First dropzone for the first image
     const [image1, setImage1] = useState(null);
     const onDropImage1 = useCallback((acceptedFiles) => {
         const file = acceptedFiles[0];
         setImage1(URL.createObjectURL(file));
         formik.setFieldValue("image", file);
          
         //console.log('file', file)
     });
  
     
     const { getRootProps: getRootPropsImage, getInputProps: getInputPropsImage } = useDropzone({
        accept: {
          'image/*': ['.mp4', '.mov', '.avi']
        },
        onDrop: onDropImage1,
     })
 
     
    
    const getImage = () => {  
      if (formik.values?.image) {
        return  image1;
      } else if (formik.values.image) {
        //console.log('formik.values.video', formik.values.video)
        return `${ENV.BASE_PATH}/${formik.values.image}`;
      }
        return image.noImage;
    };
 
    
    return (
      <Form className="infAnterioresHeader-form" onSubmit={formik.handleSubmit}>
            <div className="infAnterioresHeader-form__images-wrapper">
                <div className="infAnterioresHeader-form__images-wrapper__image" {...getRootPropsImage()} >
                    <input {...getInputPropsImage()} />
                    {
                        getImage() 
                        ? ( <Image size="small" src={getImage()} /> ) 
                        : ( <div>
                                <span>Drop Here image1</span>
                            </div> )
                    }
                </div>
                
            </div>
            <Form.Group widths="equal">
              
                <Form.Input
                    name="claim"
                    placeholder="Titular"
                    onChange={formik.handleChange}
                    value={formik.values.claim}
                    error={formik.errors.claim}
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
                {infAnterioresHeader ? "Update Cabecera" : "Create Cabecera"}
            </Form.Button>
            
            <Form.Group/>
      </Form>
    )
}