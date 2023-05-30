//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Button, Confirm, Image } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from '../../../Shared';
import { InfAntPost } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from '../../../../utils';
//IMPORTS COMPONENTS DE LA APP:
import { InfAnterioresPostForm } from '../InfAnterioresPostForm/InfAnterioresPostForm.jsx';
//IMPORTS Styles/Images DE LA APP:
import { image, Icon } from '../../../../assets';
import './InfAnterioresPostItem.scss';


const InfAnterioresPostController = new InfAntPost();

export const InfAnterioresPostItem = ( props ) => {
    //Obtenemos props:
    //console.log(props)
    const { infAnterioresPost, onReload } = props;
    console.log(infAnterioresPost)
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

    //Creamos la funcion updateModal para actualizar el infAnterioresPosts:
    const openUpdateMenu = () => {
        setTitleModal(`Update infAnterioresPosts: ${ infAnterioresPost.title }`); 
        onOpenCloseModal();
    }

    const openDesactivateActivateConfirm = () => {
        setIsDelete(false);
        setConfirmMessage( 
            infAnterioresPost.active 
            ? `Desactivate infAnterioresPosts ${ infAnterioresPost.title }` 
            : `Activate infAnterioresPosts ${ infAnterioresPost.title }`
        );
        onOpenCloseConfirm();
    }

    //Funcion active/Desactive btn:
    const onActivateDesactivate = async () => {
        try {
            //console.log('infAnterioresPosts before',infAnterioresPosts)
          await InfAnterioresPostController.updateInfAntPost(accessToken, infAnterioresPost._id, {
            active: !infAnterioresPost.active,
          });
            //console.log('infAnterioresPosts after',infAnterioresPosts)
          onReload();
          onOpenCloseConfirm();
        } catch (error) {
          console.error(error);
        }
    };

    //Funciones Delete:
      const openDeleteConfirm = () => {
        setIsDelete(true);
        setConfirmMessage(`Delete infAnterioresPosts ${infAnterioresPost.title}`);
        onOpenCloseConfirm();
    };

    const onDelete = async () => {
        try {
          await InfAnterioresPostController.deleteInfAntPost(accessToken, infAnterioresPost._id);
          onReload();
          onOpenCloseConfirm();
          
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="infAnterioresPosts-item">
                
                <div className="cont-wrap">
                    <div className="infAnterioresPosts-item__miniature">
                        <span className="cont-miniature">
                            {
                                infAnterioresPost?.image1 && <Image className="miniature" src={`${ENV.BASE_PATH}/${infAnterioresPost?.image1}`}/> 
                            } 
                            
                            { 
                                infAnterioresPost?.image && 
                                <Image  className="miniature" 
                                        src={infAnterioresPost.image 
                                            ? `${ENV.BASE_PATH}/${infAnterioresPost.image}`
                                            : image.noImage }/>
                                  
                            }
                            {/* {
                                infAnterioresPost?.lottie && 
                                <Image className="miniature" 
                                       src={infAnterioresPost.lottie 
                                       ? `${ENV.BASE_PATH}/${infAnterioresPost.lottie}`
                                       : image.noImage }/> 
                            } */console.log('infAnterioresPost', infAnterioresPost)}
                            
                        </span>
                    </div>
                    <div className="infAnterioresPosts-item__info">    
                        <div>
                            <span className="infAnterioresPosts-item__info-title">
                                {infAnterioresPost.claim}
                            </span>
                            <span className="infAnterioresPosts-item__info-txt">
                                {infAnterioresPost.txt1}
                            </span>
                            <span className="infAnterioresPosts-item__info-txt">
                                {infAnterioresPost.txt2}
                            </span>
                            <span className="infAnterioresPosts-item__info-path">
                                Texto boton: {infAnterioresPost.btnTxt}
                            </span>
                            <span className="infAnterioresPosts-item__info-path">
                                Pdf path: {infAnterioresPost.btnPath}
                            </span>
                            <span className="infAnterioresPosts-item__info-path">
                                Order: {infAnterioresPost.order}
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
                            color={ infAnterioresPost.active ? 'orange' : 'teal'}
                            onClick={ openDesactivateActivateConfirm }
                    >
                        {infAnterioresPost.active ? <Icon.ban/> : <Icon.check/>}
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
                <InfAnterioresPostForm close={onOpenCloseModal} onReload={onReload} infAnterioresPost={infAnterioresPost} />
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