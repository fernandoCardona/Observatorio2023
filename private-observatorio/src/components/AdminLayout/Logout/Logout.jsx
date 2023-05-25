//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { useNavigate } from 'react-router-dom';
 
import { Button } from 'semantic-ui-react';
//IMPORTS DEPENDENCIAS DE LA APP:
import { useAuth } from '../../../hooks';
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import { Icon } from '../../../assets';
import './Logout.scss'



export const Logout = () => {

    //Funcion de Logout:
    const { logout } = useAuth();
    const { navigate } = useNavigate();
  
    const onLogout = () =>{
        logout();
        if (navigate) {
            navigate('/admin');
          }
    }
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = () => {
        setIsAnimating(true);
        onLogout();
        
    }

    return (
        <Icon.Logout className={`logout ${isAnimating && 'logout-animation'}`} onClick={handleClick}/>
        
    )
}