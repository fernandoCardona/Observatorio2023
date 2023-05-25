//IMPORTS DE REACT:
import { useState, useCallback } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Form, Input, Image, Embed } from "semantic-ui-react";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import ReactPlayer from 'react-player';
//IMPORTS DEPENDENCIAS DE LA APP:
import { initialValues, validationSchema } from "./HomeHeaderForm.form.js";
import { HomeHeader } from '../../../../api';
import { useAuth } from "../../../../hooks";
import { ENV } from "../../../../utils";
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import { image } from "../../../../assets";
import './HomeHeaderForm.scss';



const HomeHeaderController = new HomeHeader();
 

export const HomeHeaderForm = ( props ) => {
    //Extraemos las props que recibimos:
    const { close, onReload, homeHeader } = props;
    //Obtenemos el accessToken de useAuth();
    const { accessToken } = useAuth();
 
    //Controlamos los datos del formulario con el hook useFormik:
    const formik = useFormik({
      initialValues: initialValues(homeHeader),
      validationSchema: validationSchema(homeHeader),
      validateOnChange: false,
      onSubmit: async ( formValue ) => {
        try {
           
            const data = {
              video: formValue.video,
              title: formValue.claim,
              claim: formValue.claim,
              subTitle: formValue.subTitle,
              txt: formValue.txt,
              order: formValue.order,
              active: formValue.active,

            };

            if (!homeHeader) {
              await HomeHeaderController.createHomeHeader(accessToken, data);
            }else {
              await HomeHeaderController.updateHomeHeader(accessToken, homeHeader._id, data);
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
     const [video, setVideo] = useState(null);
     const onDropVideo = useCallback((acceptedFiles) => {
         const file = acceptedFiles[0];
         setVideo(URL.createObjectURL(file));
         formik.setFieldValue("video", file);
          
         //console.log('file', file)
     });
  
     
     const { getRootProps: getRootPropsImage, getInputProps: getInputPropsImage } = useDropzone({
        accept: {
          'image/*': ['.mp4', '.mov', '.avi']
        },
        onDrop: onDropVideo,
     })
 
     
    
    const getVideo = () => {  
      if (formik.values?.video) {
        return  video;
      } else if (formik.values.video) {
        //console.log('formik.values.video', formik.values.video)
        return `${ENV.BASE_PATH}/${formik.values.video}`;
      }
        return image.noImage;
    };
 
    
    return (
      <Form className="homeHeader-form" onSubmit={formik.handleSubmit}>
            <div className="homeHeader-form__images-wrapper">
                <div className="homeHeader-form__images-wrapper__image" {...getRootPropsImage()} >
                    <input {...getInputPropsImage()} />
                    {
                        getVideo() 
                        ? ( 
                          <ReactPlayer
                            url={getVideo()}
                            controls
                            width="100%"
                            height="100%"
                          />
                          )
                        : (  
                            <div>
                              <span>Drop Here video</span>
                            </div> 
                         ) 
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
                    name="subTitle"
                    placeholder="Subtitulo"
                    onChange={formik.handleChange}
                    value={formik.values.subTitle}
                    error={formik.errors.subTitle}
                />
                <Form.Input
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
                {homeHeader ? "Update homeHeader" : "Create homeHeader"}
            </Form.Button>
            
            <Form.Group/>
      </Form>
    )
}


