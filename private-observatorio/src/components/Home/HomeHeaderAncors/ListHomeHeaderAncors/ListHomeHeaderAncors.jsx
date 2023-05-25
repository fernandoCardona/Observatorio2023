//IMPORTS DE REACT:
import React, { useState, useEffect } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
//IMPORTS DEPENDENCIAS DE LA APP:
import { HomeHeaderAncors } from "../../../../api";

//IMPORTS COMPONENTS DE LA APP:
import { HomeHeaderAncorsItem } from "../HomeHeaderAncorsItem";
//IMPORTS Styles DE LA APP:

const homeHeaderAncorsController = new HomeHeaderAncors();

export const ListHomeHeaderAncors = (props) => {
    //Obtenemos las props
    const { active, reload, onReload } = props;
    const [homeHeaderAncors, setHomeHeaderAncors] = useState(null);
    
    useEffect(() => {
        (
            async() => {
                try {
                    setHomeHeaderAncors(null);
                    const response = await homeHeaderAncorsController.getHomeHeaderAncors(active);
                    setHomeHeaderAncors(response);
                } catch (error) {
                    console.log(error);
                }
            }
        )();
    }, [active, reload]);

    if (!homeHeaderAncors) return <Loader active inline="centered" />;
    if (size(homeHeaderAncors) === 0) return "No hay ningun menu";
 
    return map( homeHeaderAncors, (homeHeaderAncor) =><HomeHeaderAncorsItem key={homeHeaderAncor._id} homeHeaderAncor={homeHeaderAncor} onReload={ onReload}/>)
}