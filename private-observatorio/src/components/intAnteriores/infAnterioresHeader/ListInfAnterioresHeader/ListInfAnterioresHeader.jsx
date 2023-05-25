//IMPORTS DE REACT:
import React, { useState, useEffect } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
//IMPORTS DEPENDENCIAS DE LA APP:
import { InfAnterioresHeader } from "../../../../api";
//IMPORTS COMPONENTS DE LA APP:
import { InfAnterioresHeaderItem } from "../InfAnterioresHeaderItem";
//IMPORTS Styles DE LA APP:

const infAnterioresHeaderController = new InfAnterioresHeader();

export const ListInfAnterioresHeader = (props) => {
    //Obtenemos las props
    const { active, reload, onReload } = props;
    const [infAnterioresHeaders, setInfAnterioresHeader] = useState(null);
 
    useEffect(() => {
        (
            async() => {
                try {
                    setInfAnterioresHeader(null);
                    const response = await infAnterioresHeaderController.getInfAnterioresHeader(active);
                    setInfAnterioresHeader(response);
                } catch (error) {
                    console.log(error);
                }
            }
        )();
    }, [active, reload]);

    if (!infAnterioresHeaders) return <Loader active inline="centered" />;
    if (size(infAnterioresHeaders) === 0) return "No hay ningun menu";

    return map( infAnterioresHeaders, (infAnterioresHeader) =><InfAnterioresHeaderItem key={infAnterioresHeader._id} infAnterioresHeader={infAnterioresHeader} onReload={ onReload}/>)
}