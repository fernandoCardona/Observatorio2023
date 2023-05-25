//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:
const express = require('express');
const multiparty = require('connect-multiparty');
//IMPORTS DE LA APP:
const FooterLogoController = require('../../controllers/footer/footerLogo');
const md_auth = require('../../middlewares/authenticated');
const md_upload = multiparty({uploadDir: './uploads/footerLogo'});


const api = express.Router();

//MENU ENDPOIND :
api.post('/footerLogo', [md_auth.asureAuth,  md_upload], FooterLogoController.createFooterLogo);
api.get('/footerLogo', FooterLogoController.getFooterLogos);
api.patch('/footerLogo/:id', [md_auth.asureAuth,md_upload], FooterLogoController.updateFooterLogo);
api.delete('/footerLogo/:id', [md_auth.asureAuth], FooterLogoController.deleteFooterLogo);

module.exports = api;