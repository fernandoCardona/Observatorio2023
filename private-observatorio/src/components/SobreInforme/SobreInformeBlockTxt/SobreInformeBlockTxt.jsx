//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Tab,  Button } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from "../../../components/Shared";
//IMPORTS COMPONENTS DE LA APP:
import { ListSobreInformeBlockTxt } from "./ListSobreInformeBlockTxt/ListSobreInformeBlockTxt";
import { SobreInformeBlockTxtForm } from "./SobreInformeBlockTxtForm"; 
//IMPORTS Styles/Images DE LA APP:
import './SobreInformeBlockTxt.scss';




export const SobreInformeBlockTxt = () => {
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
                    <ListSobreInformeBlockTxt active={true} reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
        {
            menuItem: 'Cabecera inactivos',
            render: () => (
                <Tab.Pane attached={false}>
                    <ListSobreInformeBlockTxt active={false} reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
    ];

    return (
        <div>
            
            <>
              <h1 className="ComponentTitle">TEXTO CABECERA:</h1>
              <div className="sobreInformeBlockTxt-page">
                <div className="sobreInformeBlockTxt-page__new-sobreInformeBlockTxt-cont">
                  <Button 
                      className="sobreInformeBlockTxt-page__add" 
                      primary 
                      onClick={ onOpenCloseModal }>
                          Nuevo texto
                  </Button>
                </div>
                  
                <Tab menu={{ secondary: true }} panes={panes} />
              </div>
              <BasicModal show={showModal} close={onOpenCloseModal} title='Crear nuevo Texto'>
                  <SobreInformeBlockTxtForm close={ onOpenCloseModal } onReload={onReload}/>
              </BasicModal>
          </>
        </div>
      )
}