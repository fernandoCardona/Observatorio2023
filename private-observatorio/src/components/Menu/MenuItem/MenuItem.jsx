//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Button, Confirm, Image } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from '../../Shared';
import { Menu } from "../../../api";
import { useAuth } from "../../../hooks";
import { ENV } from '../../../utils';
//IMPORTS COMPONENTS DE LA APP:
import { MenuForm } from '../MenuForm';
//IMPORTS Styles/Images DE LA APP:
import { image, Icon } from '../../../assets';
import './MenuItem.scss';


const menuController = new Menu();

export const MenuItem = ( props ) => {
    //Obtenemos props:
    const { menu, onReload } = props;
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
    //Creamos la funcion updateModal para actualizar el menu:
    const openUpdateMenu = () => {
        setTitleModal(`Update menu: ${ menu.title }`);
        onOpenCloseModal();
    }

    const openDesactivateActivateConfirm = () => {
        setIsDelete(false);
        setConfirmMessage( 
            menu.active 
            ? `Desactivate menu ${ menu.title }` 
            : `Activate menu ${ menu.title }`
        );
        onOpenCloseConfirm();
    }

    //Funcion active/Desactive btn:
    const onActivateDesactivate = async () => {
        try {
          await menuController.updateMenu(accessToken, menu._id, {
            active: !menu.active,
          });
          onReload();
          onOpenCloseConfirm();
        } catch (error) {
          console.error(error);
        }
    };

    //Funciones Delete:
      const openDeleteConfirm = () => {
        setIsDelete(true);
        setConfirmMessage(`Delete menu ${menu.title}`);
        onOpenCloseConfirm();
    };

    const onDelete = async () => {
        try {
          await menuController.deleteMenu(accessToken, menu._id);
          onReload();
          onOpenCloseConfirm();
          
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="menu-item">
                
                <div className="cont-wrap">
                    <div className="menu-item__miniature">
                        <span className="cont-miniature">
                            {
                                menu?.navImage1 && <Image className="miniature" src={`${ENV.BASE_PATH}/${menu?.navImage1}`}/> 
                            }
                            {
                                menu?.navImage2 && <Image className="miniature" src={`${ENV.BASE_PATH}/${menu?.navImage2}`}/> 
                            }
                        </span>
                    </div>
                    <div className="menu-item__info">    
                        <div>
                            <span className="menu-item__info-title">
                                {menu.title}
                            </span>
                            <span className="menu-item__info-path">
                                Path: {menu.path}
                            </span>
                            <span className="menu-item__info-path">
                                Order: {menu.order}
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
                            color={ menu.active ? 'orange' : 'teal'}
                            onClick={ openDesactivateActivateConfirm }
                    >
                        {menu.active ? <Icon.ban/> : <Icon.check/>}
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
                <MenuForm onClose={onOpenCloseModal} onReload={onReload} menu={menu} />
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