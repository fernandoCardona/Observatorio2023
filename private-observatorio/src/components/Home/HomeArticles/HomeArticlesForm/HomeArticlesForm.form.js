//IMPORTS DEPENDENCIAS DE TERCEROS:
import * as Yup from "yup";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
 
export function initialValues(homeArticle) {
    return {
        image1: homeArticle?.image1 || '',
        lottie: homeArticle?.lottie || '',
        file1: null,
        // file2: null,
        title: homeArticle?.title || "",
        txt1: homeArticle?.txt1 || "",
        txt2: homeArticle?.txt2 || "",
        btnPath: homeArticle?.btnPath || "",
        active: homeArticle?.active || true,
        order: homeArticle?.order || 0,
    }
};

export function validationSchema(homeArticle) {
    return Yup.object({
        image1: Yup.mixed(),
        lottie: Yup.mixed(),
        title: Yup.string().required(true),
        txt1: Yup.string().required(true),
        txt2: Yup.string().required(true),
        btnPath: Yup.string().required(true),
        order: Yup.number().required(true),
    });
};