//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS DE TERCEROS:
import * as Yup from "yup";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:

export function initialValues(menu) {
    return {
        navImage1: menu?.navImage1 || '',
        navImage2: menu?.navImage2 || '',
        file: null,
        file2: null,
        title: menu?.title || "",
        path: menu?.path || "",
        protocol: "https://",
        active: menu?.active || true,
        order: menu?.order || 0,
    }
};

export function validationSchema(menu) {
    return Yup.object({
        navImage1: Yup.mixed(),
        navImage2: Yup.mixed(),
        title: Yup.string().required(true),
        path: Yup.string().required(true),
        order: Yup.number().required(true),
    });
};