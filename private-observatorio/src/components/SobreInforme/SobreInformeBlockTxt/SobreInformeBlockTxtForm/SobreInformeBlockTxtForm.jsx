//IMPORTS DE REACT:
import { useState, useCallback } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Form, Input, Image, Embed } from "semantic-ui-react";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import ReactPlayer from 'react-player';
//IMPORTS DEPENDENCIAS DE LA APP:
import { initialValues, validationSchema } from "./SobreInformeBlockTxtForm.form.js";
import { SobreInformeBlockTxt } from '../../../../api';
import { useAuth } from "../../../../hooks";
import { ENV } from "../../../../utils";
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import { image } from "../../../../assets";
import './SobreInformeBlockTxtForm.scss';



const sobreInformeBlockTxtController = new SobreInformeBlockTxt();
 

export const SobreInformeBlockTxtForm = ( props ) => {
    //Extraemos las props que recibimos:
    const { close, onReload, sobreInformeBlockTxt } = props;
    //Obtenemos el accessToken de useAuth();
    const { accessToken } = useAuth();
 
    //Controlamos los datos del formulario con el hook useFormik:
    const formik = useFormik({
      initialValues: {
        ...initialValues(sobreInformeBlockTxt),
        image1File: null,
        image2File: null,
      },
      validationSchema: validationSchema(sobreInformeBlockTxt),
      validateOnChange: false,
      onSubmit: async ( formValue ) => {
        try {
           
            const data = {
              image1: formValue.image1,
              image2: formValue.image2,
              txt1: formValue.txt1,
              txt2: formValue.txt2,
              order: formValue.order,
              active: formValue.active,

            };

            if (!sobreInformeBlockTxt) {
              await sobreInformeBlockTxtController.createSobreInformeBlockTxt(accessToken, data);
            }else {
              await sobreInformeBlockTxtController.updateSobreInformeBlockTxt(accessToken, sobreInformeBlockTxt._id, data);
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
    // First dropzone for the first image
    const [image1, setImage1] = useState(null);
    const onDropImage1 = useCallback((acceptedFiles) => {
        const file1 = acceptedFiles[0];
        setImage1(URL.createObjectURL(file1));
        formik.setFieldValue("image1", file1);
    });

    // Second dropzone for the second image
    const [image2, setImage2] = useState(null);
    const onDropImage2 = useCallback((acceptedFiles) => {
        const file2 = acceptedFiles[0];
        setImage2(URL.createObjectURL(file2));
        formik.setFieldValue("image2", file2);
    });
    
    const { getRootProps: getRootPropsImage1, getInputProps: getInputPropsImage1 } = useDropzone({
      accept: {
        'image/*': ['.jpeg', '.jpg', '.png', '.svg']
      },
      onDrop: onDropImage1,
    })

    const { getRootProps: getRootPropsImage2, getInputProps: getInputPropsImage2 } = useDropzone({
      accept: {
        'image/*': ['.jpeg', '.jpg', '.png', '.svg']
      },
      onDrop: onDropImage2,
    })
   
   const getImage = () => {  
     if (formik.values.image1) {
       return  image1;

     } else if (formik.values?.image1) {
       return `${ENV.BASE_PATH}/${formik.values.image1}`;
     }
       return image.noImage;
   };

   const getImage2 = () => {
     if (formik.values?.image2) {
       return  image2;
 
     } else if (formik.values.image2) {
       return `${ENV.BASE_PATH}/${formik.values.image2}`;
     }
     return image.noImage;
   };
 
    
    return (
      <Form className="sobreInformeBlockTxt-form" onSubmit={formik.handleSubmit}>
            <div className="sobreInformeBlockTxt-form__images-wrapper">
                <div className="sobreInformeBlockTxt-form__images-wrapper__image" {...getRootPropsImage1()} >
                    <input {...getInputPropsImage1()} />
                    {
                        getImage() 
                        ? ( <Image size="small" src={getImage()} /> ) 
                        : ( <div>
                                <span>Drop Here image1</span>
                            </div> )
                    }
                </div>
                <div className="sobreInformeBlockTxtl-form__images-wrapper__image" {...getRootPropsImage2()} >
                    <input {...getInputPropsImage2()} />
                    {
                        getImage2() 
                        ? ( <Image size="small" src={getImage2()} /> ) 
                        : ( <div>
                                <span>Drop Here image2</span>
                            </div> )
                    }
                </div>
            </div>
            <Form.Group widths="equal">
              
                <Form.Input
                    name="txt1"
                    placeholder="Texro1"
                    onChange={formik.handleChange}
                    value={formik.values.txt1}
                    error={formik.errors.txt1}
                />
                <Form.Input
                    name="txt2"
                    placeholder="Texto2"
                    onChange={formik.handleChange}
                    value={formik.values.txt2}
                    error={formik.errors.txt2}
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
                {sobreInformeBlockTxt ? "Update sobreInformeBlockTxt" : "Create sobreInformeBlockTxt"}
            </Form.Button>
            
            <Form.Group/>
      </Form>
    )
}