//IMPORTS DEPENDENCIAS DE TERCEROS:
import * as Yup from "yup";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
 
export function initialValues(pdf) {
    return {
        pdfName: pdf ? pdf.pdfName : "",
        pdf: null,
        btnPath: pdf ? pdf.btnPath : "",
        order: pdf ? pdf.order : 0,
        active: pdf ? pdf.active : false,
    }
};

export function validationSchema(pdf) {
    return Yup.object({
        pdf: Yup.mixed(),
        pdfName: Yup.string().required(true),
        //btnPath: Yup.string().required(true),
        order: Yup.number().required(true),
    });
};