//IMPORTS DEPENDENCIAS DE TERCEROS:
import * as Yup from "yup";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
 
export function initialValues(homeHeader) {
    return {
        video: homeHeader?.video || '',
        file: null,
        title: homeHeader?.claim || "",
        claim: homeHeader?.claim || "",
        subTitle: homeHeader?.subTitle || "",
        txt: homeHeader?.txt || "",
        active: homeHeader?.active || true,
        order: homeHeader?.order || 0,
    }
};

export function validationSchema(homeHeader) {
    return Yup.object({
        video: Yup.mixed(),
        claim: Yup.string().required(true),
        subTitle: Yup.string().required(true),
        txt: Yup.string().required(true),
        order: Yup.number().required(true),
    });
};