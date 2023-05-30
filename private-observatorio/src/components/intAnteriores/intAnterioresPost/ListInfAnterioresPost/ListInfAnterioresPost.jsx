//IMPORTS DE REACT:
import React, { useState, useEffect } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
//IMPORTS DEPENDENCIAS DE LA APP:
import { InfAntPost } from "../../../../api";
//IMPORTS COMPONENTS DE LA APP:
import { InfAnterioresPostItem } from "../InfAnterioresPostItem";
//IMPORTS Styles DE LA APP:

const InfAnterioresPostController = new InfAntPost();

export const ListInfAnterioresPost = (props) => {
    //Obtenemos las props
    const { active, reload, onReload } = props;
    const [infAnterioresPosts, setIinfAnterioresPosts] = useState(null);
 
    useEffect(() => {
        (
            async() => {
                try {
                    setIinfAnterioresPosts(null);
                    const response = await InfAnterioresPostController.getInfAntPosts(active);
                    setIinfAnterioresPosts(response);
                } catch (error) {
                    console.log(error);
                }
            }
        )();
    }, [active, reload]);

    if (!infAnterioresPosts) return <Loader active inline="centered" />;
    if (size(infAnterioresPosts) === 0) return "No hay ningun menu";

    return map( infAnterioresPosts, (infAnterioresPost) =><InfAnterioresPostItem key={infAnterioresPost._id} infAnterioresPost={infAnterioresPost} onReload={ onReload}/>)
}