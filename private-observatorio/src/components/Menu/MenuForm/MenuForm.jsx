import { useState, useCallback } from "react";
import { Form, Dropdown, Input, Image } from "semantic-ui-react";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import { ENV } from '../../../utils';
import { Menu } from "../../../api";
import { useAuth } from "../../../hooks";
import { initialValues, validationSchema } from "./MenuForm.form";
import './MenuForm.scss';

const menuController = new Menu();

export const MenuForm = ( props ) => {
    const { onClose, onReload, menu } = props;
    const { accessToken } = useAuth();
    
    const formik = useFormik({
      initialValues: {
          ...initialValues(menu),
          navImage1File: null,
          navImage2File: null,
      },
      validationSchema: validationSchema(),
      validateOnChange: false,
      onSubmit: async (formValue) => {
        try {
          const data = {
            title: formValue.title,
          //path: `${formValue.protocol}${formValue.path}`,
            path: `${formValue.path}`,
            order: formValue.order,
            active: formValue.active,
            navImage1: formValue.navImage1,
            navImage2: formValue.navImage2,
          };
  
          if (menu) {
            data.path = formValue.path;
            await menuController.updateMenu(accessToken, menu._id, data);

          } else {
            await menuController.createMenu(accessToken, data); 

          }
  
          onReload();
          onClose();
        } catch (error) {
              console.error(error);
        }
      },
  });
  
    // First dropzone for the first image
    const [navImage1, setNavImage1] = useState(null);
    const onDropNavImage1 = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        setNavImage1(URL.createObjectURL(file));
        formik.setFieldValue("navImage1", file);
    });

    // Second dropzone for the second image
    const [navImage2, setNavImage2] = useState(null);
    const onDropNavImage2 = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        setNavImage2(URL.createObjectURL(file));
        formik.setFieldValue("navImage2", file);
    });
    
    const { getRootProps: getRootPropsNavImage1, getInputProps: getInputPropsNavImage1 } = useDropzone({
      accept: {
        'image/*': ['.jpeg', '.jpg', '.png', '.svg']
      },
      onDrop: onDropNavImage1,
    })

    const { getRootProps: getRootPropsNavImage2, getInputProps: getInputPropsNavImage2 } = useDropzone({
      accept: {
        'image/*': ['.jpeg', '.jpg', '.png', '.svg']
      },
      onDrop: onDropNavImage2,
    })

    const getMiniature = () => {
        if (formik.values.navImage1) {
            return navImage1;
        } else if (formik.values.navImage1) {
            return `${ENV.BASE_PATH}/${formik.values.navImage1}`;
        }
        return null;
    };

    const getMiniature2 = () => {
        if (formik.values.navImage2) {
            return navImage2;
        } else if (formik.values.navImage2) {
            return `${ENV.BASE_PATH}/${formik.values.navImage2}`;
        }
        return null;
    };


    return (
        <Form onSubmit={ formik.handleSubmit } className="menu-From">
            <Form.Group width="equal">
              <div className="menu-form__miniature">
                <div className="menu-form__miniature1" {...getRootPropsNavImage1()} >
                    <input {...getInputPropsNavImage1()} />
                    {
                        getMiniature() 
                        ? ( <Image size="small" src={getMiniature()} /> ) 
                        : ( <div>
                                <span>Drop Here Miniature</span>
                            </div> )
                    }
                </div>

                <div className="menu-form__miniature1" {...getRootPropsNavImage2()} >
                    <input {...getInputPropsNavImage2()} />
                    {
                        getMiniature2() 
                        ? ( <Image size="small" src={getMiniature2()} /> ) 
                        : ( <div>
                                <span>Drop Here Miniature</span>
                            </div> )
                    }
                </div>
                

              </div>
            </Form.Group>
            <Form.Group width="equal">
                <Form.Input 
                    name='title' 
                    placeholder="Titulo"
                    onChange={ formik.handleChange }
                    value={ formik.values.title }
                    error={ formik.errors.title }
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
                //     !menu ? (   <Dropdown  
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

            <br/> 

            <Form.Button type="submit" primary fluid loading={ formik.isSubmitting }>
                { menu ? "Update menu" : "Create Menu" }
            </Form.Button>
        </Form>
    )
}

const options = [
    { key: "https://", text: "https://", value: "https://" },
    { key: "http://", text: "http://", value: "http://" },
    { key: "/", text: "/", value: "/" },
  ];
