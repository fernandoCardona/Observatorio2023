//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:
const express = require('express');
const multiparty = require('connect-multiparty');
//IMPORTS DE LA APP:
const InfAnterioresHeaderController = require('../../controllers/infAnteriores/infAnterioresHeader');
const md_auth = require('../../middlewares/authenticated');
const md_upload = multiparty({uploadDir: './uploads/infAnteriores/'});


const api = express.Router();

//MENU ENDPOIND :
api.post('/infAnterioresHeader', [md_auth.asureAuth,  md_upload], InfAnterioresHeaderController.createInfAnterioresHeader);
api.get('/infAnterioresHeader', InfAnterioresHeaderController.getInfAnterioresHeader);
api.patch('/infAnterioresHeader/:id', [md_auth.asureAuth,md_upload], InfAnterioresHeaderController.updateInfAnterioresHeader);
api.delete('/infAnterioresHeader/:id', [md_auth.asureAuth], InfAnterioresHeaderController.deleteInfAnterioresHeader); 

module.exports = api; 