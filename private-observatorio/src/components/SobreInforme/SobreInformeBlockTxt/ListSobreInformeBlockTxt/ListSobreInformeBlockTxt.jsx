//IMPORTS DE REACT:
import React, { useState, useEffect } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
//IMPORTS DEPENDENCIAS DE LA APP:
import { SobreInformeBlockTxt } from "../../../../api";
//IMPORTS COMPONENTS DE LA APP:
import { SobreInformeBlockTxtItem } from "../SobreInformeBlockTxtItem";
//IMPORTS Styles DE LA APP:

const sobreInformeBlockTxtController = new SobreInformeBlockTxt();

export const ListSobreInformeBlockTxt = (props) => {
    //Obtenemos las props
    const { active, reload, onReload } = props;
    const [sobreInformeBlockTxts, setSobreInformeBlockTxt] = useState(null);
 
    useEffect(() => {
        (
            async() => {
                try {
                    setSobreInformeBlockTxt(null);
                    const response = await sobreInformeBlockTxtController.getSobreInformeBlockTxt(active);
                    setSobreInformeBlockTxt(response);
                } catch (error) {
                    console.log(error);
                }
            }
        )();
    }, [active, reload]);

    if (!sobreInformeBlockTxts) return <Loader active inline="centered" />;
    if (size(sobreInformeBlockTxts) === 0) return "No hay ningun menu";

    return map( sobreInformeBlockTxts, (sobreInformeBlockTxt) =><SobreInformeBlockTxtItem key={sobreInformeBlockTxt._id} sobreInformeBlockTxt={sobreInformeBlockTxt} onReload={ onReload}/>)
}