
//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
//IMPORTS DEPENDENCIAS DE LA APP:
import * as Yup from "yup";
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:

export function initialValues() {
    return {
      email: "",
      company: "",
      password: "",
    };
 }
 
export function validationSchema() {
    return Yup.object({
        email: Yup.string()
                .email("El email no es valido")
                .required("Campo obligatorio"),
        company: Yup.string()
                .required("Campo obligatorio"),
        password: Yup.string().required("Campo obligatorio"),
        
    });
}