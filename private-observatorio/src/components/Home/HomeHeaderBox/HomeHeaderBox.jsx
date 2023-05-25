//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Tab, Button } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from "../../../components/Shared";
//IMPORTS COMPONENTS DE LA APP:
import { ListHomeHeaderBox } from "../HomeHeaderBox/ListHomeHeaderBox";

import { HomeHeaderBoxForm } from "./HomeHeaderBoxForm/HomeHeaderBoxForm";
//IMPORTS Styles/Images DE LA APP:
import './HomeHeaderBox.scss';


export const HomeHeaderBox = () => {
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
            menuItem: 'Box activos',
            render: () => (
                <Tab.Pane attached={false}>
                    <ListHomeHeaderBox active={true} reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
        {
            menuItem: 'Box inactivos',
            render: () => (
                <Tab.Pane attached={false}>
                    <ListHomeHeaderBox active={false} reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
    ];

    return (
        <div>
            
            <>
              <h1 className="ComponentTitle">CONTENIDO BOX:</h1>
              <div className="homeHeaderBox-page">
                <div className="homeHeaderBox-page__new-homeHeaderBox-cont">
                  <Button 
                      className="homeHeaderBox-page__add" 
                      primary 
                      onClick={ onOpenCloseModal }>
                          Nuevo Box
                  </Button>
                </div>
                  
                  <Tab menu={{ secondary: true }} panes={panes} />
              </div>
              <BasicModal show={showModal} close={onOpenCloseModal} title='Crear nuevo homeHeaderBox'>
                  <HomeHeaderBoxForm close={ onOpenCloseModal } onReload={onReload}/>
              </BasicModal>
          </>
        </div>
      )
}