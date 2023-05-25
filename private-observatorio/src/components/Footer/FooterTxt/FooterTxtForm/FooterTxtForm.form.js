//IMPORTS DEPENDENCIAS DE TERCEROS:
import * as Yup from "yup";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
 
export function initialValues(footerTxt) {
    return {
        txt: footerTxt?.txt || "",
        active: footerTxt?.active || true,
        order: footerTxt?.order || 0,
    }
};

export function validationSchema(footerTxt) {
    return Yup.object({
        txt: Yup.string().required(true),
        order: Yup.number().required(true),
        active: Yup.boolean(),
    });
};