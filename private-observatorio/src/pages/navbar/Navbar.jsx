//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Tab, Button } from "semantic-ui-react";
import { ListMenu, MenuForm } from "../../components/Menu";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
import { BasicModal } from "../../components/Shared";

//IMPORTS Styles DE LA APP:
import './Navbar.scss';


export const Navbar = () => {
  //Creamos estados;
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  //Creamos la funcion de apertura y cierre del modal:
  const onOpenCloseModal = () => setShowModal( (prevState) => !prevState );
  //Creamos la funcion de reload:
  const onReload = () => setReload( (prevState) => !prevState );

  const panes = [
    {
      menuItem: "Menus activos",
      render: () => (
        <Tab.Pane attached={false}>
           <ListMenu active={true} reload={ reload } onReload={ onReload }/>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Menus Inactivos",
      render: () => (
        <Tab.Pane attached={false}>
           <ListMenu active={false} reload={ reload } onReload={ onReload } />
        </Tab.Pane>
      ),
    },
  ];

    return (
      <>
        <h1 className="ComponentTitle">MENU:</h1>
        <div className="menu-page">
            <div className="menu-page__new-menu-cont">
                <Button className="menu-page__add" 
                        primary 
                        onClick={ onOpenCloseModal }
                >
                        Nuevo menu
                </Button>
            </div>
            <Tab menu={{ secondary: true }} panes={panes} />
        </div>
        <BasicModal show={showModal} close={ onOpenCloseModal } title="Create menu">
            <MenuForm onClose={ onOpenCloseModal } onReload={ onReload }/>
        </BasicModal>
      </>
    )
}
