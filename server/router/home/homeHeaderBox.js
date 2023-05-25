//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:
const express = require('express');
//IMPORTS DE LA APP:
const HomeHeaderBoxController = require('../../controllers/home/homeHeaderBox');
const md_auth = require('../../middlewares/authenticated');

const api = express.Router();

//MENU ENDPOIND :
api.post('/homeHeaderBox', [md_auth.asureAuth], HomeHeaderBoxController.createHomeHeaderBox);
api.get('/homeHeaderBox', HomeHeaderBoxController.getHomeHeaderBox);
api.patch('/homeHeaderBox/:id', [md_auth.asureAuth], HomeHeaderBoxController.updateHomeHeaderBox);
api.delete('/homeHeaderBox/:id', [md_auth.asureAuth], HomeHeaderBoxController.deleteHomeHeaderBox);

module.exports = api;