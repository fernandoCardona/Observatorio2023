//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:
const express = require('express');
const multiparty = require('connect-multiparty');
//IMPORTS DE LA APP:
const InfAntPostController = require('../../controllers/infAnteriores/infAntPost');
const md_auth = require('../../middlewares/authenticated');
const md_upload = multiparty({uploadDir: './uploads/infAnteriores/'});


const api = express.Router();

//MENU ENDPOIND :
api.post('/InfAntPost', [md_auth.asureAuth,  md_upload], InfAntPostController.createInfAntPost);
api.get('/InfAntPost', InfAntPostController.getInfAntPost);
api.patch('/InfAntPost/:id', [md_auth.asureAuth, md_upload], InfAntPostController.updateInfAntPost);
api.delete('/InfAntPost/:id', [md_auth.asureAuth], InfAntPostController.deleteInfAntPost); 

module.exports = api; 