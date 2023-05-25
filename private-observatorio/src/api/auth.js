//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
//IMPORTS DEPENDENCIAS DE LA APP:
import { ENV } from '../utils';
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:

export class Auth {
    baseApi = ENV.BASE_API;

    register = async( data ) => {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.REGISTER}`;
            
            const params = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    company: data.company,
                    email: data.email,
                    password: data.password
                }),
            };
            
            const response = await fetch(url, params);
            const result = await response.json();

            //Comprobamos el resultado:
            if ( response.status !== 200 ) throw result;

            //Retornamos el resultado:
            return result;

        } catch (error) {
            throw error;
        }
    }

    login = async( data ) => {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.LOGIN}`;
            const params = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: data.email,
                    company: data.company,
                    password: data.password
                }),
            };
            
            const response = await fetch(url, params);
            const result = await response.json();

            //Comprobamos el resultado:
            if ( response.status !== 200 ) throw result;

            //Retornamos el resultado:
            return result;

        } catch (error) {
            throw error;
        }
    }

    refreshAccessToken = async(refreshToken) => {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.REFRESH_ACCESS_TOKEN}`;
            const params = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: refreshToken,
                }),
            };
        
            const response = await fetch(url, params);
            const result = await response.json();

            //Comprobamos el resultado:
            if ( response.status !== 200 ) throw result;

            //Retornamos el resultado:
            return result;
        
        } catch (error) {
            throw error;
        }
    }

    setAccessToken = (token) => {
        localStorage.setItem( ENV.JWT.ACCESS, token);
    }

    getAccessToken = () => {
        return localStorage.getItem( ENV.JWT.ACCESS);
    }

    setRefreshToken = (token) => {
        localStorage.setItem( ENV.JWT.REFRESH, token);
    }

    getRefreshToken = () => {
        return localStorage.getItem( ENV.JWT.REFRESH);
    }

    removeTokens = () => {
        localStorage.removeItem( ENV.JWT.ACCESS);
        localStorage.removeItem( ENV.JWT.REFRESH);
    }

}