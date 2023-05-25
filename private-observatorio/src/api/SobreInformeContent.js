//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
//IMPORTS DEPENDENCIAS DE LA APP:
import { ENV } from '../utils';
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:

export class SobreInformeContent {
    baseApi = ENV.BASE_API;

    async getSobreInformeContent( active = undefined ) {
        try {
          const url = `${this.baseApi}/${ENV.API_ROUTES.OBSERVATORIOCONTENT}?active=${active}`;
            //console.log(url)
          const response = await fetch(url);
          const result = await response.json();
    
          if (response.status !== 200) throw result;
      
          return result;

        } catch (error) {
            throw error;
        }
    }

    async createSobreInformeContent(accessToken, data) {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });
            
            const url = `${this.baseApi}/${ENV.API_ROUTES.OBSERVATORIOCONTENT}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  Authorization: `Bearer ${ accessToken }`,
                },
                body: JSON.stringify(data),
            }
    
            const response = await fetch( url, params );
            const result = await response.json();
      
            if (response.status !== 201) throw result;
      
            return result;

        } catch (error) {
            throw error;
        }
    } 

    async updateSobreInformeContent(accessToken, idSobreInformeContent, data) {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            }); 

            const url = `${this.baseApi}/${ENV.API_ROUTES.OBSERVATORIOCONTENT}/${idSobreInformeContent}`;
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

    async deleteSobreInformeContent(accessToken, idSobreInformeContent) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.OBSERVATORIOCONTENT}/${idSobreInformeContent}`;
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