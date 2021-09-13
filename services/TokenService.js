const config = require('config')
const jwt = require('jsonwebtoken');

exports.generateAuthToken = (data) => {
    return jwt.sign(data, config.get('jwtPrivateKey'), { expiresIn: '2d' });
}



exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, config.get('jwtPrivateKey'));
        
    } catch (error) {
        return null;
    }
}
