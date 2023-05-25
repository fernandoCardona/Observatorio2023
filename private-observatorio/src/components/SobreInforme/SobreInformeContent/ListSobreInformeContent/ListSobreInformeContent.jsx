//IMPORTS DE REACT:
import React, { useState, useEffect } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
//IMPORTS DEPENDENCIAS DE LA APP:
import { SobreInformeContent } from "../../../../api";
//IMPORTS COMPONENTS DE LA APP:
import { SobreInformeContentItem } from "../SobreInformeContentItem";
//IMPORTS Styles DE LA APP:

const sobreInformeContentController = new SobreInformeContent();

export const ListSobreInformeContent = (props) => {
    //Obtenemos las props
    const { active, reload, onReload } = props;
    const [sobreInformeContents, setSobreInformeContent] = useState(null);
 
    useEffect(() => {
        (
            async() => {
                try {
                    setSobreInformeContent(null);
                    const response = await sobreInformeContentController.getSobreInformeContent(active);
                    setSobreInformeContent(response);
                } catch (error) {
                    console.log(error);
                }
            }
        )();
    }, [active, reload]);

    if (!sobreInformeContents) return <Loader active inline="centered" />;
    if (size(sobreInformeContents) === 0) return "No hay ningun menu";

    return map( sobreInformeContents, (sobreInformeContent) =><SobreInformeContentItem key={sobreInformeContent._id} sobreInformeContent={sobreInformeContent} onReload={ onReload}/>)
}