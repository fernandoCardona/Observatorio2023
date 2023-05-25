//IMPORTS DE REACT:
import React, { useState, useEffect } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
//IMPORTS DEPENDENCIAS DE LA APP:
import { HomeArticles } from "../../../../api";
//IMPORTS COMPONENTS DE LA APP:
import { HomeArticlesItem } from "../HomeArticlesItem";
//IMPORTS Styles DE LA APP:

const homeArticlesController = new HomeArticles();

export const ListHomeArticles = (props) => {
    //Obtenemos las props
    const { active, reload, onReload } = props;
    const [homeArticles, setHomeArticles] = useState(null);
 
    useEffect(() => {
        (
            async() => {
                try {
                    setHomeArticles(null);
                    const response = await homeArticlesController.getHomeArticles(active);
                    setHomeArticles(response);
                } catch (error) {
                    console.log(error);
                }
            }
        )();
    }, [active, reload]);

    if (!homeArticles) return <Loader active inline="centered" />;
    if (size(homeArticles) === 0) return "No hay ningun menu";

    return map( homeArticles, (homeArticle) =><HomeArticlesItem key={homeArticle._id} homeArticle={homeArticle} onReload={ onReload}/>)
}