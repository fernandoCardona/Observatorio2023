//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:
const express = require('express');
//IMPORTS DE LA APP:
const HomeHeaderAncorController = require('../../controllers/home/homeHeaderAncor');
const md_auth = require('../../middlewares/authenticated');

const api = express.Router();

//MENU ENDPOIND :
api.post('/homeHeaderAncor', [md_auth.asureAuth], HomeHeaderAncorController.createHomeHeaderAncor);
api.get('/homeHeaderAncors', HomeHeaderAncorController.getHomeHeaderAncors);
api.patch('/homeHeaderAncor/:id', [md_auth.asureAuth], HomeHeaderAncorController.updateHomeHeaderAncor);
api.delete('/homeHeaderAncor/:id', [md_auth.asureAuth], HomeHeaderAncorController.deleteHomeHeaderAncor);

module.exports = api;