//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Button, Confirm, Image, Embed } from "semantic-ui-react";
import ReactPlayer from 'react-player';
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from '../../../Shared';
import { SobreInformeHeader } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from '../../../../utils';
//IMPORTS COMPONENTS DE LA APP:
import { SobreInformeHeaderForm } from '../SobreInformeHeaderForm';
//IMPORTS Styles/Images DE LA APP:
import { image, Icon } from '../../../../assets';
import './SobreInformeHeaderItem.scss';


const sobreInformeHeaderController = new SobreInformeHeader();

export const SobreInformeHeaderItem = ( props ) => {
    //Obtenemos props:
    //console.log(props)
    const { sobreInformeHeader, onReload } = props;

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

    //Creamos la funcion updateModal para actualizar el sobreInformeHeader:
    const openUpdateMenu = () => {
        setTitleModal(`Update sobreInformeHeader: ${ sobreInformeHeader.title }`); 
        onOpenCloseModal();
    }

    const openDesactivateActivateConfirm = () => {
        setIsDelete(false);
        setConfirmMessage( 
            sobreInformeHeader.active 
            ? `Desactivate sobreInformeHeader ${sobreInformeHeader.title }` 
            : `Activate sobreInformeHeader ${ sobreInformeHeader.title }`
        );
        onOpenCloseConfirm();
    }

    //Funcion active/Desactive btn:
    const onActivateDesactivate = async () => {
        try {
            //console.log('sobreInformeHeader before',sobreInformeHeader)
          await sobreInformeHeaderController.updateSobreInformeHeader(accessToken, sobreInformeHeader._id, {
            active: !sobreInformeHeader.active,
          });
            //console.log('sobreInformeHeader after',sobreInformeHeader)
          onReload();
          onOpenCloseConfirm();
        } catch (error) {
          console.error(error);
        }
    };

    //Funciones Delete:
      const openDeleteConfirm = () => {
        setIsDelete(true);
        setConfirmMessage(`Delete sobreInformeHeader ${sobreInformeHeader.title}`);
        onOpenCloseConfirm();
    };

    const onDelete = async () => {
        try {
          await sobreInformeHeaderController.deleteSobreInformeHeader(accessToken, sobreInformeHeader._id);
          onReload();
          onOpenCloseConfirm();
          
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="sobreInformeHeader-item">
                
                <div className="cont-wrap">
                    <div className="sobreInformeHeader-item__miniature">
                        <span className="cont-miniature">
                            
                            {
                               sobreInformeHeader?.image && 
                               <Image  className="miniature" 
                               src={sobreInformeHeader.image 
                                   ? `${ENV.BASE_PATH}/${sobreInformeHeader.image}`
                                   : image.noImage }/>
                            }
 
                        </span>
                    </div>
                    <div className="sobreInformeHeader-item__info">    
                        <div>
                            <span className="sobreInformeHeader-item__info-title">
                                {sobreInformeHeader.claim}   
                            </span>
                            <span className="sobreInformeHeader-item__info-path">
                                Order: {sobreInformeHeader.order}
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
                            color={ sobreInformeHeader.active ? 'orange' : 'teal'}
                            onClick={ openDesactivateActivateConfirm }
                    >
                        {sobreInformeHeader.active ? <Icon.ban/> : <Icon.check/>}
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
                <SobreInformeHeaderForm close={onOpenCloseModal} onReload={onReload} sobreInformeHeader={sobreInformeHeader} />
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