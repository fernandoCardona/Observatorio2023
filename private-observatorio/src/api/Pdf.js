//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
//IMPORTS DEPENDENCIAS DE LA APP:
import { ENV } from '../utils';
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:

export class Pdf {
    baseApi = ENV.BASE_API;

    async getPdf( active = undefined ) {
        try {
          const url = `${this.baseApi}/${ENV.API_ROUTES.PDF}?active=${active}`;
            //console.log(url)
          const response = await fetch(url);
          const result = await response.json();
    
          if (response.status !== 200) throw result;
      
          return result;

        } catch (error) {
            throw error;
        }
    }

    async createPdf(accessToken, data) {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });
    
            if (data.file) {
                formData.append("pdf", data.file);
            }
    
            const url = `${this.baseApi}/${ENV.API_ROUTES.PDF}`;
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

    async updatePdf(accessToken, idPdf, pdfData) {
        try {
            const data = pdfData;
            
    
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });
    
            if (data.file) {
                formData.append("pdf", data.file);
            }
   
            const url = `${ENV.BASE_API}/${ENV.API_ROUTES.PDF}/${idPdf}`;
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

    async deletePdf(accessToken, idPdf) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.PDF}/${idPdf}`;
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