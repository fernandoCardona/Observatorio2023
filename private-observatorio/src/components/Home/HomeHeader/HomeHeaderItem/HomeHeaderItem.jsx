//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Button, Confirm, Image, Embed } from "semantic-ui-react";
import ReactPlayer from 'react-player';
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from '../../../Shared';
import { HomeHeader } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from '../../../../utils';
//IMPORTS COMPONENTS DE LA APP:
import { HomeHeaderForm } from '../HomeHeaderForm';
//IMPORTS Styles/Images DE LA APP:
import { image, Icon } from '../../../../assets';
import './HomeHeaderItem.scss';


const homeHeaderController = new HomeHeader();

export const HomeHeaderItem = ( props ) => {
    //Obtenemos props:
    //console.log(props)
    const { homeHeader, onReload } = props;
    //console.log('homeHeader', homeHeader)
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

    //Creamos la funcion updateModal para actualizar el homeHeader:
    const openUpdateMenu = () => {
        setTitleModal(`Update homeHeader: ${ homeHeader.title }`); 
        onOpenCloseModal();
    }

    const openDesactivateActivateConfirm = () => {
        setIsDelete(false);
        setConfirmMessage( 
            homeHeader.active 
            ? `Desactivate homeHeader ${homeHeader.title }` 
            : `Activate homeHeader ${ homeHeader.title }`
        );
        onOpenCloseConfirm();
    }

    //Funcion active/Desactive btn:
    const onActivateDesactivate = async () => {
        try {
            //console.log('homeHeader before',homeHeader)
          await homeHeaderController.updateHomeHeader(accessToken, homeHeader._id, {
            active: !homeHeader.active,
          });
            //console.log('homeHeader after',homeHeader)
          onReload();
          onOpenCloseConfirm();
        } catch (error) {
          console.error(error);
        }
    };

    //Funciones Delete:
      const openDeleteConfirm = () => {
        setIsDelete(true);
        setConfirmMessage(`Delete homeHeader ${homeHeader.title}`);
        onOpenCloseConfirm();
    };

    const onDelete = async () => {
        try {
          await homeHeaderController.deleteHomeHeader(accessToken, homeHeader._id);
          onReload();
          onOpenCloseConfirm();
          
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="homeHeader-item">
                
                <div className="cont-wrap">
                    <div className="homeHeader-item__miniature">
                        <span className="cont-miniature">
                            
                            {
                               homeHeader?.video && 
                                    <ReactPlayer
                                        url={`${ENV.BASE_PATH}/${homeHeader?.video}`}
                                        controls
                                        width="100%"
                                        height="100%"
                                    />
                            }
 
                        </span>
                    </div>
                    <div className="homeHeader-item__info">    
                        <div>
                            <span className="homeHeader-item__info-title">
                                {homeHeader.claim}   
                            </span>
                            <span className="homeHeader-item__info-path">
                                {homeHeader.subTitle}
                            </span>
                            <span className="homeHeader-item__info-path">
                                {homeHeader.txt}
                            </span>
                            <span className="homeHeader-item__info-path">
                                Order: {homeHeader.order}
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
                            color={ homeHeader.active ? 'orange' : 'teal'}
                            onClick={ openDesactivateActivateConfirm }
                    >
                        {homeHeader.active ? <Icon.ban/> : <Icon.check/>}
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
                <HomeHeaderForm close={onOpenCloseModal} onReload={onReload} homeHeader={homeHeader} />
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