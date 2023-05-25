//IMPORTS DE REACT:
import React, { useState, useEffect } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
//IMPORTS DEPENDENCIAS DE LA APP:
import { SobreInformeHeader } from "../../../../api";
//IMPORTS COMPONENTS DE LA APP:
import { SobreInformeHeaderItem } from "../SobreInformeHeaderItem";
//IMPORTS Styles DE LA APP:

const sobreInformeHeaderController = new SobreInformeHeader();

export const ListSobreInformeHeader = (props) => {
    //Obtenemos las props
    const { active, reload, onReload } = props;
    const [sobreInformeHeaders, setSobreInformeHeader] = useState(null);
 
    useEffect(() => {
        (
            async() => {
                try {
                    setSobreInformeHeader(null);
                    const response = await sobreInformeHeaderController.getSobreInformeHeader(active);
                    setSobreInformeHeader(response);
                } catch (error) {
                    console.log(error);
                }
            }
        )();
    }, [active, reload]);

    if (!sobreInformeHeaders) return <Loader active inline="centered" />;
    if (size(sobreInformeHeaders) === 0) return "No hay ningun menu";

    return map( sobreInformeHeaders, (sobreInformeHeader) =><SobreInformeHeaderItem key={sobreInformeHeader._id} sobreInformeHeader={sobreInformeHeader} onReload={ onReload}/>)
}