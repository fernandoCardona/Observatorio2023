//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Button, Confirm, Image } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from '../../../Shared';
import { HomeHeaderAncors } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from '../../../../utils';
//IMPORTS COMPONENTS DE LA APP:
import { HomeHeaderAncorsForm } from '../HomeHeaderAncorsForm';
//IMPORTS Styles/Images DE LA APP:
import { image, Icon } from '../../../../assets';
import './HomeHeaderAncorsItem.scss';


const homeHeaderAncorsController = new HomeHeaderAncors();

export const HomeHeaderAncorsItem = ( props ) => {
    //Obtenemos props:
    //console.log(props)
    const { homeHeaderAncor, onReload } = props;
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
        setTitleModal(`Update homeHeaderAncor: ${ homeHeaderAncor.txt }`); 
        onOpenCloseModal();
    }

    const openDesactivateActivateConfirm = () => {
        setIsDelete(false);
        setConfirmMessage( 
            homeHeaderAncor.active 
            ? `Desactivate social ${ homeHeaderAncor.txt }` 
            : `Activate social ${ homeHeaderAncor.txt }`
        );
        onOpenCloseConfirm();
    }

    //Funcion active/Desactive btn:
    const onActivateDesactivate = async () => {
        try {
            //console.log('social before',social)
          await homeHeaderAncorsController.updateHomeHeaderAncor(accessToken, homeHeaderAncor._id, {
            active: !homeHeaderAncor.active,
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
        setConfirmMessage(`Delete homeHeaderAncor ${homeHeaderAncor.title}`);
        onOpenCloseConfirm();
    };

    const onDelete = async () => {
        try {
          await homeHeaderAncorsController.deleteHomeHeaderAncor(accessToken, homeHeaderAncor._id);
          onReload();
          onOpenCloseConfirm();
          
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="homeHeaderAncors-item">
                
                <div className="cont-wrap">
                    
                    <div className="homeHeaderAncors-item__info">    
                        <div>
                            <span className="homeHeaderAncors-item__info-title">
                                {homeHeaderAncor.txt}
                            </span>
                            <span className="homeHeaderAncors-item__info-path">
                                Path: {homeHeaderAncor.path}
                            </span>
                            <span className="homeHeaderAncors-item__info-path">
                                Order: {homeHeaderAncor.order}
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
                            color={ homeHeaderAncor.active ? 'orange' : 'teal'}
                            onClick={ openDesactivateActivateConfirm }
                    >
                        {homeHeaderAncor.active ? <Icon.ban/> : <Icon.check/>}
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
                <HomeHeaderAncorsForm close={onOpenCloseModal} onReload={onReload} homeHeaderAncor={homeHeaderAncor} />
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