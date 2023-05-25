//IMPORTS DE REACT:
import React, { useState, useEffect } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
//IMPORTS DEPENDENCIAS DE LA APP:
import { InfAnterioresBlockTxt } from "../../../../api";
//IMPORTS COMPONENTS DE LA APP:
import { InfAnterioresBlockTxtItem } from "../InfAnterioresBlockTxtItem";
//IMPORTS Styles DE LA APP:

const infAnterioresBlockTxtController = new InfAnterioresBlockTxt();

export const ListInfAnterioresBlockTxt = (props) => {
    //Obtenemos las props
    const { active, reload, onReload } = props;
    const [infAnterioresBlockTxts, setInfAnterioresBlockTxt] = useState(null);
 
    useEffect(() => {
        (
            async() => {
                try {
                    setInfAnterioresBlockTxt(null);
                    const response = await infAnterioresBlockTxtController.getInfAnterioresBlockTxt(active);
                    setInfAnterioresBlockTxt(response);
                } catch (error) {
                    console.log(error);
                }
            }
        )();
    }, [active, reload]);

    if (!infAnterioresBlockTxts) return <Loader active inline="centered" />;
    if (size(infAnterioresBlockTxts) === 0) return "No hay ningun menu";

    return map( infAnterioresBlockTxts, (infAnterioresBlockTxt) =><InfAnterioresBlockTxtItem key={infAnterioresBlockTxt._id} infAnterioresBlockTxt={infAnterioresBlockTxt} onReload={ onReload}/>)
}