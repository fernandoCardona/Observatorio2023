//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Button, Confirm, Image } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from '../../../Shared';
import { FooterLinks } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from '../../../../utils';
//IMPORTS COMPONENTS DE LA APP:
import { FooterLinksForm } from '../FooterLinksForm/FooterLinksForm.jsx';
//IMPORTS Styles/Images DE LA APP:
import { image, Icon } from '../../../../assets';
import './FooterLinksItem.scss';


const footerLinksController = new FooterLinks();

export const FooterLinksItem = ( props ) => {
    //Obtenemos props:
    //console.log(props)
    const { footerLinks, onReload } = props;
    //Obtenemos el token:
    const { accessToken } = useAuth();
  
    //Creamos los Estados:
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState('');

    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState('');
    const [isDelete, setIsDelete] = useState(false);

  
    //Creamos la funcion de apertura y cierre del modal:
    const onOpenCloseModal = () => setShowModal( (prevState) => !prevState );
    const onOpenCloseConfirm = () => setShowConfirm( (prevState) => !prevState );

    //Creamos la funcion updateModal para actualizar el footerLinks:
    const openUpdateMenu = () => {
        setTitleModal(`Update footerLinks: ${ footerLinks.title }`); 
        onOpenCloseModal();
    }

    const openDesactivateActivateConfirm = () => {
        setIsDelete(false);
        setConfirmMessage( 
            footerLinks.active 
            ? `Desactivate footerLinks ${footerLinks.title }` 
            : `Activate footerLinks ${ footerLinks.title }`
        );
        onOpenCloseConfirm();
    }

    //Funcion active/Desactive btn:
    const onActivateDesactivate = async () => {
        try {
            //console.log('footerLinks before',footerLinks)
          await footerLinksController.updateFooterLink(accessToken, footerLinks._id, {
            active: !footerLinks.active,
          });
            //console.log('footerLinks after',footerLinks)
          onReload();
          onOpenCloseConfirm();
        } catch (error) {
          console.error(error);
        }
    };

    //Funciones Delete:
      const openDeleteConfirm = () => {
        setIsDelete(true);
        setConfirmMessage(`Delete footerLinks ${footerLinks.title}`);
        onOpenCloseConfirm();
    };

    const onDelete = async () => {
        try {
          await footerLinksController.deleteFooterLink(accessToken, footerLinks._id);
          onReload();
          onOpenCloseConfirm();
          
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="footerLinks-item">
                
                <div className="cont-wrap">
                    
                    <div className="footerLinks-item__info">    
                        <div>
                            <span className="footerLinks-item__info-title">
                                {footerLinks.title}
                            </span>
                            <span className="footerLinks-item__info-path">
                                Path: {footerLinks.path}
                            </span>
                            <span className="footerLinks-item__info-path">
                                Order: {footerLinks.order}
                            </span>
                        </div>
                        
                    </div>
                </div>
                <div>
                    <Button onClick={ openUpdateMenu } 
                            className='btn edit'
                    > 
                        <Icon.pencil/>
                    </Button>

                    <Button className='btn btnActivate'
                            color={ footerLinks.active ? 'orange' : 'teal'}
                            onClick={ openDesactivateActivateConfirm }
                    >
                        {footerLinks.active ? <Icon.ban/> : <Icon.check/>}
                    </Button>

                    <Button className='btn btnDelete'
                            color='red' 
                            onClick={ openDeleteConfirm }
                    >
                        <Icon.trash/>
                    </Button>
                </div>
            </div>
            <BasicModal show={ showModal } close={ onOpenCloseModal } title={ titleModal }>
                <FooterLinksForm close={onOpenCloseModal} onReload={onReload} footerLinks={footerLinks} />
            </BasicModal>

            <Confirm  
                open={ showConfirm }
                onCancel={ onOpenCloseConfirm }
                onConfirm={isDelete ? onDelete : onActivateDesactivate}
                constent={ confirmMessage } 
                size='mini'
            />
        </>
        
    )
}