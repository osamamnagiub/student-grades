const config = require('config')


module.exports = function () {

    if (!config.get('jwtPrivateKey')) {
        throw new Error("Environment variable 'jwtPrivateKey' is not set");
    } 
}    