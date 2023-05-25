//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Button, Confirm, Image } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from '../../../Shared';
import { FooterTxt } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from '../../../../utils';
//IMPORTS COMPONENTS DE LA APP:
import { FooterTxtForm } from '../FooterTxtForm/FooterTxtForm.jsx';
//IMPORTS Styles/Images DE LA APP:
import { image, Icon } from '../../../../assets';
import './FooterTxtItem.scss';


const footerTxtController = new FooterTxt();

export const FooterTxtItem = ( props ) => {
    //Obtenemos props:
    //console.log(footerTxt)
    const { footerTxt, onReload } = props;
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

    //Creamos la funcion updateModal para actualizar el footerTxt:
    const openUpdateMenu = () => {
        setTitleModal(`Update footerTxt: ${ footerTxt.title }`); 
        onOpenCloseModal();
    }

    const openDesactivateActivateConfirm = () => {
        setIsDelete(false);
        setConfirmMessage( 
            footerTxt.active 
            ? `Desactivate footerTxt ${footerTxt.title }` 
            : `Activate footerTxt ${ footerTxt.title }`
        );
        onOpenCloseConfirm();
    }

    //Funcion active/Desactive btn:
    const onActivateDesactivate = async () => {
        try {
            //console.log('footerTxt before',footerTxt)
          await footerTxtController.updateFooterTxt(accessToken, footerTxt._id, {
            active: !footerTxt.active,
          });
            //console.log('footerTxt after',footerTxt)
          onReload();
          onOpenCloseConfirm();
        } catch (error) {
          console.error(error);
        }
    };

    //Funciones Delete:
      const openDeleteConfirm = () => {
        setIsDelete(true);
        setConfirmMessage(`Delete footerTxt ${footerTxt.title}`);
        onOpenCloseConfirm();
    };

    const onDelete = async () => {
        try {
          await footerTxtController.deleteFooterTxt(accessToken, footerTxt._id);
          onReload();
          onOpenCloseConfirm();
          
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="footerTxt-item">
                
                <div className="cont-wrap">
                    
                    <div className="footerTxt-item__info">    
                        <div>
                            <span className="footerTxt-item__info-title">
                                {footerTxt.txt}
                            </span>
                            <span className="footerTxt-item__info-path">
                                Order: {footerTxt.order}
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
                            color={ footerTxt.active ? 'orange' : 'teal'}
                            onClick={ openDesactivateActivateConfirm }
                    >
                        {footerTxt.active ? <Icon.ban/> : <Icon.check/>}
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
                <FooterTxtForm close={onOpenCloseModal} onReload={onReload} footerTxt={footerTxt} />
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