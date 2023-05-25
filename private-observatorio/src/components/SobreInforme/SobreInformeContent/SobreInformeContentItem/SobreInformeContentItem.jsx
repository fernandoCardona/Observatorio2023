//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Button, Confirm, Image, Embed } from "semantic-ui-react";
import ReactPlayer from 'react-player';
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from '../../../Shared';
import { SobreInformeContent } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from '../../../../utils';
//IMPORTS COMPONENTS DE LA APP:
import { SobreInformeContentForm } from "../SobreInformeContentForm/SobreInformeContentForm";
//IMPORTS Styles/Images DE LA APP:
import { image, Icon } from '../../../../assets';
import './SobreInformeContentItem.scss';



const sobreInformeContentController = new SobreInformeContent();

export const SobreInformeContentItem = ( props ) => {
    //Obtenemos props:
    //console.log(props)
    const { sobreInformeContent, onReload } = props;

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

    //Creamos la funcion updateModal para actualizar el sobreInformeContent:
    const openUpdateMenu = () => {
        setTitleModal(`Update sobreInformeContent: ${ sobreInformeContent.title }`); 
        onOpenCloseModal();
    }

    const openDesactivateActivateConfirm = () => {
        setIsDelete(false);
        setConfirmMessage( 
            sobreInformeContent.active 
            ? `Desactivate sobreInformeContent ${sobreInformeContent.title }` 
            : `Activate sobreInformeContent ${ sobreInformeContent.title }`
        );
        onOpenCloseConfirm();
    }

    //Funcion active/Desactive btn:
    const onActivateDesactivate = async () => {
        try {
            //console.log('sobreInformeContent before',sobreInformeContent)
          await sobreInformeContentController.updateSobreInformeContent(accessToken, sobreInformeContent._id, {
            active: !sobreInformeContent.active,
          });
            //console.log('sobreInformeContent after',sobreInformeContent)
          onReload();
          onOpenCloseConfirm();
        } catch (error) {
          console.error(error);
        }
    };

    //Funciones Delete:
      const openDeleteConfirm = () => {
        setIsDelete(true);
        setConfirmMessage(`Delete sobreInformeContent ${sobreInformeContent.title}`);
        onOpenCloseConfirm();
    };

    const onDelete = async () => {
        try {
          await sobreInformeContentController.deleteSobreInformeContent(accessToken, sobreInformeContent._id);
          onReload();
          onOpenCloseConfirm();
          
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="sobreInformeContent-item">
                
                <div className="cont-wrap">
                    <div className="sobreInformeContent-item__miniature">
                        <span className="cont-miniature">
                            
                            {
                               sobreInformeContent?.image && 
                               <Image  className="miniature" 
                               src={sobreInformeContent.image 
                                   ? `${ENV.BASE_PATH}/${sobreInformeContent.image}`
                                   : image.noImage }/>
                            }
 
                        </span>
                    </div>
                    <div className="sobreInformeContent-item__info">    
                        <div>
                            <span className="sobreInformeContent-item__info-title">
                                {sobreInformeContent.title}   
                            </span>
                            <span className="sobreInformeContent-item__info-path">
                                {sobreInformeContent.subtitle1}
                            </span>
                            <span className="sobreInformeContent-item__info-path">
                                {sobreInformeContent.content1}
                            </span>
                            <span className="sobreInformeContent-item__info-path">
                                {sobreInformeContent.subtitle2}
                            </span>
                            <span className="sobreInformeContent-item__info-path">
                                {sobreInformeContent.content2}
                            </span>
                            <span className="sobreInformeContent-item__info-path">
                                {sobreInformeContent.subtitle3}
                            </span>
                            <span className="sobreInformeContent-item__info-path">
                                {sobreInformeContent.content3}
                            </span>
                            <span className="sobreInformeContent-item__info-path">
                                {sobreInformeContent.subtitle4}
                            </span>
                            <span className="sobreInformeContent-item__info-path">
                                {sobreInformeContent.content4}
                            </span>
                            <span className="sobreInformeContent-item__info-path">
                                {sobreInformeContent.subtitle5}
                            </span>
                            <span className="sobreInformeContent-item__info-path">
                                {sobreInformeContent.content5}
                            </span>
                            <span className="sobreInformeContent-item__info-path">
                                {sobreInformeContent.subtitle6}
                            </span>
                            <span className="sobreInformeContent-item__info-path">
                                {sobreInformeContent.content6}
                            </span>
                            <span className="sobreInformeContent-item__info-path">
                                {sobreInformeContent.subtitle7}
                            </span>
                            <span className="sobreInformeContent-item__info-path">
                                {sobreInformeContent.content7}
                            </span>
                            <span className="sobreInformeContent-item__info-path">
                                {sobreInformeContent.subtitle8}
                            </span>
                            <span className="sobreInformeContent-item__info-path">
                                {sobreInformeContent.content8}
                            </span>
                            <span className="sobreInformeContent-item__info-path">
                                {sobreInformeContent.btnTxt}
                            </span>
                            <span className="sobreInformeContent-item__info-path">
                                Order: {sobreInformeContent.order}
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
                            color={ sobreInformeContent.active ? 'orange' : 'teal'}
                            onClick={ openDesactivateActivateConfirm }
                    >
                        {sobreInformeContent.active ? <Icon.ban/> : <Icon.check/>}
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
                <SobreInformeContentForm close={onOpenCloseModal} onReload={onReload} sobreInformeContent={sobreInformeContent} />
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