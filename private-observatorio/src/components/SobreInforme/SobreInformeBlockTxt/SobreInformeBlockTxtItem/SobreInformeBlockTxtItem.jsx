//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Button, Confirm, Image, Embed } from "semantic-ui-react";
//import ReactPlayer from 'react-player';
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from '../../../Shared';
import { SobreInformeBlockTxt } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from '../../../../utils';
//IMPORTS COMPONENTS DE LA APP:
import { SobreInformeBlockTxtForm } from '../SobreInformeBlockTxtForm';
//IMPORTS Styles/Images DE LA APP:
import { image, Icon } from '../../../../assets';
import './SobreInformeBlockTxtItem.scss';


const sobreInformeBlockTxtController = new SobreInformeBlockTxt();

export const SobreInformeBlockTxtItem = ( props ) => {
    //Obtenemos props:
    //console.log(props)
    const { sobreInformeBlockTxt, onReload } = props;
  
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

    //Creamos la funcion updateModal para actualizar el sobreInformeBlockTxt:
    const openUpdateMenu = () => {
        setTitleModal(`Update sobreInformeBlockTxt: ${ sobreInformeBlockTxt.title }`); 
        onOpenCloseModal();
    }

    const openDesactivateActivateConfirm = () => {
        setIsDelete(false);
        setConfirmMessage( 
            sobreInformeBlockTxt.active 
            ? `Desactivate sobreInformeBlockTxt ${sobreInformeBlockTxt.title }` 
            : `Activate sobreInformeBlockTxt ${ sobreInformeBlockTxt.title }`
        );
        onOpenCloseConfirm();
    }

    //Funcion active/Desactive btn:
    const onActivateDesactivate = async () => {
        try {
            //console.log('sobreInformeBlockTxt before',sobreInformeBlockTxt)
          await sobreInformeBlockTxtController.updateSobreInformeBlockTxt(accessToken, sobreInformeBlockTxt._id, {
            active: !sobreInformeBlockTxt.active,
          });
            //console.log('sobreInformeBlockTxt after',sobreInformeBlockTxt)
          onReload();
          onOpenCloseConfirm();
        } catch (error) {
          console.error(error);
        }
    };

    //Funciones Delete:
      const openDeleteConfirm = () => {
        setIsDelete(true);
        setConfirmMessage(`Delete sobreInformeBlockTxt ${sobreInformeBlockTxt.title}`);
        onOpenCloseConfirm();
    };

    const onDelete = async () => {
        try {
          await sobreInformeBlockTxtController.deleteSobreInformeBlockTxt(accessToken, sobreInformeBlockTxt._id);
          onReload();
          onOpenCloseConfirm();
          
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="sobreInformeBlockTxt-item tl-vertical">
                
                <div className="cont-wrap">
                    <div className="sobreInformeBlockTxt-item__miniature">
                        <span className="cont-miniature">
                            
                            {
                               sobreInformeBlockTxt?.image1 && 
                               <Image  className="miniature" 
                               src={sobreInformeBlockTxt.image1 
                                   ? `${ENV.BASE_PATH}/${sobreInformeBlockTxt.image1}`
                                   : image.noImage }/>
                            }
                            {
                               sobreInformeBlockTxt?.image2 && 
                               <Image  className="miniature" 
                               src={sobreInformeBlockTxt.image2 
                                   ? `${ENV.BASE_PATH}/${sobreInformeBlockTxt.image2}`
                                   : image.noImage }/>
                            }
 
                        </span>
                    </div>
                    <div className="sobreInformeBlockTxt-item__info">    
                        <div>
                            <span className="sobreInformeBlockTxt-item__info-title">
                                {sobreInformeBlockTxt.txt1} 
                                {sobreInformeBlockTxt.txt2}  
                            </span>
                            <span className="sobreInformeBlockTxt-item__info-path">
                                Order: {sobreInformeBlockTxt.order}
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
                            color={ sobreInformeBlockTxt.active ? 'orange' : 'teal'}
                            onClick={ openDesactivateActivateConfirm }
                    >
                        {sobreInformeBlockTxt.active ? <Icon.ban/> : <Icon.check/>}
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
                <SobreInformeBlockTxtForm close={onOpenCloseModal} onReload={onReload} sobreInformeBlockTxt={sobreInformeBlockTxt} />
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