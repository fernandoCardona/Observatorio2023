//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Button, Confirm, Image, Embed } from "semantic-ui-react";
import ReactPlayer from 'react-player';
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from '../../../Shared';
import { InfAnterioresHeader } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from '../../../../utils';
//IMPORTS COMPONENTS DE LA APP:
import { InfAnterioresHeaderForm } from '../InfAnterioresHeaderForm';
//IMPORTS Styles/Images DE LA APP:
import { image, Icon } from '../../../../assets';
import './InfAnterioresHeaderItem.scss';


const infAnterioresHeaderController = new InfAnterioresHeader();

export const InfAnterioresHeaderItem = ( props ) => {
    //Obtenemos props:
    //console.log(props)
    const { infAnterioresHeader, onReload } = props;

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

    //Creamos la funcion updateModal para actualizar el infAnterioresHeader:
    const openUpdateMenu = () => {
        setTitleModal(`Update infAnterioresHeader: ${ infAnterioresHeader.title }`); 
        onOpenCloseModal();
    }

    const openDesactivateActivateConfirm = () => {
        setIsDelete(false);
        setConfirmMessage( 
            infAnterioresHeader.active 
            ? `Desactivate infAnterioresHeader ${infAnterioresHeader.title }` 
            : `Activate infAnterioresHeader ${ infAnterioresHeader.title }`
        );
        onOpenCloseConfirm();
    }

    //Funcion active/Desactive btn:
    const onActivateDesactivate = async () => {
        try {
            //console.log('infAnterioresHeader before',infAnterioresHeader)
          await infAnterioresHeaderController.updateInfAnterioresHeader(accessToken, infAnterioresHeader._id, {
            active: !infAnterioresHeader.active,
          });
            //console.log('infAnterioresHeader after',infAnterioresHeader)
          onReload();
          onOpenCloseConfirm();
        } catch (error) {
          console.error(error);
        }
    };

    //Funciones Delete:
      const openDeleteConfirm = () => {
        setIsDelete(true);
        setConfirmMessage(`Delete infAnterioresHeader ${infAnterioresHeader.title}`);
        onOpenCloseConfirm();
    };

    const onDelete = async () => {
        try {
          await infAnterioresHeaderController.deleteInfAnterioresHeader(accessToken, infAnterioresHeader._id);
          onReload();
          onOpenCloseConfirm();
          
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="infAnterioresHeader-item">
                
                <div className="cont-wrap">
                    <div className="infAnterioresHeader-item__miniature">
                        <span className="cont-miniature">
                            
                            {
                               infAnterioresHeader?.image && 
                               <Image  className="miniature" 
                               src={infAnterioresHeader.image 
                                   ? `${ENV.BASE_PATH}/${infAnterioresHeader.image}`
                                   : image.noImage }/>
                            }
 
                        </span>
                    </div>
                    <div className="infAnterioresHeader-item__info">    
                        <div>
                            <span className="infAnterioresHeader-item__info-title">
                                {infAnterioresHeader.claim}   
                            </span>
                            <span className="infAnterioresHeader-item__info-path">
                                Order: {infAnterioresHeader.order}
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
                            color={ infAnterioresHeader.active ? 'orange' : 'teal'}
                            onClick={ openDesactivateActivateConfirm }
                    >
                        {infAnterioresHeader.active ? <Icon.ban/> : <Icon.check/>}
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
                <InfAnterioresHeaderForm close={onOpenCloseModal} onReload={onReload} infAnterioresHeader={infAnterioresHeader} />
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