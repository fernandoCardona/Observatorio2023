//IMPORTS DE REACT:
import { useState, useCallback } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Form, Dropdown, Input, TextArea, Image } from "semantic-ui-react";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
//IMPORTS DEPENDENCIAS DE LA APP:
import { initialValues, validationSchema } from "./InfAnterioresPostForm.form.js";
import { InfAntPost } from "../../../../api/";
import { useAuth } from "../../../../hooks";
import { ENV } from "../../../../utils";
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import { image } from "../../../../assets";
import './InfAnterioresPostForm.scss';

const InfAnterioresPostController = new InfAntPost();;
 
export const InfAnterioresPostForm = ( props ) => {
    //Extraemos las props que recibimos:
    const { close, onReload, infAnterioresPost } = props;
    
    //Obtenemos el accessToken de useAuth();
    const { accessToken } = useAuth();
 
    //Controlamos los datos del formulario con el hook useFormik:
    //Controlamos los datos del formulario con el hook useFormik:
    const formik = useFormik({
      initialValues: initialValues(infAnterioresPost),
      validationSchema: validationSchema(infAnterioresPost),
      validateOnChange: false,
      onSubmit: async ( formValue ) => {
        try {
           
            const data = {
              image1: formValue.image1,
              claim: formValue.claim,
              txt1: formValue.txt1,
              txt2: formValue.txt2,
              btnTxt: formValue.btnTxt,
              btnPath: `${formValue.btnPath}`,
              order: formValue.order,
              active: formValue.active,
              
            };

            if (!infAnterioresPost) {
              await  InfAnterioresPostController.createInfAntPost(accessToken, data);
            }else {
              await  InfAnterioresPostController.updateInfAntPost(accessToken, infAnterioresPost._id, data);
            }
            console.log('DATA', data)
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
 
    
     const { getRootProps: getRootPropsImage1, getInputProps: getInputPropsImage1 } = useDropzone({
       accept: {
         'image/*': ['.jpeg', '.jpg', '.png', '.svg']
       },
       onDrop: onDropImage1,
     })
 
     
    
    const getImage = () => {  
      if (formik.values.image1) {
        return  image1;

      } else if (formik.values?.image1) {
        return `${ENV.BASE_PATH}/${formik.values.image1}`;
      }
        return image.noImage;
    };

 
 
    return (
      <Form className="infAnterioresPost-form" onSubmit={formik.handleSubmit}>
            <div className="infAnterioresPost-form__images-wrapper">
                <div className="infAnterioresPost-form__images-wrapper__image" {...getRootPropsImage1()} >
                    <input {...getInputPropsImage1()} />
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
                <Form.TextArea
                    name="claim"
                    placeholder="Titulo"
                    onChange={formik.handleChange}
                    value={formik.values.claim}
                    error={formik.errors.claim}
                />
                <Form.TextArea
                    name="txt1"
                    placeholder="Texto1"
                    onChange={formik.handleChange}
                    value={formik.values.txt1}
                    error={formik.errors.txt1}
                />
                <Form.TextArea
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
            
            <Form.Group>
            <Form.Input 
                    name="btnTxt"
                    placeholder="Texto botón"
                    onChange={formik.handleChange}
                    value={formik.values.btnTxt}
                    error={formik.errors.btnTxt}
                />
              <Form.Input 
                  name="btnPath"
                  placeholder="URL"
                  fluid
                  onChange={ formik.handleChange }
                  value={ formik.values.btnPath }
                  error={ formik.errors.btnPath }
              />
            </Form.Group>
 
            <Form.Group/>

            <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
                {infAnterioresPost ? "Update Post" : "Create Post"}
            </Form.Button>
            
            <Form.Group/>
      </Form>
    )
}


