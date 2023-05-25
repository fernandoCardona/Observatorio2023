//IMPORTS DE REACT:
import React, { useState, useEffect } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
//IMPORTS DEPENDENCIAS DE LA APP:
import { HomeHeader } from "../../../../api";
//IMPORTS COMPONENTS DE LA APP:
import { HomeHeaderItem } from "../HomeHeaderItem";
//IMPORTS Styles DE LA APP:

const homeHeaderController = new HomeHeader();

export const ListHomeHeader = (props) => {
    //Obtenemos las props
    const { active, reload, onReload } = props;
    const [homeHeaders, setHomeHeaders] = useState(null);

    useEffect(() => {
        (
            async() => {
                try {
                    setHomeHeaders(null);
                    const response = await homeHeaderController.getHomeHeader(active);
                    //console.log(response)
                    setHomeHeaders(response);
                } catch (error) {
                    console.log(error);
                }
            }
        )();
    }, [active, reload]);

    if (!homeHeaders) return <Loader active inline="centered" />;
    if (size(homeHeaders) === 0) return "No hay ningun menu";

    return map( homeHeaders, (homeHeader) =><HomeHeaderItem key={homeHeader._id} homeHeader={homeHeader} onReload={ onReload}/>)
}