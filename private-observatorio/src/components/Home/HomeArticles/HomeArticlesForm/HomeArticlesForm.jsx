//IMPORTS DE REACT:
import { useState, useCallback } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Form, Dropdown, Input, TextArea, Image } from "semantic-ui-react";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
//IMPORTS DEPENDENCIAS DE LA APP:
import { initialValues, validationSchema } from "./HomeArticlesForm.form.js";
import { HomeArticles } from "../../../../api/";
import { useAuth } from "../../../../hooks";
import { ENV } from "../../../../utils";
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import { image } from "../../../../assets";
import './HomeArticlesForm.scss';

const homeArticlesController = new HomeArticles();
 
export const HomeArticlesForm = ( props ) => {
    //Extraemos las props que recibimos:
    const { close, onReload, homeArticle } = props;
    
    //Obtenemos el accessToken de useAuth();
    const { accessToken } = useAuth();
 
    //Controlamos los datos del formulario con el hook useFormik:
    //Controlamos los datos del formulario con el hook useFormik:
    const formik = useFormik({
      initialValues: initialValues(homeArticle),
      validationSchema: validationSchema(homeArticle),
      validateOnChange: false,
      onSubmit: async ( formValue ) => {
        try {
           
            const data = {
              image1: formValue.image1,
              lottie: formValue.lottie,
              title: formValue.title,
              txt1: formValue.txt1,
              txt2: formValue.txt2,
              btnPath: `${formValue.btnPath}`,
              order: formValue.order,
              active: formValue.active,
              
            };

            if (!homeArticle) {
              await homeArticlesController.createHomeArticle(accessToken, data);
            }else {
              await homeArticlesController.updateHomeArticle(accessToken, homeArticle._id, data);
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
      <Form className="homeArticle-form" onSubmit={formik.handleSubmit}>
            <div className="homeArticle-form__images-wrapper">
                <div className="homeArticle-form__images-wrapper__image" {...getRootPropsImage1()} >
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
                    name="title"
                    placeholder="Titulo"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    error={formik.errors.title}
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
                <Form.Input 
                  name="lottie"
                  type="file"
                  accept=".json"
                  placeholder="Lottie"
                  onChange={(event) => {
                    formik.setFieldValue("lottie", event.currentTarget.files[0]);
                  }}
                  error={formik.errors.lottie}
                />  
                
            </Form.Group>
            
            <Form.Group>
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
                {homeArticle ? "Update Article" : "Create Article"}
            </Form.Button>
            
            <Form.Group/>
      </Form>
    )
}


