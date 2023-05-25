//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Button, Confirm, Image } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from '../../../Shared';
import { HomeArticles } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from '../../../../utils';
//IMPORTS COMPONENTS DE LA APP:
import { HomeArticlesForm } from '../HomeArticlesForm/HomeArticlesForm.jsx';
//IMPORTS Styles/Images DE LA APP:
import { image, Icon } from '../../../../assets';
import './HomeArticlesItem.scss';


const homeArticlesController = new HomeArticles();

export const HomeArticlesItem = ( props ) => {
    //Obtenemos props:
    //console.log(props)
    const { homeArticle, onReload } = props;
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

    //Creamos la funcion updateModal para actualizar el homeArticles:
    const openUpdateMenu = () => {
        setTitleModal(`Update homeArticles: ${ homeArticle.title }`); 
        onOpenCloseModal();
    }

    const openDesactivateActivateConfirm = () => {
        setIsDelete(false);
        setConfirmMessage( 
            homeArticle.active 
            ? `Desactivate homeArticles ${ homeArticle.title }` 
            : `Activate homeArticles ${ homeArticle.title }`
        );
        onOpenCloseConfirm();
    }

    //Funcion active/Desactive btn:
    const onActivateDesactivate = async () => {
        try {
            //console.log('homeArticles before',homeArticles)
          await homeArticlesController.updateHomeArticle(accessToken, homeArticle._id, {
            active: !homeArticle.active,
          });
            //console.log('homeArticles after',homeArticles)
          onReload();
          onOpenCloseConfirm();
        } catch (error) {
          console.error(error);
        }
    };

    //Funciones Delete:
      const openDeleteConfirm = () => {
        setIsDelete(true);
        setConfirmMessage(`Delete homeArticles ${homeArticle.title}`);
        onOpenCloseConfirm();
    };

    const onDelete = async () => {
        try {
          await homeArticlesController.deleteHomeArticle(accessToken, homeArticle._id);
          onReload();
          onOpenCloseConfirm();
          
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="homeArticles-item">
                
                <div className="cont-wrap">
                    <div className="homeArticles-item__miniature">
                        <span className="cont-miniature">
                            {
                                homeArticle?.image1 && <Image className="miniature" src={`${ENV.BASE_PATH}/${homeArticle?.image1}`}/> 
                            } 
                            
                            { 
                                homeArticle?.image && 
                                <Image  className="miniature" 
                                        src={homeArticle.image 
                                            ? `${ENV.BASE_PATH}/${homeArticle.image}`
                                            : image.noImage }/>
                                  
                            }
                            {/* {
                                homeArticle?.lottie && 
                                <Image className="miniature" 
                                       src={homeArticle.lottie 
                                       ? `${ENV.BASE_PATH}/${homeArticle.lottie}`
                                       : image.noImage }/> 
                            } */}
                            
                        </span>
                    </div>
                    <div className="homeArticles-item__info">    
                        <div>
                            <span className="homeArticles-item__info-title">
                                {homeArticle.title}
                            </span>
                            <span className="homeArticles-item__info-txt">
                                {homeArticle.txt1}
                            </span>
                            <span className="homeArticles-item__info-txt">
                                {homeArticle.txt2}
                            </span>
                            <span className="homeArticles-item__info-path">
                                Pdf: {homeArticle.btnPath}
                            </span>
                            <span className="homeArticles-item__info-path">
                               Lottie: {homeArticle.lottie}
                            </span>
                            <span className="homeArticles-item__info-path">
                                Order: {homeArticle.order}
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
                            color={ homeArticle.active ? 'orange' : 'teal'}
                            onClick={ openDesactivateActivateConfirm }
                    >
                        {homeArticle.active ? <Icon.ban/> : <Icon.check/>}
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
                <HomeArticlesForm close={onOpenCloseModal} onReload={onReload} homeArticle={homeArticle} />
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