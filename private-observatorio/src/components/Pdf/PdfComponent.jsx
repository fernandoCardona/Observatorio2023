//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Tab, Button } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from "../Shared";
//IMPORTS COMPONENTS DE LA APP:
import { ListPdfs } from "../../components/Pdf/ListPdfs";
import { PdfForm } from "../../components/Pdf/PdfForm/PdfForm.jsx";
//IMPORTS Styles/Images DE LA APP:
import './PdfComponent.scss';

export const PdfComponent = () => {
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
            menuItem: 'Pdfs activos',
            render: () => (
                <Tab.Pane attached={false}>
                    <ListPdfs active={true} reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
        {
            menuItem: 'Socoials inactivos',
            render: () => (
                <Tab.Pane attached={false}>
                    <ListPdfs active={false} reload={reload} onReload={onReload}/>
                </Tab.Pane>
            ),
        },
    ];

    return (
        <div>
           
            <h1 className="ComponentTitle">LINKS RSS:</h1>
            <div className="pdf-page">
            <div className="pdf-page__new-pdf-cont">
                <Button 
                    className="pdf-page__add" 
                    primary 
                    onClick={ onOpenCloseModal }>
                        Nuevo pdf
                </Button>
            </div>
                
                <Tab menu={{ secondary: true }} panes={panes} />
            </div>
            <BasicModal show={showModal} close={onOpenCloseModal} title='Crear nuevo pdf'>
                <PdfForm close={ onOpenCloseModal } onReload={onReload}/>
            </BasicModal>
     
        </div>
      )
}