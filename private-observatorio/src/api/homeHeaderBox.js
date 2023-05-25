//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
//IMPORTS DEPENDENCIAS DE LA APP:
import { cloneElement } from 'react';
import { ENV } from '../utils';
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:

export class HomeHeaderBox {
    baseApi = ENV.BASE_API;

    async getHomeHeaderBox( active = undefined ) {
        try { 
          const url = `${this.baseApi}/${ENV.API_ROUTES.HOMEHEADERBOX}?active=${active}`;
   
          const response = await fetch(url); 
          const result = await response.json();console.log(result)
  
          if (response.status !== 200) throw result;
      
          return result;

        } catch (error) {
            throw error;
        }
    }

    async createHomeHeaderBox(accessToken, data) {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });
           
            //console.log('data-1', data)
            const url = `${this.baseApi}/${ENV.API_ROUTES.HOMEHEADERBOX}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  Authorization: `Bearer ${ accessToken }`,
                },
                body: JSON.stringify(data),
            };
   
            const response = await fetch( url, params );
            const result = await response.json();
      
            if (response.status !== 201) throw result;
      
            return result;

        } catch (error) {
            throw error;
        }
    }

    async updateHomeHeaderBox(accessToken, idhomeHeaderBox, data) {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });
            
            const url = `${this.baseApi}/${ENV.API_ROUTES.HOMEHEADERBOX}/${idhomeHeaderBox}`;
            const params = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                Authorization: `Bearer ${ accessToken }`,
                },
                body: JSON.stringify(data),
            };
    
            const response = await fetch(url, params);
            const result = await response.json();
    
            if (response.status !== 200) throw result;
    
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteHomeHeaderBox(accessToken, idhomeHeaderBox) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.HOMEHEADERBOX}/${idhomeHeaderBox}`;
            const params = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
    
            const response = await fetch(url, params);
            const result = await response.json();
    
            if (response.status !== 200) throw result;
    
            return result;

        } catch (error) {
            throw error;
        }
    }

}