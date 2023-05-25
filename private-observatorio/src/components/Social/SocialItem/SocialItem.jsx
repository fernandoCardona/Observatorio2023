//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Button, Confirm, Image } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from '../../Shared';
import { Social } from "../../../api";
import { useAuth } from "../../../hooks";
import { ENV } from '../../../utils';
//IMPORTS COMPONENTS DE LA APP:
import { SocialForm } from '../SocialForm';
//IMPORTS Styles/Images DE LA APP:
import { image, Icon } from '../../../assets';
import './SocialItem.scss';


const socialController = new Social();

export const SocialItem = ( props ) => {
    //Obtenemos props:
    //console.log(props)
    const { social, onReload } = props;
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

    //Creamos la funcion updateModal para actualizar el social:
    const openUpdateMenu = () => {
        setTitleModal(`Update social: ${ social.title }`); 
        onOpenCloseModal();
    }

    const openDesactivateActivateConfirm = () => {
        setIsDelete(false);
        setConfirmMessage( 
            social.active 
            ? `Desactivate social ${ social.title }` 
            : `Activate social ${ social.title }`
        );
        onOpenCloseConfirm();
    }

    //Funcion active/Desactive btn:
    const onActivateDesactivate = async () => {
        try {
            //console.log('social before',social)
          await socialController.updateSocial(accessToken, social._id, {
            active: !social.active,
          });
            //console.log('social after',social)
          onReload();
          onOpenCloseConfirm();
        } catch (error) {
          console.error(error);
        }
    };

    //Funciones Delete:
      const openDeleteConfirm = () => {
        setIsDelete(true);
        setConfirmMessage(`Delete social ${social.title}`);
        onOpenCloseConfirm();
    };

    const onDelete = async () => {
        try {
          await socialController.deleteSocial(accessToken, social._id);
          onReload();
          onOpenCloseConfirm();
          
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="social-item">
                
                <div className="cont-wrap">
                    <div className="social-item__miniature">
                        <span className="cont-miniature">
                            {
                                social?.image && <Image className="miniature" src={`${ENV.BASE_PATH}/${social?.image}`}/> 
                            } 
                            
                            { 
                                social?.image1 && 
                                <Image  className="miniature" 
                                        src={social.image1 
                                            ? `${ENV.BASE_PATH}/${social.image1}`
                                            : image.noImage }/>
                                  
                            }
                            {
                                social?.image2 && 
                                <Image className="miniature" 
                                       src={social.image2 
                                       ? `${ENV.BASE_PATH}/${social.image2}`
                                       : image.noImage }/> 
                            }
                            
                        </span>
                    </div>
                    <div className="social-item__info">    
                        <div>
                            <span className="social-item__info-title">
                                {social.title}
                            </span>
                            <span className="social-item__info-path">
                                Path: {social.path}
                            </span>
                            <span className="social-item__info-path">
                                Order: {social.order}
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
                            color={ social.active ? 'orange' : 'teal'}
                            onClick={ openDesactivateActivateConfirm }
                    >
                        {social.active ? <Icon.ban/> : <Icon.check/>}
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
                <SocialForm close={onOpenCloseModal} onReload={onReload} social={social} />
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