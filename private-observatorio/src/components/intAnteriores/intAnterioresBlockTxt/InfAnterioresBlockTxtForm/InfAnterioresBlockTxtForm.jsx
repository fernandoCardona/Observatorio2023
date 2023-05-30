//IMPORTS DE REACT:
import { useState, useCallback } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Form, Input, TextArea, Image, Embed } from "semantic-ui-react";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import ReactPlayer from 'react-player';
//IMPORTS DEPENDENCIAS DE LA APP:
import { initialValues, validationSchema } from "./InfAnterioresBlockTxtForm.form.js";
import { InfAnterioresBlockTxt } from '../../../../api';
import { useAuth } from "../../../../hooks";
import { ENV } from "../../../../utils";
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import { image } from "../../../../assets";
import './InfAnterioresBlockTxtForm.scss';



const infAnterioresBlockTxtController = new InfAnterioresBlockTxt();
 

export const InfAnterioresBlockTxtForm = ( props ) => {
    //Extraemos las props que recibimos:
    const { close, onReload, infAnterioresBlockTxt } = props;
    //Obtenemos el accessToken de useAuth();
    const { accessToken } = useAuth();
 
    //Controlamos los datos del formulario con el hook useFormik:
    const formik = useFormik({
      initialValues: {
        ...initialValues(infAnterioresBlockTxt),
        image1File: null,
        image2File: null,
      },
      validationSchema: validationSchema(infAnterioresBlockTxt),
      validateOnChange: false,
      onSubmit: async ( formValue ) => {
        try {
           
            const data = {
              image1: formValue.image1,
              image2: formValue.image2,
              txt: formValue.txt,
              order: formValue.order,
              active: formValue.active,

            };

            if (!infAnterioresBlockTxt) {
              await infAnterioresBlockTxtController.createInfAnterioresBlockTxt(accessToken, data);
            }else {
              await infAnterioresBlockTxtController.updateInfAnterioresBlockTxt(accessToken, infAnterioresBlockTxt._id, data);
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
      <Form className="infAnterioresBlockTxt-form" onSubmit={formik.handleSubmit}>
            <Form.Group width="equal">
            <div className="menu-form__miniature">
               
                <div className="infAnterioresBlockTxt-form__images-wrapper__image" {...getRootPropsImage1()} >
                    <input {...getInputPropsImage1()} />
                    {
                        getImage() 
                        ? ( <Image size="small" src={getImage()} /> ) 
                        : ( <div>
                                <span>Drop Here image1</span>
                            </div> )
                    }
                </div>
                <div className="infAnterioresBlockTxt-form__images-wrapper__image" {...getRootPropsImage2()} >
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
            </Form.Group>
            
            <Form.Group widths="equal">
              
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
                {infAnterioresBlockTxt ? "Update infAnterioresBlockTxt" : "Create infAnterioresBlockTxt"}
            </Form.Button>
            
            <Form.Group/>
      </Form>
    )
}