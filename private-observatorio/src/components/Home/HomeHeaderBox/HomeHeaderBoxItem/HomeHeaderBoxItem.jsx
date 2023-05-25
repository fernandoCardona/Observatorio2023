//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Button, Confirm, Image } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from '../../../Shared';
import { HomeHeaderBox } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from '../../../../utils';
//IMPORTS COMPONENTS DE LA APP:
import { HomeHeaderBoxForm } from '../HomeHeaderBoxForm';
//IMPORTS Styles/Images DE LA APP:
import { image, Icon } from '../../../../assets';
import './HomeHeaderBoxItem.scss';


const homeHeaderBoxController = new HomeHeaderBox();

export const HomeHeaderBoxItem = ( props ) => {
    //Obtenemos props:
    //console.log(props)
    const { homeHeaderBox, onReload } = props;
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
        setTitleModal(`Update homeHeaderBox: ${ homeHeaderBox.txt }`); 
        onOpenCloseModal();
    }

    const openDesactivateActivateConfirm = () => {
        setIsDelete(false);
        setConfirmMessage( 
            homeHeaderBox.active 
            ? `Desactivate social ${ homeHeaderBox.txt }` 
            : `Activate social ${ homeHeaderBox.txt }`
        );
        onOpenCloseConfirm();
    }

    //Funcion active/Desactive btn:
    const onActivateDesactivate = async () => {
        try {
            //console.log('social before',social)
          await homeHeaderBoxController.updateHomeHeaderBox(accessToken, homeHeaderBox._id, {
            active: !homeHeaderBox.active,
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
        setConfirmMessage(`Delete homeHeaderBox ${homeHeaderBox.title}`);
        onOpenCloseConfirm();
    };

    const onDelete = async () => {
        try {
          await homeHeaderBoxController.deleteHomeHeaderBox(accessToken, homeHeaderBox._id);
          onReload();
          onOpenCloseConfirm();
          
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="homeHeaderBox-item">
                
                <div className="cont-wrap">
                    
                    <div className="homeHeaderBox-item__info">    
                        <div>
                            <span className="homeHeaderBox-item__info-title">
                                {homeHeaderBox.title}
                            </span>
                            <span className="homeHeaderBox-item__info-path">
                                 {homeHeaderBox.txt}
                            </span>
                            <span className="homeHeaderBox-item__info-path">
                                Order: {homeHeaderBox.order}
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
                            color={ homeHeaderBox.active ? 'orange' : 'teal'}
                            onClick={ openDesactivateActivateConfirm }
                    >
                        {homeHeaderBox.active ? <Icon.ban/> : <Icon.check/>}
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
                <HomeHeaderBoxForm close={onOpenCloseModal} onReload={onReload} homeHeaderBox={homeHeaderBox} />
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