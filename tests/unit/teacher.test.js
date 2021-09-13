const jwt = require('jsonwebtoken')
const config = require('config')
const mongoose = require('mongoose')
const tokenService = require('../../services/TokenService')



describe('tokenService.generateAuthToken', () => {
    it('should return a valid jwt', () => {
        const payload = { _id: new mongoose.Types.ObjectId().toHexString(), name: 'teacher1', username: 'teacher1' };
        const token = tokenService.generateAuthToken(payload);
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        expect(decoded).toMatchObject(payload);
    })
})