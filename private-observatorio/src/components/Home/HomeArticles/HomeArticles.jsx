//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Tab, Button } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from "../../../components/Shared";
//IMPORTS COMPONENTS DE LA APP:
import { ListHomeArticles } from "./ListHomeArticles/ListHomeArticles";
import { HomeArticlesForm } from "./HomeArticlesForm/HomeArticlesForm";
//IMPORTS Styles/Images DE LA APP:
import './HomeArticles.scss';


export const HomeArticles = () => {
    //usestate:
    const [showModal, setShowModal] = useState(false);
    //useState Reload users:
    const [reload, setReload] = useState(false);

    //Definimos la funcion onClose para cerrar el modal:
    const onOpenCloseModal = () => setShowModal( (prevState) => !prevState );
    const onReload = () => setReload( (prevState )=> !prevState )

    //Manejo de Tabs:
    const panes = [
        {
            menuItem: 'Articles activos',
            render: () => (
                <Tab.Pane attached={false}>
                    <ListHomeArticles active={true} reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
        {
            menuItem: 'Articles inactivos',
            render: () => (
                <Tab.Pane attached={false}>
                    <ListHomeArticles active={false} reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
    ];

    return (
        <div>
           
            <h1 className="ComponentTitle">ARTICLES:</h1>
            <div className="homeArticles-page">
            <div className="homeArticles-page__new-homeArticles-cont">
                <Button 
                    className="HomeArticle-page__add" 
                    primary 
                    onClick={ onOpenCloseModal }>
                        Nuevo article
                </Button>
            </div>
                
                <Tab menu={{ secondary: true }} panes={panes} />
            </div>
            <BasicModal show={showModal} close={onOpenCloseModal} title='Crear nuevo HomeArticle'>
                <HomeArticlesForm close={ onOpenCloseModal } onReload={onReload}/>
            </BasicModal>
     
        </div>
      )
}