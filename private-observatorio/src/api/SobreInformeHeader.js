//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
//IMPORTS DEPENDENCIAS DE LA APP:
import { cloneElement } from 'react';
import { ENV } from '../utils';
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:

export class SobreInformeHeader {
    baseApi = ENV.BASE_API;

    async getSobreInformeHeader( active = undefined ) {
        try {
          const url = `${this.baseApi}/${ENV.API_ROUTES.SOBREINFORMEHEADER}?active=${active}`;
            //console.log(url)
          const response = await fetch(url);
          const result = await response.json();
    
          if (response.status !== 200) throw result;
      
          return result;

        } catch (error) {
            throw error;
        }
    }

    async createSobreInformeHeader(accessToken, data) {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });
    
            if (data.file) {
                formData.append("video", data.file);
            }
    
            const url = `${this.baseApi}/${ENV.API_ROUTES.SOBREINFORMEHEADER}`;
            const params = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData,
            };
    
            const response = await fetch(url, params);
            const result = await response.json();
    
            if (response.status !== 201) throw result;
    
            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateSobreInformeHeader(accessToken, idSobreInformeHeader, sobreInformeHeaderData) {
        try {
            const data = sobreInformeHeaderData;
            
    
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });
    
            if (data.file) {
                formData.append("image", data.file);
            }
   
            const url = `${ENV.BASE_API}/${ENV.API_ROUTES.SOBREINFORMEHEADER}/${idSobreInformeHeader}`;
            const params = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData,
            };
    
            const response = await fetch(url, params);
            const result = await response.json();
    
            if (response.status !== 200) throw result;
    
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteSobreInformeHeader(accessToken, idSobreInformeHeader) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.SOBREINFORMEHEADER}/${idSobreInformeHeader}`;
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