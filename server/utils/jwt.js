const jwt = require('jsonwebtoken');
require('dotenv').config()
//const { JWT_SECRET_KEY } = require('../constants');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
 

function createAccessToken(user) {
    //console.log('userInJWT',user)
     
    const expToken = new Date();
    expToken.setHours( expToken.getHours() + 10 );

    const payload = {
        token_type: 'access',
        user_id: user._id,
        iat: Date.now(),
        exp: expToken.getTime()
    };

    return jwt.sign( payload, JWT_SECRET_KEY );

}

function createRefreshToken(user) {
    const expToken = new Date();
    expToken.getMonth( expToken.getMonth() + 1 );

    const payload = {
        token_type: 'refresh',
        user_id: user._id,
        iat: Date.now(),
        exp: expToken.getTime()
    };

    return jwt.sign( payload, JWT_SECRET_KEY );

}

function decoded(token) {
    return jwt.decode( token, JWT_SECRET_KEY, true);

}

module.exports = {
    createAccessToken,
    createRefreshToken,
    decoded
}