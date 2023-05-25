//IMPORTS DE REACT:
import React, { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Tab, Image } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
import { RegisterForm, LoginForm } from '../../components/Auth'
//IMPORTS Styles/Images DE LA APP:
import { image } from "../../assets";
import './Auth.scss';

export const Auth = () => {
    //controlala posicion de index login o Register:
    const [activeIndex, setActiveIndex] = useState(0);
    const openLogin = () => setActiveIndex(0);
    const panes = [
      {
        menuItem: "Login",
        render: () =>(
            <Tab.Pane>
                <LoginForm/>
            </Tab.Pane>
        ),
      },
      {
        menuItem: "Register",
        render: () =>( 
            <Tab.Pane>
                <RegisterForm openLogin={openLogin}/>
            </Tab.Pane>
        ),
      },
    ]

    return (
        <div className="auth">
            <Image src={image.bestinverBlack} className='logo'/>
            <Tab  panes={panes} 
                  className="auth__forms" 
                  activeIndex={activeIndex} 
                  onTabChange={(_, data) => setActiveIndex( data.activeIndex )}
            />
        </div>
    )
}
