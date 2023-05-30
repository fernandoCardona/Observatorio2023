//IMPORTS DEPENDENCIAS DE TERCEROS:
import * as Yup from "yup";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
 
export function initialValues(infAnterioresPost) {
    return {
        image1: infAnterioresPost?.image1 || '',
        file1: null,
        // file2: null,
        claim: infAnterioresPost?.claim || "",
        txt1: infAnterioresPost?.txt1 || "",
        txt2: infAnterioresPost?.txt2 || "",
        btnTxt: infAnterioresPost?.btnTxt || "",
        btnPath: infAnterioresPost?.btnPath || "",
        active: infAnterioresPost?.active || true,
        order: infAnterioresPost?.order || 0,
    }
};

export function validationSchema(infAnterioresPost) {
    return Yup.object({
        image1: Yup.mixed(),
        claim: Yup.string().required(true),
        txt1: Yup.string().required(true),
        txt2: Yup.string().required(true),
        btnTxt: Yup.string().required(true),
        btnPath: Yup.string().required(true),
        order: Yup.number().required(true),
    });
};