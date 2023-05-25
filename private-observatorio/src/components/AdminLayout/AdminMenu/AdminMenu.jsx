
//IMPORTS DE REACT:
 
//IMPORTS DEPENDENCIAS DE TERCEROS:
 
import { Link, useLocation } from "react-router-dom";
import { Menu, Icon } from 'semantic-ui-react';
//IMPORTS DEPENDENCIAS DE LA APP:
import { useAuth } from '../../../hooks'
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import './AdminMenu.scss'



export const AdminMenu = ({ onClick }) => {

    const { pathname } = useLocation();
    //Obtenemos eltipo de role del usuario atraves del use auth:
    const { user: { role } } = useAuth();
    const isAdmin = role === 'admin';

    const isCurrentPath = ( path ) =>{
        if (path === pathname ) return true; 
        return false;
    }

    return (
        <Menu fluid vertical icon text className="admin-menu">
            {/* {
                isAdmin &&(
                <>
                    
                </>
                    
                )
            } */}
            <Menu.Item as={Link} to='/admin/users' active={isCurrentPath('/admin/users')} onClick={onClick}>
                {/* <Icon name='user outline'/> */}
                User
            </Menu.Item>

            <Menu.Item as={Link} to='/admin/navbar' active={isCurrentPath('/admin/navbar')} onClick={onClick}>
                {/* <Icon name='comment alternate outline'/> */}
                Navbar
            </Menu.Item>

            <Menu.Item as={Link} to='/admin/footer' active={isCurrentPath('/admin/footer')} onClick={onClick}>
                {/* <Icon name='comment alternate outline'/> */}
                Footer
            </Menu.Item>

            <Menu.Item as={Link} to='/admin/home' active={isCurrentPath('/admin/home')} onClick={onClick}>
                {/* <Icon name='comment alternate outline'/> */}
                Home
            </Menu.Item>

            <Menu.Item as={Link} to='/admin/sobreInforme' active={isCurrentPath('/admin/sobreInforme')} onClick={onClick}>
                {/* <Icon name='bars'/> */}
                Sobre el informe
            </Menu.Item>

            <Menu.Item as={Link} to='/admin/informesAnteriores' active={isCurrentPath('/admin/informesAnteriores')} onClick={onClick}>
                {/* <Icon name='computer'/> */}
                Informes anteriores
            </Menu.Item>

            <Menu.Item as={Link} to='/admin/pdfs' active={isCurrentPath('/admin/pdfs')} onClick={onClick}>
                {/* <Icon name='file'/> */}
                Pdfs informes
            </Menu.Item>
            <Menu.Item as={Link} to='/admin/emails' active={isCurrentPath('/admin/emails')} onClick={onClick}>
                {/* <Icon name='mail'/> */}
                Listado emails
            </Menu.Item>
            
        </Menu>
    );
}