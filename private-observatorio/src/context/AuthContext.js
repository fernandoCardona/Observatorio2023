//IMPORTS DE REACT:
import { useState, useEffect, createContext } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
//IMPORTS DEPENDENCIAS DE LA APP:
import { User, Auth } from '../api';
import { hasExpiredToken } from "../utils";

//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:

const userController = new User();
const authController = new Auth();

export const AuthContext = createContext();

export function AuthProvider( props )  {
    const { children } = props;
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        (async () => {
            //Comprueba si el usuario esta logeado o no atraves del token :
            const accessToken = authController.getAccessToken();
            const refreshToken = authController.getRefreshToken();

            if (!accessToken || !refreshToken) {
                logout();
                setLoading(false);
                return;
            }
            
            if ( hasExpiredToken( accessToken ) ) {
                //Si ha caducado el token;
                if ( hasExpiredToken( refreshToken ) ) {
                    logout();
                }else{
                    await reLogin( refreshToken );
                }

            }else{
                await login( accessToken )
            }

            setLoading(false);
        })();
        
    }, []);

    const login = async( accessToken ) => {
        try {
            const response = await userController.getMe(accessToken);
            delete response.password;
            
            setUser(response);
            setToken(accessToken);
             
        } catch (error) {
            console.log(error)
        }
    }

    const reLogin = async( refreshToken ) => {
        try {
            const { accessToken } = await authController.refreshAccessToken( refreshToken );

            authController.setAccessToken( accessToken );
            await login( accessToken );

        } catch (error) {
            throw error;
        }
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        authController.removeTokens();
    }

    const data = {
        accessToken: token,
        user,
        login,
        logout
         
    };
    
    if( loading ) return null;

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}