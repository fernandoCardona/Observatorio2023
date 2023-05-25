//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Button, Confirm, Image, Embed } from "semantic-ui-react";
//import ReactPlayer from 'react-player';
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from '../../../Shared';
import { InfAnterioresBlockTxt } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from '../../../../utils';
//IMPORTS COMPONENTS DE LA APP:
import { InfAnterioresBlockTxtForm } from '../InfAnterioresBlockTxtForm';
//IMPORTS Styles/Images DE LA APP:
import { image, Icon } from '../../../../assets';
import './InfAnterioresBlockTxtItem.scss';


const infAnterioresBlockTxtController = new InfAnterioresBlockTxt();

export const InfAnterioresBlockTxtItem = ( props ) => {
    //Obtenemos props:
    //console.log(props)
    const { infAnterioresBlockTxt, onReload } = props;
  
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

    //Creamos la funcion updateModal para actualizar el infAnterioresBlockTxt:
    const openUpdateMenu = () => {
        setTitleModal(`Update infAnterioresBlockTxt: ${ infAnterioresBlockTxt.title }`); 
        onOpenCloseModal();
    }

    const openDesactivateActivateConfirm = () => {
        setIsDelete(false);
        setConfirmMessage( 
            infAnterioresBlockTxt.active 
            ? `Desactivate infAnterioresBlockTxt ${infAnterioresBlockTxt.title }` 
            : `Activate infAnterioresBlockTxt ${ infAnterioresBlockTxt.title }`
        );
        onOpenCloseConfirm();
    }

    //Funcion active/Desactive btn:
    const onActivateDesactivate = async () => {
        try {
            //console.log('infAnterioresBlockTxt before',infAnterioresBlockTxt)
          await infAnterioresBlockTxtController.updateInfAnterioresBlockTxt(accessToken, infAnterioresBlockTxt._id, {
            active: !infAnterioresBlockTxt.active,
          });
            //console.log('infAnterioresBlockTxt after',infAnterioresBlockTxt)
          onReload();
          onOpenCloseConfirm();
        } catch (error) {
          console.error(error);
        }
    };

    //Funciones Delete:
      const openDeleteConfirm = () => {
        setIsDelete(true);
        setConfirmMessage(`Delete infAnterioresBlockTxt ${infAnterioresBlockTxt.title}`);
        onOpenCloseConfirm();
    };

    const onDelete = async () => {
        try {
          await infAnterioresBlockTxtController.deleteInfAnterioresBlockTxt(accessToken, infAnterioresBlockTxt._id);
          onReload();
          onOpenCloseConfirm();
          
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="infAnterioresBlockTxt-item tl-vertical">
                
                <div className="cont-wrap">
                    <div className="infAnterioresBlockTxt-item__miniature">
                        <span className="cont-miniature">
                            
                            {
                               infAnterioresBlockTxt?.image1 && 
                               <Image  className="miniature" 
                               src={infAnterioresBlockTxt.image1 
                                   ? `${ENV.BASE_PATH}/${infAnterioresBlockTxt.image1}`
                                   : image.noImage }/>
                            }
                            {
                               infAnterioresBlockTxt?.image2 && 
                               <Image  className="miniature" 
                               src={infAnterioresBlockTxt.image2 
                                   ? `${ENV.BASE_PATH}/${infAnterioresBlockTxt.image2}`
                                   : image.noImage }/>
                            }
 
                        </span>
                    </div>
                    <div className="infAnterioresBlockTxt-item__info">    
                        <div>
                            <span className="infAnterioresBlockTxt-item__info-title">
                                {infAnterioresBlockTxt.txt} 
                            
                            </span>
                            <span className="infAnterioresBlockTxt-item__info-path">
                                Order: {infAnterioresBlockTxt.order}
                            </span>
                        </div>
                        
                    </div>
                </div>
                <div className="btn-content">
                    <Button onClick={ openUpdateMenu } 
                            className='btn edit'
                    > 
                        <Icon.pencil/>
                    </Button>

                    <Button className='btn btnActivate'
                            color={ infAnterioresBlockTxt.active ? 'orange' : 'teal'}
                            onClick={ openDesactivateActivateConfirm }
                    >
                        {infAnterioresBlockTxt.active ? <Icon.ban/> : <Icon.check/>}
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
                <InfAnterioresBlockTxtForm close={onOpenCloseModal} onReload={onReload} infAnterioresBlockTxt={infAnterioresBlockTxt} />
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