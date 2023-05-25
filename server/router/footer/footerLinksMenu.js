//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:
const express = require('express');

//IMPORTS DE LA APP:
const FooterLinksController = require('../../controllers/footer/footerLinksMenu');
const md_auth = require('../../middlewares/authenticated');

const api = express.Router();

//MENU ENDPOIND :
api.post('/footerLinksMenu', [md_auth.asureAuth], FooterLinksController.createFooterLink);
api.get('/footerLinksMenu', FooterLinksController.getFooterLinks);
api.patch('/footerLinksMenu/:id', [md_auth.asureAuth], FooterLinksController.updateFooterLink);
api.delete('/footerLinksMenu/:id', [md_auth.asureAuth], FooterLinksController.deleteFooterLink);

module.exports = api;