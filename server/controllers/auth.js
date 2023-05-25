//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:
const bcrypt = require('bcryptjs');
//IMPORTS DE LA APP:
const User = require('../models/User');
const jwt = require('../utils/jwt');

const register = ( req, res ) => {
    
    //console.log(req.body);
    const { firstname, company, lastname, email, password } = req.body;
// console.log('EMAIL',email)
// console.log('company',company)
// console.log('req.body',req.body)
    //if (!firstname) res.status(400).send({ msg: 'firstname is required' });
    //if (!lastname) res.status(400).send({ msg: 'lastname is required' });
    if (!email) res.status(400).send({ msg: 'email is required' });
    if (!password) res.status(400).send({ msg: 'password is required' });
    if (!company) res.status(400).send({ msg: 'company is required' });

 
    const user = new User({
        firstname,
        lastname,
        company: company.toLowerCase(),
        email: email.toLowerCase(),
        password,
        role: 'user',
        active: false,
        
    }); 
     
    //Cifrar contraseña:
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
        //console.log(password);
        //console.log(hashPassword)
    user.password = hashPassword;

    user.save(( error, userStorage ) => {
        if (error) {
            res.status(400).send({ msg: 'Error al crear el nuevo usuario'});
        }else {
            res.status(200).send({
                msg: 'Usuario creado correctamente',
                userStorage
            })
        }
    });
    
    //console.log(user)
    //console.log('Se ha ejecutado el registro');
    
}

const login = ( req, res ) => {
    //Obtenemos el email y la contraseña del req.body
    const{ email, password, company } = req.body;
    
    //Comprobamos si recibimos email y password:
    if (!email) res.status(400).send({ msg: 'El email es obligatorio' });
    if (!password) res.status(400).send({ msg: 'El password es obligatorio' });
    if (!company) res.status(400).send({ msg: 'La company es obligatorio' });

    //Pasamos email a minusculas:
    const emailLowerCase = email.toLowerCase();
    //const companyLowerCase = company.toLowerCase();

    //Buscamos si existe ese usuario:
     User.findOne({email: emailLowerCase }, (error, userStored) => {
        if (error) {
            res.status(500).send({ msg: 'Error del servidor' });
        }else {
            //console.log('Password:', userStored.password)
            //console.log(password)
            bcrypt.compare( password, userStored.password, ( bcryptError, check ) => {  
                if (bcryptError) {
                    //servidor 002 no existe el usuario
                    res.status(500).send({ msg: 'Error del servidor 002' });
                }else if (!check) {
                    //servidor 004: Usuario no activo
                    res.status(401).send({ msg: 'Error del servidor 004' });
                    
                }else if (!userStored.active) {
                    //servidor 003: Contraseña incorrecta
                    res.status(400).send({ msg: 'Error del servidor 003', error });
                }else {
                    res.status(200).send({
                        msg: 'login 0k!!',
                        access: jwt.createAccessToken(userStored),
                        refresh: jwt.createRefreshToken(userStored)
                    });
                }
            });
        }
    })    
}
const refreshAccessToken = ( req, res ) => {
    //Obtenemos el token del req.body
    const{ token } = req.body;
    if (!token) {
        res.status(400).send({ msg: 'Token Requerido' });
    }
    //Obtenemos el user_id decodificandolo del jwt:
    const { user_id } = jwt.decoded( token );
    console.log('user_id', user_id)
 
    User.findOne({ _id: user_id }, ( error, userStored) => {
        console.log('userStored', userStored)
        if (error) {
            res.status(500).send({ msg: 'Error del servidor 005' });
        }else { 
            res.status(200).send({
                accessToken: jwt.createAccessToken(userStored),
            });
        }

    });
}

module.exports = {
    register,
    login,
    refreshAccessToken
}
  