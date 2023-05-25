//IMPORTS DE REACT:
import { useCallback } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Form, Image } from "semantic-ui-react";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
//IMPORTS DEPENDENCIAS DE LA APP:
import { initialValues, validationSchema } from "./UserForm.form";
import { User } from "../../../api/user";
import { useAuth } from "../../../hooks";
import { ENV } from "../../../utils";
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import { image } from "../../../assets";
import './UseForm.scss';



const userController = new User();
 

export const UserForm = ( props ) => {
    //Extraemos las props que recibimos:
    const { close, onReload, user } = props;
    //Obtenemos el accessToken de useAuth();
    const { accessToken } = useAuth();

    //Controlamos los datos del formulario con el hook useFormik:
    const formik = useFormik({
      initialValues: initialValues(user),
      validationSchema: validationSchema(user),
      validateOnChange: false,
      onSubmit: async ( formValue ) => {
        try {
            if (!user) {
              await userController.createUser(accessToken, formValue);
            }else {
              await userController.updateUser(accessToken, user._id, formValue);
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
    const onDrop = useCallback((acceptedFiles) => {
      const file = acceptedFiles[0];
      formik.setFieldValue("avatar", URL.createObjectURL(file));
      formik.setFieldValue("fileAvatar", file);
     

    });
    const { getRootProps, getInputProps } = useDropzone({
      accept: {
        'image/*': ['.jpeg', '.jpg', '.png']
      },
      onDrop,
    });
    const getAvatar = () => {
      if (formik.values.fileAvatar) {
        return formik.values.avatar;

      } else if (formik.values.avatar) {
        return `${ENV.BASE_PATH}/${formik.values.avatar}`;
      }
      
      return image.noAvatar;
    };

    return (
      <Form className="user-form" onSubmit={formik.handleSubmit}>
            <div className="user-form__avatar" { ...getRootProps()}>
                <input {...getInputProps()} />
                <Image avatar size='small' src={ getAvatar() }/>
            </div>
            <Form.Group widths="equal">
                <Form.Input
                    name="firstname"
                    placeholder="Firstname"
                    onChange={formik.handleChange}
                    value={formik.values.firstname}
                    error={formik.errors.firstname}
                />
                <Form.Input
                    name="lastname"
                    placeholder="Lastname"
                    onChange={formik.handleChange}
                    value={formik.values.lastname}
                    error={formik.errors.lastname}
                />
            </Form.Group>
                <Form.Input
                    name="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.errors.email}
                />
            <Form.Group widths="equal">
            <Form.Dropdown
                name='company'
                placeholder="Empresa"
                options={companyOptions}
                selection
                onChange={(_, data) => formik.setFieldValue("company", data.value)}
                value={formik.values.company}
                error={formik.errors.company}
                />
                <Form.Dropdown
                placeholder="Select role"
                options={roleOptions}
                selection
                onChange={(_, data) => formik.setFieldValue("role", data.value)}
                value={formik.values.role}
                error={formik.errors.role}
                />
            </Form.Group>

            <Form.Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                error={formik.errors.password}
            />

            <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
                {user ? "Update user" : "Create user"}
            </Form.Button>

      </Form>
    )
}

const roleOptions = [ 
  { 
    key: 'user',
    text: 'Usuario',
    value: 'user'
  },
  { 
    key: 'admin',
    text: 'Administrator',
    value: 'admin'
  }
]

const companyOptions = [ 
    { 
      key: 'bestinver',
      text: 'Bestinver',
      value: 'bestinver'
    },
    { 
      key: 'theLion',
      text: 'Lion Robotics',
      value: 'theLion'
    }
  ]