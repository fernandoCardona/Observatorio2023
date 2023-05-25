//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:
const express = require('express');
const multiparty = require('connect-multiparty');
//IMPORTS DE LA APP:
const IntSobreBlockTxtController = require('../../controllers/intSobre/intSobreBlockTxt');
const md_auth = require('../../middlewares/authenticated');
const md_upload = multiparty({uploadDir: './uploads/intSobre/'});


const api = express.Router();

//MENU ENDPOIND :
api.post('/intSobreBlockTxt', [md_auth.asureAuth,  md_upload], IntSobreBlockTxtController.createIntSobreBlockTxt);
api.get('/intSobreBlockTxt', IntSobreBlockTxtController.getIntSobreBlockTxt);
api.patch('/intSobreBlockTxt/:id', [md_auth.asureAuth,md_upload], IntSobreBlockTxtController.updateIntSobreBlockTxt);
api.delete('/intSobreBlockTxt/:id', [md_auth.asureAuth], IntSobreBlockTxtController.deleteIntSobreBlockTxt); 
 
module.exports = api;