//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Tab,  Button } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from "../../../components/Shared";
//IMPORTS COMPONENTS DE LA APP:
import { HomeHeaderForm } from "./HomeHeaderForm/HomeHeaderForm";
import { ListHomeHeader } from "./ListHomeHeader/ListHomeHeader"; 
//IMPORTS Styles/Images DE LA APP:
import './HomeHeader.scss';



export const HomeHeader = () => {
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
            menuItem: 'Video activos',
            render: () => (
                <Tab.Pane attached={false}>
                    <ListHomeHeader active={true} reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
        {
            menuItem: 'Video inactivos',
            render: () => (
                <Tab.Pane attached={false}>
                    <ListHomeHeader active={false} reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
    ];

    return (
        <div>
            
            <>
              <h1 className="ComponentTitle">CABECERA HOME:</h1>
              <div className="homeHeader-page">
                <div className="homeHeader-page__new-homeHeader-cont">
                  <Button 
                      className="homeHeader-page__add" 
                      primary 
                      onClick={ onOpenCloseModal }>
                          Nuevo Video
                  </Button>
                </div>
                  
                <Tab menu={{ secondary: true }} panes={panes} />
              </div>
              <BasicModal show={showModal} close={onOpenCloseModal} title='Crear nuevo homeHeader'>
                  <HomeHeaderForm close={ onOpenCloseModal } onReload={onReload}/>
              </BasicModal>
          </>
        </div>
      )
}