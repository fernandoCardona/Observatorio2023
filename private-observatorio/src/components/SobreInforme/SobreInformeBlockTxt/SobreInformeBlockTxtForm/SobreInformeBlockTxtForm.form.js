//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
import * as Yup from "yup";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:

export function initialValues(sobreInformeBlockTxt) {
    return {
        image1: sobreInformeBlockTxt?.image1 || '',
        image2: sobreInformeBlockTxt?.image2 || '',
        file: null,
        file2: null,
        txt1: sobreInformeBlockTxt?.txt1 || "",
        txt2: sobreInformeBlockTxt?.txt2 || "",
        order: sobreInformeBlockTxt?.order || 0,
        active: sobreInformeBlockTxt?.active || true,
        
    }
};

export function validationSchema(sobreInformeBlockTxt) {
    return Yup.object({
        image1: Yup.mixed(),
        image2: Yup.mixed(),
        txt1: Yup.string().required(true),
        txt2: Yup.string().required(true),
        order: Yup.number().required(true),
    });
};