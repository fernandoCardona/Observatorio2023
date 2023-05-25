//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:
const express = require('express');
const multiparty = require('connect-multiparty');
//IMPORTS DE LA APP:
const IntSobreHeaderController = require('../../controllers/intSobre/intSobreHeader');
const md_auth = require('../../middlewares/authenticated');
const md_upload = multiparty({uploadDir: './uploads/images/'});


const api = express.Router();

//MENU ENDPOIND :
api.post('/intSobreHeader', [md_auth.asureAuth,  md_upload], IntSobreHeaderController.createIntSobreHeader);
api.get('/intSobreHeader', IntSobreHeaderController.getIntSobreHeader);
api.patch('/intSobreHeader/:id', [md_auth.asureAuth,md_upload], IntSobreHeaderController.updateIntSobreHeader);
api.delete('/intSobreHeader/:id', [md_auth.asureAuth], IntSobreHeaderController.deleteIntSobreHeader); 

module.exports = api;