//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Tab,  Button } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from "../../../components/Shared";
//IMPORTS COMPONENTS DE LA APP:
import { ListInfAnterioresBlockTxt } from "./ListInfAnterioresBlockTxt/ListInfAnterioresBlockTxt";
import { InfAnterioresBlockTxtForm } from "./InfAnterioresBlockTxtForm"; 
//IMPORTS Styles/Images DE LA APP:
import './InfAnterioresBlockTxt.scss';




export const InfAnterioresBlockTxt = () => {
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
            menuItem: 'Cabecera activos',
            render: () => (
                <Tab.Pane attached={false}>
                    <ListInfAnterioresBlockTxt active={true} reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
        {
            menuItem: 'Cabecera inactivos',
            render: () => (
                <Tab.Pane attached={false}>
                    <ListInfAnterioresBlockTxt active={false} reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
    ];

    return (
        <div>
            
            <>
              <h1 className="ComponentTitle">TEXTO CABECERA:</h1>
              <div className="infAnterioresBlockTxt-page">
                <div className="infAnterioresBlockTxt-page__new-infAnterioresBlockTxt-cont">
                  <Button 
                      className="infAnterioresBlockTxt-page__add" 
                      primary 
                      onClick={ onOpenCloseModal }>
                          Nuevo texto
                  </Button>
                </div>
                  
                <Tab menu={{ secondary: true }} panes={panes} />
              </div>
              <BasicModal show={showModal} close={onOpenCloseModal} title='Crear nuevo Texto'>
                  <InfAnterioresBlockTxtForm close={ onOpenCloseModal } onReload={onReload}/>
              </BasicModal>
          </>
        </div>
      )
}