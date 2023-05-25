//IMPORTS DEPENDENCIAS DE TERCEROS:
import * as Yup from "yup";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
 
export function initialValues(sobreInformeContent) {
    return {
        title: sobreInformeContent?.title || '',
        subtitle1: sobreInformeContent?.subtitle1 || '',
        content1: sobreInformeContent?.content1 || '',
        subtitle2: sobreInformeContent?.subtitle2 || '',
        content2: sobreInformeContent?.content2 || '',
        subtitle3: sobreInformeContent?.subtitle3 || '',
        content3: sobreInformeContent?.content3 || '',
        subtitle4: sobreInformeContent?.subtitle4 || '',
        content4: sobreInformeContent?.content4 || '',
        subtitle5: sobreInformeContent?.subtitle5 || '',
        content5: sobreInformeContent?.content5 || '',
        subtitle6: sobreInformeContent?.subtitle6 || '',
        content6: sobreInformeContent?.content6 || '',
        subtitle7: sobreInformeContent?.subtitle7 || '',
        content7: sobreInformeContent?.content7 || '',
        subtitle8: sobreInformeContent?.subtitle8 || '',
        content8: sobreInformeContent?.content8 || '', 
        btnTxt: sobreInformeContent?.btnTxt,    
        order: sobreInformeContent?.order || 0,
        active: sobreInformeContent?.active || true,
    }
};

export function validationSchema(sobreInformeContent) {
    return Yup.object({
      
        title: Yup.string().required(true),
        subtitle1: Yup.string(),
        content1: Yup.string(),
        subtitle2: Yup.string(),
        content2: Yup.string(),
        subtitle3: Yup.string(),
        content3: Yup.string(),
        subtitle4: Yup.string(),
        content4: Yup.string(),
        subtitle5: Yup.string(),
        content5: Yup.string(),
        subtitle6: Yup.string(),
        content6: Yup.string(),
        subtitle7: Yup.string(),
        content7: Yup.string(),
        subtitle8: Yup.string(),
        content8: Yup.string(),
        btnTxt: Yup.string().required(true),
        order: Yup.number().required(true),
    });
};