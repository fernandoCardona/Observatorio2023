//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:
const express = require('express');
const multiparty = require('connect-multiparty');
//IMPORTS DE LA APP:
const UserController = require('../controllers/user');
const md_auth = require('../middlewares/authenticated');

const md_upload = multiparty({uploadDir: './uploads/avatar'});

const api = express.Router();

//USER ENDPOIND :
api.get('/user/me', [md_auth.asureAuth], UserController.getMe);
api.get('/users', [md_auth.asureAuth], UserController.getUsers);

api.post('/user', [md_auth.asureAuth, md_upload], UserController.createUser);

api.patch('/user/:id', [md_auth.asureAuth, md_upload], UserController.updateUser);

api.delete('/user/:id', [md_auth.asureAuth], UserController.deleteUser);

module.exports = api;