//IMPORTS DEPENDENCIAS DE TERCEROS:
import * as Yup from "yup";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
 
export function initialValues(infAnterioresHeader) {
    return {
        image: infAnterioresHeader?.image || '',
        file: null,
        claim: infAnterioresHeader?.claim || "",     
        order: infAnterioresHeader?.order || 0,
        active: infAnterioresHeader?.active || true,
    }
};

export function validationSchema(infAnterioresHeader) {
    return Yup.object({
        image: Yup.mixed(),
        claim: Yup.string().required(true),
        order: Yup.number().required(true),
    });
};