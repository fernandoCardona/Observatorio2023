//IMPORTS DE REACT:
import React, { useState, useEffect } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
//IMPORTS DEPENDENCIAS DE LA APP:
import { FooterLinks } from "../../../../api";
//IMPORTS COMPONENTS DE LA APP:
import { FooterLinksItem } from "../FooterLinksItem/FooterLinksItem.jsx";
//IMPORTS Styles DE LA APP:

const footerLinksController = new FooterLinks();

export const ListFooterLinks = (props) => {
    //Obtenemos las props
    const { active, reload, onReload } = props;
    const [footerLinks, setFooterLinks] = useState(null);

    useEffect(() => {
        (
            async() => {
                try {
                    setFooterLinks(null);
                    const response = await footerLinksController.getFooterLinks(active);
                    //console.log(response)
                    setFooterLinks(response);
                } catch (error) {
                    console.log(error);
                }
            }
        )();
    }, [active, reload]);

    if (!footerLinks) return <Loader active inline="centered" />;
    if (size(footerLinks) === 0) return "No hay ningun menu";

    return map( footerLinks, (footerLinks) =><FooterLinksItem key={footerLinks._id} footerLinks={footerLinks} onReload={ onReload}/>)
}