//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Tab,  Button } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from "../../../components/Shared";
//IMPORTS COMPONENTS DE LA APP:
import { ListSobreInformeHeader } from "./ListSobreInformeHeader/ListSobreInformeHeader";
import { SobreInformeHeaderForm } from "./SobreInformeHeaderForm"; 
//IMPORTS Styles/Images DE LA APP:
import './SobreInformeHeader.scss';




export const SobreInformeHeader = () => {
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
                    <ListSobreInformeHeader active={true} reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
        {
            menuItem: 'Cabecera inactivos',
            render: () => (
                <Tab.Pane attached={false}>
                    <ListSobreInformeHeader active={false} reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
    ];

    return (
        <div>
            
            <>
              <h1 className="ComponentTitle">CABECERA HOME:</h1>
              <div className="sobreInformeHeader-page">
                <div className="sobreInformeHeader-page__new-sobreInformeHeader-cont">
                  <Button 
                      className="sobreInformeHeader-page__add" 
                      primary 
                      onClick={ onOpenCloseModal }>
                          Nueva Cabecera
                  </Button>
                </div>
                  
                <Tab menu={{ secondary: true }} panes={panes} />
              </div>
              <BasicModal show={showModal} close={onOpenCloseModal} title='Crear nuevo sobreInformeHeader'>
                  <SobreInformeHeaderForm close={ onOpenCloseModal } onReload={onReload}/>
              </BasicModal>
          </>
        </div>
      )
}