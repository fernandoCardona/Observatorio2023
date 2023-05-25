//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
import * as Yup from "yup";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:

export function initialValues(infAnterioresBlockTxt) {
    return {
        image1: infAnterioresBlockTxt?.image1 || '',
        image2: infAnterioresBlockTxt?.image2 || '',
        file: null,
        file2: null,
        txt: infAnterioresBlockTxt?.txt || "",
        order: infAnterioresBlockTxt?.order || 0,
        active: infAnterioresBlockTxt?.active || true,
        
    }
};

export function validationSchema(infAnterioresBlockTxt) {
    return Yup.object({
        image1: Yup.mixed(),
        image2: Yup.mixed(),
        txt: Yup.string().required(true),
        order: Yup.number().required(true),
    });
};