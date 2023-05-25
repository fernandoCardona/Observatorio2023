
//IMPORTS DEPENDENCIAS DE TERCEROS:
import * as Yup from "yup";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
 
export function initialValues(homeHeaderBox) {
    return {
        title: homeHeaderBox?.title || "",
        txt: homeHeaderBox?.txt || "",
        active: homeHeaderBox?.active || true,
        order: homeHeaderBox?.order || 0,
    }
};

export function validationSchema(homeHeaderBox) {
    return Yup.object({
        title: Yup.string().required(true),
        txt: Yup.string().required(true),
        order: Yup.number().required(true),
    });
};