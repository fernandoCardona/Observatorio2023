const express = require('express');
const AuthController = require('../controllers/auth');

const api = express.Router();

//AUTH ENDPOIND REGISTER:
api.post('/auth/register', AuthController.register);
//AUTH ENDPOIND LOGIN:
api.post('/auth/login', AuthController.login);
//AUTH ENDPOIND REFRESHACCESSTOKEN:
api.post('/auth/refresh_access_token', AuthController.refreshAccessToken);

//USER ENDPOIND :

module.exports = api;