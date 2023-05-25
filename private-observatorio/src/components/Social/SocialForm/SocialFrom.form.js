
//IMPORTS DEPENDENCIAS DE TERCEROS:
import * as Yup from "yup";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
 
export function initialValues(social) {
    return {
        image1: social?.image1 || '',
        image2: social?.image2 || '',
        file1: null,
        file2: null,
        title: social?.title || "",
        path: social?.path || "",
        protocol: "https://",
        active: social?.active || true,
        order: social?.order || 0,
    }
};

export function validationSchema(social) {
    return Yup.object({
        image1: Yup.mixed(),
        image2: Yup.mixed(),
        title: Yup.string().required(true),
        path: Yup.string().required(true),
        order: Yup.number().required(true),
    });
};