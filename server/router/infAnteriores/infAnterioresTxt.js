//IMPORTS DEPENDENCIAS:
const express = require('express');
const multiparty = require('connect-multiparty');
//IMPORTS DE LA APP:
const InfAnterioresBlockTxtController = require('../../controllers/infAnteriores/infAntTxt');
const md_auth = require('../../middlewares/authenticated');



const api = express.Router();

//MENU ENDPOIND :
api.post('/infAntBlockTxt', [md_auth.asureAuth], InfAnterioresBlockTxtController.createInfAnterioresBlockTxt);
api.get('/infAntBlockTxt', InfAnterioresBlockTxtController.getInfAnterioresBlockTxt);
api.patch('/infAntBlockTxt/:id', [md_auth.asureAuth], InfAnterioresBlockTxtController.updateInfAnterioresBlockTxt);
api.delete('/infAntBlockTxt/:id', [md_auth.asureAuth], InfAnterioresBlockTxtController.deleteInfAnterioresBlockTxt); 
 
module.exports = api;

