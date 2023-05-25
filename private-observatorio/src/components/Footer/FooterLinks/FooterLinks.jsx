//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Tab, Button } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from "../../../components/Shared";
//IMPORTS COMPONENTS DE LA APP:
import { FooterLinksForm } from "./FooterLinksForm/FooterLinksForm.jsx";
import { ListFooterLinks } from "./ListFooterLinks/ListFooterLinks"; 
//IMPORTS Styles/Images DE LA APP:
import './FooterLinks.scss';



export const FooterLinks = () => {
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
            menuItem: 'Links activos',
            render: () => (
                <Tab.Pane attached={false}>
                    <ListFooterLinks active={true} reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
        {
            menuItem: 'Links inactivos',
            render: () => (
                <Tab.Pane attached={false}>
                    <ListFooterLinks active={false} reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
    ];

    return (
        <div>
            <h1 className="ComponentTitle"> LINKS MENU FOOTER:</h1>
            <div className="footerLinks-page">
                <div className="footerLinks-page__new-footerLinks-cont">
                    <Button 
                        className="footerLinks-page__add" 
                        primary 
                        onClick={ onOpenCloseModal }>
                            Nuevo logo
                    </Button>
                </div>
                    
                <Tab menu={{ secondary: true }} panes={panes} />
            </div>
            <BasicModal show={showModal} close={onOpenCloseModal} title='Crear nuevo footerLinks'>
                <FooterLinksForm close={ onOpenCloseModal } onReload={onReload}/>
            </BasicModal>
     
        </div>
      )
}