//IMPORTS DE REACT:
import React, { useState, useEffect } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
//IMPORTS DEPENDENCIAS DE LA APP:
import { Pdf } from "../../../api";
//IMPORTS COMPONENTS DE LA APP:
import { PdfItem } from "../PdfItem";
//IMPORTS Styles DE LA APP:

const pdfController = new Pdf();

export const ListPdfs = (props) => {
    //Obtenemos las props
    const { active, reload, onReload } = props;
    const [pdfs, setPdfs] = useState(null);
 
    useEffect(() => {
        (
            async() => {
                try {
                    setPdfs(null);
                    const response = await pdfController.getPdf(active);
                    setPdfs(response);
                } catch (error) {
                    console.log(error);
                }
            }
        )();
    }, [active, reload]);

    if (!pdfs) return <Loader active inline="centered" />;
    if (size(pdfs) === 0) return "No hay ningun menu";

    return map( pdfs, (pdf) =><PdfItem key={pdf._id} pdf={pdf} onReload={ onReload}/>)
}