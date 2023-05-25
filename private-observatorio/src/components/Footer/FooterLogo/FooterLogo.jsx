//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Tab,  Button } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from "../../../components/Shared";
//IMPORTS COMPONENTS DE LA APP:
import { FooterLogoForm } from "./FooterLogoForm/FooterLogoForm";
import { ListFooterLogo } from "./ListFooterLogo/ListFooterLogo"; 
//IMPORTS Styles/Images DE LA APP:
import './FooterLogo.scss';



export const FooterLogo = () => {
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
            menuItem: 'Socials activos',
            render: () => (
                <Tab.Pane attached={false}>
                    <ListFooterLogo active={true} reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
        {
            menuItem: 'Socoials inactivos',
            render: () => (
                <Tab.Pane attached={false}>
                    <ListFooterLogo active={false} reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
    ];

    return (
        <div>
            
            <>
              <h1 className="ComponentTitle">FOOTER LOGO:</h1>
              <div className="footerLogo-page">
                <div className="footerLogo-page__new-footerLogo-cont">
                  <Button 
                      className="footerLogo-page__add" 
                      primary 
                      onClick={ onOpenCloseModal }>
                          Nuevo logo
                  </Button>
                </div>
                  
                <Tab menu={{ secondary: true }} panes={panes} />
              </div>
              <BasicModal show={showModal} close={onOpenCloseModal} title='Crear nuevo footerLogo'>
                  <FooterLogoForm close={ onOpenCloseModal } onReload={onReload}/>
              </BasicModal>
          </>
        </div>
      )
}