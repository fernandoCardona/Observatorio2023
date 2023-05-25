//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Tab, Button } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from "../../components/Shared";
//IMPORTS COMPONENTS DE LA APP:
import { ListSocials } from "../../components/Social/ListSocials";
import { SocialForm } from "../../components/Social/SocialForm/SocialForm.jsx";
//IMPORTS Styles/Images DE LA APP:
import './Social.scss';

export const Social = () => {
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
            menuItem: 'Socials activos',
            render: () => (
                <Tab.Pane attached={false}>
                    <ListSocials active={true} reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
        {
            menuItem: 'Socoials inactivos',
            render: () => (
                <Tab.Pane attached={false}>
                    <ListSocials active={false} reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
    ];

    return (
        <div>
           
            <h1 className="ComponentTitle">LINKS RSS:</h1>
            <div className="social-page">
            <div className="social-page__new-social-cont">
                <Button 
                    className="social-page__add" 
                    primary 
                    onClick={ onOpenCloseModal }>
                        Nuevo social
                </Button>
            </div>
                
                <Tab menu={{ secondary: true }} panes={panes} />
            </div>
            <BasicModal show={showModal} close={onOpenCloseModal} title='Crear nuevo social'>
                <SocialForm close={ onOpenCloseModal } onReload={onReload}/>
            </BasicModal>
     
        </div>
      )
}