//IMPORTS DE REACT:
import React, { useState, useEffect } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
//IMPORTS DEPENDENCIAS DE LA APP:
import { FooterTxt } from "../../../../api";
//IMPORTS COMPONENTS DE LA APP:
import { FooterTxtItem } from "../FooterTxtItem/FooterTxtItem.jsx";
//IMPORTS Styles DE LA APP:

const footerTxtController = new FooterTxt();

export const ListFooterTxt = (props) => {
    //Obtenemos las props
    const { active, reload, onReload } = props;
    const [footerTxt, setFooterTxt] = useState(null);

    useEffect(() => {
        (
            async() => {
                try {
                    setFooterTxt(null);
                    const response = await footerTxtController.getFooterTxt(active);
                    //console.log(response)
                    setFooterTxt(response);
                } catch (error) {
                    console.log(error);
                }
            }
        )();
    }, [active, reload]);

    if (!footerTxt) return <Loader active inline="centered" />;
    if (size(footerTxt) === 0) return "No hay ningun menu";

    return map( footerTxt, (footerTxt) =><FooterTxtItem key={footerTxt._id} footerTxt={footerTxt} onReload={ onReload}/>)
}