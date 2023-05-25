//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Tab, Button } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from "../../components/Shared";
import { UserForm, ListUsers } from "../../components/Users";
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import './Users.scss';

export const Users = () => {
    //usestate:
    const [showModal, setShowModal] = useState(false);
    //useState Reload users:
    const [reload, setReload] = useState(false);

    //Definimos la funcion onClose para cerrar el modal:
    const onOpenCloseModal = () => setShowModal( (prevState) => !prevState );
    const onReload = () => setReload( (prevState )=> !prevState )
;
    //Manejo de Tabs:
    const panes = [
        {
            menuItem: 'Usuarios activos',
            render: () => (
                <Tab.Pane attached={false}>
                    <ListUsers usersActive={true} reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
        {
            menuItem: 'Usuarios inactivos',
            render: () => (
                <Tab.Pane attached={false}>
                    <ListUsers usersActive={false} reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
    ]; 
  
  return (
      <div>
          
          <>
          <h1 className="ComponentTitle">USUARIOS REGISTRADOS:</h1>
            <div className="users-page">
              <div className="users-page__new-user-cont">
                <Button 
                    className="users-page__add" 
                    primary 
                    onClick={ onOpenCloseModal }>
                        Nuevo usuario
                </Button>
              </div>
                
                <Tab menu={{ secondary: true }} panes={panes} />
            </div>
            <BasicModal show={showModal} close={onOpenCloseModal} title='Crear nuevo usuario'>
                <UserForm close={ onOpenCloseModal } onReload={onReload}/>
            </BasicModal>
        </>
      </div>
    )
}