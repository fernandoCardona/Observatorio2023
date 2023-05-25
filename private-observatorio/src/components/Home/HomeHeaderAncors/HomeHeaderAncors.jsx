//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Tab, Button } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from "../../../components/Shared";
//IMPORTS COMPONENTS DE LA APP:
import { ListHomeHeaderAncors } from "./ListHomeHeaderAncors/ListHomeHeaderAncors";

import { HomeHeaderAncorsForm } from "./HomeHeaderAncorsForm/HomeHeaderAncorsForm";
//IMPORTS Styles/Images DE LA APP:
import './HomeHeaderAncors.scss';


export const HomeHeaderAncors = () => {
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
            menuItem: 'Ancors activos',
            render: () => (
                <Tab.Pane attached={false}>
                    <ListHomeHeaderAncors active={true} reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
        {
            menuItem: 'Ancors inactivos',
            render: () => (
                <Tab.Pane attached={false}>
                    <ListHomeHeaderAncors active={false} reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
    ];

    return (
        <div>
            
            <>
              <h1 className="ComponentTitle">ANCORS:</h1>
              <div className="homeHeaderAncors-page">
                <div className="homeHeaderAncors-page__new-homeHeaderAncors-cont">
                  <Button 
                      className="homeHeaderAncors-page__add" 
                      primary 
                      onClick={ onOpenCloseModal }>
                          Nuevo ancors
                  </Button>
                </div>
                  
                  <Tab menu={{ secondary: true }} panes={panes} />
              </div>
              <BasicModal show={showModal} close={onOpenCloseModal} title='Crear nuevo homeHeaderAncors'>
                  <HomeHeaderAncorsForm close={ onOpenCloseModal } onReload={onReload}/>
              </BasicModal>
          </>
        </div>
      )
}