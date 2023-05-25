//IMPORTS DEPENDENCIAS DE TERCEROS:
import * as Yup from "yup";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
 
export function initialValues(sobreInformeHeader) {
    return {
        image: sobreInformeHeader?.image || '',
        file: null,
        claim: sobreInformeHeader?.claim || "",     
        order: sobreInformeHeader?.order || 0,
        active: sobreInformeHeader?.active || true,
    }
};

export function validationSchema(sobreInformeHeader) {
    return Yup.object({
        image: Yup.mixed(),
        claim: Yup.string().required(true),
        order: Yup.number().required(true),
    });
};