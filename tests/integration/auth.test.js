const request = require('supertest');
const { Teacher } = require("../../models/teacher");
const { generatePasswordHash } = require("../../services/AuthService");

let server;

describe('login route', () => {

    let username;
    let password;

    const exec = () => {
        return request(server)
            .post('/api/login')
            .send({ username, password })
    }

    beforeEach(async () => {
        server = require('../../index');
        username = "teacher1";
        password = '123456'

        
        const hashedPassword = await generatePasswordHash(password);
        const teacher = new Teacher({
            name: 'osama',
            username: username,
            password: hashedPassword
        })

        await teacher.save();
    })

    afterEach(async () => {
        await server.close();
        await Teacher.remove({});
    })


    it('should return 200 with token in x-auth-token header', async () => {
        const res = await exec();

        expect(res.headers['x-auth-token']).toBeTruthy();
    })

    it('should return 400 if username is not valid', async () => {
        username = '';

        const res = await exec();

        expect(res.status).toBe(400);
    })


    it('should return 400 if password is not valid', async () => {
        password = '';

        const res = await exec();

        expect(res.status).toBe(400);
    })

    it('should return 400 if password is not valid', async () => {
        password = '1234567';

        const res = await exec();

        expect(res.status).toBe(400);
    })


    it('should return 400 if username does not exist', async () => {
        username = "teacher2";

        const res = await exec();

        expect(res.status).toBe(400);
    })
    it('should return 400 if password is not valid', async () => {
        password = "123455";

        const res = await exec();

        expect(res.status).toBe(400);
    })
})