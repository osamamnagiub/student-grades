const auth = require("../../middleware/auth")
const mongoose = require('mongoose')
const {generateAuthToken} = require("../../services/TokenService");



describe('auth middleware', () => {
    it('should populate req.user with the payload of a valid teacher', () => {
        const teacher = {
            _id: mongoose.Types.ObjectId().toHexString(),
            name: 'osama',
            username : 'teacher1'
        }
        const token = generateAuthToken(teacher)

        const req = {
            header: jest.fn().mockReturnValue(token)
        }
        const res = {};
        const next = jest.fn();
        auth(req, res, next);

        expect(req.user).toMatchObject(teacher);
    })

    it('should return error if token is invalid', () => {
        const req = {
            header: jest.fn().mockReturnValue('123123123eqwdasds')
        }
        const res = {};
        const next = jest.fn();
        auth(req, res, next);


        expect(req.user).toBeFalsy();
        expect(next).toHaveBeenLastCalledWith(expect.anything());
    })

})