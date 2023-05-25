//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS:
//IMPORTS DE LA APP:
const jwt = require('../utils/jwt');

const asureAuth = ( req, res, next ) => {
    //Obtenemos el token del usuario:
    if (!req.headers.authorization){
        return res.status(403).send({ 
            msg: 'La peticion no tiene la cabecera de autentificacion' 
        });
    }
    const token = req.headers.authorization.replace('Bearer ', '');
    //console.log(token);

    try {
        const payload = jwt.decoded(token);
        
        //Extraemos fecha actual:
        const { exp } = payload;
        const currentData = new Date().getTime();
        
        //Comprobamos que la fecha de expiracion no es menor que la fecha actual, eso querria decir que ha expirado:
        if ( exp <= currentData ) {
            return res.status(403).send({ msg: 'El Token ha expirado.' });
        }

        req.user = payload;
        next();
        
    } catch (error) {
        return res.status(400).send({ msg: 'Token invalido.'})
    }
    
}

module.exports = {
    asureAuth
}