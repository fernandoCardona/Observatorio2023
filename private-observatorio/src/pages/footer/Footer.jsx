//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
 
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from "../../components/Shared";
import { FooterLogo } from "../../components/Footer/FooterLogo/";
import { FooterLinks } from "../../components/Footer/FooterLinks/";
import { FooterTxt } from "../../components/Footer/FooterTxt";
import { Social } from "../../components/Social";
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:


export const Footer = () => {


    return (
        <div>
            
            <br/>
            <br/>
            <FooterLogo/>
            <br/>
            <hr />
            <br/>
            <FooterLinks/>
            <br/>
            <hr />
            <br/>
            <Social />
            <br/>
            <hr />
            <br/>
            <FooterTxt/>
            <br/>
            <br/>
        </div>
    )
}
