//IMPORTS DE REACT:
import React, { useState, useEffect } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
//IMPORTS DEPENDENCIAS DE LA APP:
import { FooterLogo } from "../../../../api";
//IMPORTS COMPONENTS DE LA APP:
import { FooterLogoItem } from "../FooterLogoItem";
//IMPORTS Styles DE LA APP:

const footerLogoController = new FooterLogo();

export const ListFooterLogo = (props) => {
    //Obtenemos las props
    const { active, reload, onReload } = props;
    const [footerLogos, setFooterLogos] = useState(null);

    useEffect(() => {
        (
            async() => {
                try {
                    setFooterLogos(null);
                    const response = await footerLogoController.getFooterLogo(active);
                    //console.log(response)
                    setFooterLogos(response);
                } catch (error) {
                    console.log(error);
                }
            }
        )();
    }, [active, reload]);

    if (!footerLogos) return <Loader active inline="centered" />;
    if (size(footerLogos) === 0) return "No hay ningun menu";

    return map( footerLogos, (footerLogo) =><FooterLogoItem key={footerLogo._id} footerLogo={footerLogo} onReload={ onReload}/>)
}