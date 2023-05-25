//IMPORTS DE REACT:
import React, { useState, useEffect } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
//IMPORTS DEPENDENCIAS DE LA APP:
import { Social } from "../../../api";
//IMPORTS COMPONENTS DE LA APP:
import { SocialItem } from "../SocialItem";
//IMPORTS Styles DE LA APP:

const socialController = new Social();

export const ListSocials = (props) => {
    //Obtenemos las props
    const { active, reload, onReload } = props;
    const [socials, setSocials] = useState(null);

    useEffect(() => {
        (
            async() => {
                try {
                    setSocials(null);
                    const response = await socialController.getSocial(active);
                    setSocials(response);
                } catch (error) {
                    console.log(error);
                }
            }
        )();
    }, [active, reload]);

    if (!socials) return <Loader active inline="centered" />;
    if (size(socials) === 0) return "No hay ningun menu";

    return map( socials, (social) =><SocialItem key={social._id} social={social} onReload={ onReload}/>)
}