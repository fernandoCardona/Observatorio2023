//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:
const express = require('express');
//IMPORTS DE LA APP:
const FooterTxtController = require('../../controllers/footer/footerTxt');
const md_auth = require('../../middlewares/authenticated');


const api = express.Router();

//MENU ENDPOIND :
api.post('/footerTxt', [md_auth.asureAuth], FooterTxtController.createFooterTxt);
api.get('/footerTxt', FooterTxtController.getFooterTxts);
api.patch('/footerTxt/:id', [md_auth.asureAuth], FooterTxtController.updateFooterTxt);
api.delete('/footerTxt/:id', [md_auth.asureAuth], FooterTxtController.deleteFooterTxt);

module.exports = api;