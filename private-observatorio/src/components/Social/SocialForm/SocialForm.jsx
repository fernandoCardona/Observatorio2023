//IMPORTS DE REACT:
import { useState, useCallback } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Form, Dropdown, Input, Image } from "semantic-ui-react";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
//IMPORTS DEPENDENCIAS DE LA APP:
import { initialValues, validationSchema } from "./SocialFrom.form.js";
import { Social } from "../../../api/";
import { useAuth } from "../../../hooks";
import { ENV } from "../../../utils";
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import { image } from "../../../assets";
import './SocialForm.scss';



const socialController = new Social();
 

export const SocialForm = ( props ) => {
    //Extraemos las props que recibimos:
    const { close, onReload, social } = props;
    //Obtenemos el accessToken de useAuth();
    const { accessToken } = useAuth();
 
    //Controlamos los datos del formulario con el hook useFormik:
    const formik = useFormik({
      initialValues: initialValues(social),
      validationSchema: validationSchema(social),
      validateOnChange: false,
      onSubmit: async ( formValue ) => {
        try {
           
            const data = {
              title: formValue.title,
              //path: `${formValue.protocol}${formValue.path}`,
              path: `${formValue.path}`,
              order: formValue.order,
              active: formValue.active,
              image1: formValue.image1,
              image2: formValue.image2,
            };

            if (!social) {
              await socialController.createSocial(accessToken, data);
            }else {
              await socialController.updateSocial(accessToken, social._id, data);
            }
            
            onReload();
            close();
            //console.log( formValue );
           
        } catch (error) {
          console.error(error);
        }
      },
    });

    //Funcion que ejecuta el area Dropzone con el hook useCallback:
    
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
      <Form className="social-form" onSubmit={formik.handleSubmit}>
            <div className="social-form__images-wrapper">
                <div className="social-form__images-wrapper__image" {...getRootPropsImage1()} >
                    <input {...getInputPropsImage1()} />
                    {
                        getImage() 
                        ? ( <Image size="small" src={getImage()} /> ) 
                        : ( <div>
                                <span>Drop Here image1</span>
                            </div> )
                    }
                </div>
                <div className="social-form__images-wrapper__image" {...getRootPropsImage2()} >
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
                //     !social ? (   <Dropdown  
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
                {social ? "Update social" : "Create social"}
            </Form.Button>
            
            <Form.Group/>
      </Form>
    )
}

const options = [
    { key: "https://", text: "https://", value: "https://" },
    { key: "http://", text: "http://", value: "http://" },
    { key: "/", text: "/", value: "/" },
  ];
