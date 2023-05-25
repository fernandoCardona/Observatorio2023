//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Tab, Button } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from "../../../components/Shared";
//IMPORTS COMPONENTS DE LA APP:
import { FooterTxtForm } from "./FooterTxtForm/FooterTxtForm.jsx";
import { ListFooterTxt } from "./ListFooterTxt/ListFooterTxt.jsx"; 
//IMPORTS Styles/Images DE LA APP:
import './FooterTxt.scss';



export const FooterTxt = () => {
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
            menuItem: 'Texto activos',
            render: () => (
                <Tab.Pane attached={false}>
                    <ListFooterTxt active={true} reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
        {
            menuItem: 'Texto inactivos',
            render: () => (
                <Tab.Pane attached={false}>
                    <ListFooterTxt active={false} reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
    ];

    return (
        <div>
            
            <>
              <h1 className="ComponentTitle">TEXTO ADICIONAL:</h1>
              <div className="footerTxt-page">
                <div className="footerTxt-page__new-footerTxt-cont">
                  <Button 
                      className="footerTxt-page__add" 
                      primary 
                      onClick={ onOpenCloseModal }>
                          Nuevo texto
                  </Button>
                </div>
                  
                <Tab menu={{ secondary: true }} panes={panes} />
              </div>
              <BasicModal show={showModal} close={onOpenCloseModal} title='Crear nuevo footerTxt'>
                  <FooterTxtForm close={ onOpenCloseModal } onReload={onReload}/>
              </BasicModal>
          </>
        </div>
      )
}