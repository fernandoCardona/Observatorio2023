
//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
 
//IMPORTS DEPENDENCIAS DE LA APP:
import * as Yup from "yup";
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
 
export function initialValues() {
    return {
        firstname:"",
        lastname:"",
        company:"",
        email: "",
        password: "",
        repeatPassword: "",
        conditionsAccepted: false,
    };
}

export function validationSchema() {
    return Yup.object({
        firstname: Yup.string()
                  .required("Campo obligatorio"),
        lastname: Yup.string()
                  .required("Campo obligatorio"),
        company:  Yup.string()
                  .required("Campo obligatorio"),
        email: Yup.string()
                .email("The email is not valid")
                .required("Campo obligatorio"),
        password: Yup.string().required("Campo obligatorio"),
        repeatPassword: Yup.string()
                .required("Campo obligatorio")
                .oneOf([Yup.ref("password")], "Los passwords han de ser iguales"),
        conditionsAccepted: Yup.bool().isTrue(true),
    });
}