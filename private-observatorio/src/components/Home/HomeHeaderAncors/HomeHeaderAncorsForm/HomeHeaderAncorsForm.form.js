
//IMPORTS DEPENDENCIAS DE TERCEROS:
import * as Yup from "yup";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
 
export function initialValues(homeHeaderAncor) {
    return {
        txt: homeHeaderAncor?.txt || "",
        path: homeHeaderAncor?.path || "",
        active: homeHeaderAncor?.active || true,
        order: homeHeaderAncor?.order || 0,
    }
};

export function validationSchema(homeHeaderAncor) {
    return Yup.object({
        txt: Yup.string().required(true),
        path: Yup.string().required(true),
        order: Yup.number().required(true),
    });
};