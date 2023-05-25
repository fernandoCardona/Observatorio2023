//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
//IMPORTS DEPENDENCIAS DE LA APP:
import { ENV } from '../utils';
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:

export class HomeArticles {
    baseApi = ENV.BASE_API;

    async getHomeArticles( active = undefined ) {
        try {
          const url = `${this.baseApi}/${ENV.API_ROUTES.HOMEARTICLES}?active=${active}`;
            //console.log(url)
          const response = await fetch(url);
          const result = await response.json();
    
          if (response.status !== 200) throw result;
      
          return result;

        } catch (error) {
            throw error;
        }
    }

    async createHomeArticle(accessToken, data) {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });
            //console.log(data.file)
            // if (data.file) {
            //     formData.append("image", data.file);
            // }
            //console.log(data.file)
            if (data.file) {
                formData.append("image1", data.file);
            }
            // console.log(data.file2)
            // if (data.file2) {
            //     formData.append("image2", data.file);
            // }
            //console.log('DATA',data)
            const url = `${this.baseApi}/${ENV.API_ROUTES.HOMEARTICLE}`;
            const params = {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${ accessToken }`,
                },
                body: formData,
            };
    
            const response = await fetch( url, params );
            const result = await response.json();
      
            if (response.status !== 201) throw result;
      
            return result;

        } catch (error) {
            throw error;
        }
    } 

    async updateHomeArticle(accessToken, idHomeArticles, data) {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });
             
            //console.log('data.file',data.image1)
            if (data.fileImage) { 
                formData.append("image1", data.fileImage);
            }
            //console.log('data.file2',data.image2)
            // if (data.fileLottie) { 
            //     formData.append("lottie", data.fileLottie);
            // }   

            const url = `${this.baseApi}/${ENV.API_ROUTES.HOMEARTICLE}/${idHomeArticles}`;
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

    async deleteHomeArticle(accessToken, idHomeArticles) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.HOMEARTICLE}/${idHomeArticles}`;
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