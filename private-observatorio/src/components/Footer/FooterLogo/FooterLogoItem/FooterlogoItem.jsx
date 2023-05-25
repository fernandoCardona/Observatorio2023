//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Button, Confirm, Image } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from '../../../Shared';
import { FooterLogo } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from '../../../../utils';
//IMPORTS COMPONENTS DE LA APP:
import { FooterLogoForm } from '../FooterLogoForm';
//IMPORTS Styles/Images DE LA APP:
import { image, Icon } from '../../../../assets';
import './FooterLogoItem.scss';


const footerLogoController = new FooterLogo();

export const FooterLogoItem = ( props ) => {
    //Obtenemos props:
    //console.log(props)
    const { footerLogo, onReload } = props;
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

    //Creamos la funcion updateModal para actualizar el footerLogo:
    const openUpdateMenu = () => {
        setTitleModal(`Update footerLogo: ${ footerLogo.title }`); 
        onOpenCloseModal();
    }

    const openDesactivateActivateConfirm = () => {
        setIsDelete(false);
        setConfirmMessage( 
            footerLogo.active 
            ? `Desactivate footerLogo ${footerLogo.title }` 
            : `Activate footerLogo ${ footerLogo.title }`
        );
        onOpenCloseConfirm();
    }

    //Funcion active/Desactive btn:
    const onActivateDesactivate = async () => {
        try {
            //console.log('footerLogo before',footerLogo)
          await footerLogoController.updateFooterLogo(accessToken, footerLogo._id, {
            active: !footerLogo.active,
          });
            //console.log('footerLogo after',footerLogo)
          onReload();
          onOpenCloseConfirm();
        } catch (error) {
          console.error(error);
        }
    };

    //Funciones Delete:
      const openDeleteConfirm = () => {
        setIsDelete(true);
        setConfirmMessage(`Delete footerLogo ${footerLogo.title}`);
        onOpenCloseConfirm();
    };

    const onDelete = async () => {
        try {
          await footerLogoController.deleteFooterLogo(accessToken, footerLogo._id);
          onReload();
          onOpenCloseConfirm();
          
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="footerLogo-item">
                
                <div className="cont-wrap">
                    <div className="footerLogo-item__miniature">
                        <span className="cont-miniature">
                            {
                                footerLogo?.image && <Image className="miniature" src={`${ENV.BASE_PATH}/${footerLogo?.image}`}/> 
                            } 
                            
                            { 
                                footerLogo?.image1 && 
                                <Image  className="miniature" 
                                        src={footerLogo.image1 
                                            ? `${ENV.BASE_PATH}/${footerLogo.image1}`
                                            : image.noImage }/>
                                  
                            }
                            {
                                footerLogo?.image2 && 
                                <Image className="miniature" 
                                       src={footerLogo.image2 
                                       ? `${ENV.BASE_PATH}/${footerLogo.image2}`
                                       : image.noImage }/> 
                            }
                            
                        </span>
                    </div>
                    <div className="footerLogo-item__info">    
                        <div>
                            <span className="footerLogo-item__info-title">
                                {footerLogo.title}
                            </span>
                            <span className="footerLogo-item__info-path">
                                Path: {footerLogo.path}
                            </span>
                            <span className="footerLogo-item__info-path">
                                Order: {footerLogo.order}
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
                            color={ footerLogo.active ? 'orange' : 'teal'}
                            onClick={ openDesactivateActivateConfirm }
                    >
                        {footerLogo.active ? <Icon.ban/> : <Icon.check/>}
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
                <FooterLogoForm close={onOpenCloseModal} onReload={onReload} footerLogo={footerLogo} />
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