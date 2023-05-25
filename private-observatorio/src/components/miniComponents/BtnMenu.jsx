//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Button, Icon } from 'semantic-ui-react'
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import './BtnMenu.scss';

export const BtnMenu = ({ onClick }) => {


    return (
        // <Button icon className='resetBtn menuResp'>
        //     <Icon name='bars' />
        // </Button>
        <div className="menuResp btn_menu_mobile" onClick={onClick} >
            
            <span className="hamburguer-menu"></span>
        </div>
    )
}
