//IMPORTS DE REACT:
import { useState, useCallback } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Form, Input, Image } from "semantic-ui-react";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
//IMPORTS DEPENDENCIAS DE LA APP:
import { initialValues, validationSchema } from "./FooterLogoForm.form.js";
import { FooterLogo } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from "../../../../utils";
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import { image } from "../../../../assets";
import './FooterLogoForm.scss';



const FooterLogoController = new FooterLogo();
 

export const FooterLogoForm = ( props ) => {
    //Extraemos las props que recibimos:
    const { close, onReload, footerLogo } = props;
    //Obtenemos el accessToken de useAuth();
    const { accessToken } = useAuth();
 
    //Controlamos los datos del formulario con el hook useFormik:
    const formik = useFormik({
      initialValues: initialValues(footerLogo),
      validationSchema: validationSchema(footerLogo),
      validateOnChange: false,
      onSubmit: async ( formValue ) => {
        try {
           
            const data = {
              title: formValue.title,
              //path: `${formValue.protocol}${formValue.path}`,
              path: `${formValue.path}`,
              order: formValue.order,
              active: formValue.active,
              image: formValue.image1,
             
            };

            if (!footerLogo) {
              await FooterLogoController.createFooterLogo(accessToken, data);
            }else {
              await FooterLogoController.updateFooterLogo(accessToken, footerLogo._id, data);
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
 
     
     const { getRootProps: getRootPropsImage, getInputProps: getInputPropsImage } = useDropzone({
       accept: {
         'image/*': ['.jpeg', '.jpg', '.png', '.svg']
       },
       onDrop: onDropImage1,
     })
 
     
    
     const getImage = () => {  
      if (formik.values.image) {
        return  image1;

      } else if (formik.values.image) {
        return `${ENV.BASE_PATH}/${formik.values.image}`;
      }
        return image.noImage;
    };

    
    return (
      <Form className="footerLogo-form" onSubmit={formik.handleSubmit}>
            <div className="footerLogo-form__images-wrapper">
                <div className="footerLogo-form__images-wrapper__image" {...getRootPropsImage()} >
                    <input {...getInputPropsImage()} />
                    {
                        getImage() 
                        ? ( <Image size="small" src={getImage()} /> ) 
                        : ( <div>
                                <span>Drop Here image</span>
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
                //     !footerLogo ? (   <Dropdown  
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
                {footerLogo ? "Update footerLogo" : "Create footerLogo"}
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
