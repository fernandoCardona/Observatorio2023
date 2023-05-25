//IMPORTS DE REACT:
import React, { useState, useEffect } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
//IMPORTS DEPENDENCIAS DE LA APP:
import { HomeHeaderBox } from "../../../../api";

//IMPORTS COMPONENTS DE LA APP:
import { HomeHeaderBoxItem } from "../HomeHeaderBoxItem";
//IMPORTS Styles DE LA APP:

const homeHeaderBoxController = new HomeHeaderBox();

export const ListHomeHeaderBox = (props) => {
    //Obtenemos las props
    const { active, reload, onReload } = props;
    const [homeHeaderBox, setHomeHeaderBox] = useState(null);
    
    useEffect(() => {
        (
            async() => {
                try {
                    setHomeHeaderBox(null);
                    const response = await homeHeaderBoxController.getHomeHeaderBox(active);
                    console.log(response)
                    setHomeHeaderBox(response);
                } catch (error) {
                    console.log(error);
                }
            }
        )();
    }, [active, reload]);

    if (!homeHeaderBox) return <Loader active inline="centered" />;
    if (size(homeHeaderBox) === 0) return "No hay ningun menu";
 
    return map( homeHeaderBox, (homeHeaderBox) =><HomeHeaderBoxItem key={homeHeaderBox._id} homeHeaderBox={homeHeaderBox} onReload={ onReload}/>)
}