//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:
const express = require('express');
const multiparty = require('connect-multiparty');
//IMPORTS DE LA APP:
const MenuController = require('../../controllers/navBar/menu');
const md_auth = require('../../middlewares/authenticated');
const md_upload = multiparty({uploadDir: './uploads/navImage'});


const api = express.Router();

//MENU ENDPOIND :
api.post('/menu', [md_auth.asureAuth,  md_upload], MenuController.createMenu);
api.get('/menu', MenuController.getMenus);
api.patch('/menu/:id', [md_auth.asureAuth,md_upload], MenuController.updateMenu);
api.delete('/menu/:id', [md_auth.asureAuth], MenuController.deleteMenu);

module.exports = api;