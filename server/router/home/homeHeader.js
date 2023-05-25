//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:
const express = require('express');
const multiparty = require('connect-multiparty');
//IMPORTS DE LA APP:
const HomeHeaderController = require('../../controllers/home/homeHeader');
const md_auth = require('../../middlewares/authenticated');
const md_upload = multiparty({uploadDir: './uploads/videos'});


const api = express.Router();

//MENU ENDPOIND :
api.post('/homeHeader', [md_auth.asureAuth,  md_upload], HomeHeaderController.createHomeHeader);
api.get('/homeHeader', HomeHeaderController.getHomeHeader);
api.patch('/homeHeader/:id', [md_auth.asureAuth,md_upload], HomeHeaderController.updateHomeHeader);
api.delete('/homeHeader/:id', [md_auth.asureAuth], HomeHeaderController.deleteHomeHeader);

module.exports = api;