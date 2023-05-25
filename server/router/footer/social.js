//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:
const express = require('express');
const multiparty = require('connect-multiparty');
//IMPORTS DE LA APP:
const SocialController = require('../../controllers/footer/social');
const md_auth = require('../../middlewares/authenticated');
const md_upload = multiparty({uploadDir: './uploads/social'});


const api = express.Router();

//MENU ENDPOIND :
api.post('/social', [md_auth.asureAuth,  md_upload], SocialController.createSocial);
api.get('/social', SocialController.getSocials);
api.patch('/social/:id', [md_auth.asureAuth, md_upload], SocialController.updateSocial);
api.delete('/social/:id', [md_auth.asureAuth], SocialController.deleteSocial);

module.exports = api;