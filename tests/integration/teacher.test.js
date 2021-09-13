const request = require('supertest');
const {Teacher} = require("../../models/teacher");

let server;

describe('teacher route', () => {

    let name;
    let username;
    let password;

    const exec = () => {
        return request(server)
            .post('/api/teacher')
            .send({name, username, password})
    }

    beforeEach(async () => {
        name = "osama";
        username = "teacher1";
        password = "123456";
        
        server = require('../../index');
    })

    afterEach(async () => {
        await server.close();
        await Teacher.remove({});
    })


    it('should return 200 with created teacher', async () => {
        const res = await exec();

        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('username');
        expect(res.status).toBe(200);
    })


    it('should create teacher in db', async () => {
        await exec();

        const createdTeacher = await Teacher.findOne({username : username});

        expect(createdTeacher.username).toBe(username);
        expect(createdTeacher.name).toBe(name);
        expect(createdTeacher.password).toBeTruthy();
    })

    it('should return 400 if username is not valid', async () => {
        username = '';

        const res = await exec();

        expect(res.status).toBe(400);
        expect(res.body.message).toContain('username');
    })
    it('should return 400 if name is not valid', async () => {
        name = '';

        const res = await exec();

        expect(res.status).toBe(400);
        expect(res.body.message).toContain('name');

    })


    it('should return 400 if password is not valid', async () => {
        password = '';

        const res = await exec();

        expect(res.status).toBe(400);
        expect(res.body.message).toContain('password');

    })


    it('should return 400 if username is less than 5 chars', async () => {
        username = "tea";

        const res = await exec();

        expect(res.status).toBe(400);
        expect(res.body.message).toContain('username');

    })
    it('should return 400 if password is less than 5 chars', async () => {
        password = "123";

        const res = await exec();

        expect(res.status).toBe(400);
    })
    it('should return 400 if teacher with username already exists', async () => {
        await exec(); // first time

        const res = await exec(); // second time

        expect(res.status).toBe(400);
        expect(res.body.message).toContain('teacher already registered');

    })
})