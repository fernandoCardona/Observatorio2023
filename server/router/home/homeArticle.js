//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:
const express = require('express');
const multiparty = require('connect-multiparty');
//IMPORTS DE LA APP:
const HomeArticleController = require('../../controllers/home/homeArticles')
const md_auth = require('../../middlewares/authenticated');
const md_upload = multiparty({uploadDir: './uploads/lotties'});


const api = express.Router();

//MENU ENDPOIND :
api.post('/homeArticle', [md_auth.asureAuth,  md_upload], HomeArticleController.createHomeArticle);
api.get('/homeArticles', HomeArticleController.getHomeArticles);
api.patch('/homeArticle/:id', [md_auth.asureAuth,md_upload], HomeArticleController.updateHomeArticle);
api.delete('/homeArticle/:id', [md_auth.asureAuth], HomeArticleController.deleteHomeArticle);

module.exports = api;