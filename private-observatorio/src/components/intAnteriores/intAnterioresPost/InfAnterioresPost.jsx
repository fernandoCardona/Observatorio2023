//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Tab,  Button } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from "../../../components/Shared";
//IMPORTS COMPONENTS DE LA APP:
import { ListInfAnterioresPost } from "./ListInfAnterioresPost/ListInfAnterioresPost";
import { InfAnterioresPostForm } from "./InfAnterioresPostForm"; 
//IMPORTS Styles/Images DE LA APP:
import './InfAnterioresPost.scss';




export const InfAnterioresPost = () => {
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
            menuItem: 'Post activos',
            render: () => (
                <Tab.Pane attached={false}>
                    <ListInfAnterioresPost active={true} reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
        {
            menuItem: 'Post inactivos',
            render: () => (
                <Tab.Pane attached={false}>
                    <ListInfAnterioresPost active={false} reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
    ];

    return (
        <div>
            
            <>
              <h1 className="ComponentTitle">TEXTO POST:</h1>
              <div className="infAnterioresPost-page">
                <div className="infAnterioresPost-page__new-infAnterioresPost-cont">
                  <Button 
                      className="infAnterioresPost-page__add" 
                      primary 
                      onClick={ onOpenCloseModal }>
                          Nuevo Post
                  </Button>
                </div>
                  
                <Tab menu={{ secondary: true }} panes={panes} />
              </div>
              <BasicModal show={showModal} close={onOpenCloseModal} title='Crear nuevo Texto'>
                  <InfAnterioresPostForm close={ onOpenCloseModal } onReload={onReload}/>
              </BasicModal>
          </>
        </div>
      )
}