//IMPORTS DEPENDENCIAS DE TERCEROS:
import * as Yup from "yup";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
 
export function initialValues(footerLogo) {
    return {
        image: footerLogo?.image1 || '',
        file: null,
        title: footerLogo?.title || "",
        path: footerLogo?.path || "",
        protocol: "https://",
        active: footerLogo?.active || true,
        order: footerLogo?.order || 0,
    }
};

export function validationSchema(footerLogo) {
    return Yup.object({
        image: Yup.mixed(),
        title: Yup.string().required(true),
        path: Yup.string().required(true),
        order: Yup.number().required(true),
    });
};