//IMPORTS DEPENDENCIAS:
const express = require('express');
const multiparty = require('connect-multiparty');
//IMPORTS DE LA APP:
const ObservatorioContentController = require('../../controllers/intSobre/obserContent');
const md_auth = require('../../middlewares/authenticated');


const api = express.Router();

//MENU ENDPOIND :
api.post('/observatorioContent', [md_auth.asureAuth], ObservatorioContentController.createObservatorioContent);
api.get('/observatorioContent', ObservatorioContentController.getObservatorioContent);
api.patch('/observatorioContent/:id', [md_auth.asureAuth], ObservatorioContentController.updateObservatorioContent);
api.delete('/observatorioContent/:id', [md_auth.asureAuth], ObservatorioContentController.deleteObservatorioContent); 
 
module.exports = api;