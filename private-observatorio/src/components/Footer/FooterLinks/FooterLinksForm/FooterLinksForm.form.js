//IMPORTS DEPENDENCIAS DE TERCEROS:
import * as Yup from "yup";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
 
export function initialValues(footerLinks) {
    return {
        title: footerLinks?.title || "",
        path: footerLinks?.path || "",
        active: footerLinks?.active || true,
        order: footerLinks?.order || 0,
    }
};

export function validationSchema(footerLinks) {
    return Yup.object({
        title: Yup.string().required(true),
        path: Yup.string().required(true),
        order: Yup.number().required(true),
        active: Yup.boolean(),
    });
};