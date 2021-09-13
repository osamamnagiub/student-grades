const request = require('supertest');
const path = require("path");
const grades = require('../fixtures/grades.json')
const {StudentGrade} = require("../../models/studentGrade");
const {generateAuthToken} = require("../../services/TokenService");


describe('/api/courses', () => {
    let server;
    // 20 seconds timeout
    describe('GET /api/courses/courseId/grades', () => {
        let token;
        let courseId;
        const exec = () => {
            return request(server)
                .get(`/api/courses/${courseId}/grades`)
                .set('x-auth-token', token)
                .send();
        }


        beforeEach(async () => {
            server = require('../../index');

            await StudentGrade.remove({})
            await StudentGrade.collection.insertMany(grades)

            token = generateAuthToken({name: 'testUser'});
            courseId = "ELC2021";
        })

        afterEach(async () => {
            await server.close();
            await StudentGrade.remove({})

        })


        it('should return 401 if not authenticated', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        })

        it('should return 400 if token is not valid', async () => {
            token = '1';

            const res = await exec();

            expect(res.status).toBe(400);
        })

        it('should return 400 if course id is not valid', async () => {
            courseId = 'elc2021'

            const res = await exec();

            expect(res.status).toBe(400);
        })


        it('should return 200 if course id is valid', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
        })

        it('should return object with count of documents', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('count');
            expect(res.body).toHaveProperty('result');
            expect(res.body.count).toBe(grades.length);
            expect(res.body.result.length).toBe(10);
        })

    })

    describe('GET /api/courses/courseId/grades/upload', () => {

        let token;
        beforeEach(async () => {
            server = require('../../index');
            token = generateAuthToken({name: 'testUser'});
        })

        afterEach(async () => {
            await server.close();
        })


        it('should return 401 if not authenticated', async () => {
            const res = await request(server)
                .post(`/api/courses/ELC2021/grades/upload`)


            expect(res.status).toBe(401);
        })

        it('should return 400 if file not valid', async () => {
            const res = await request(server)
                .post(`/api/courses/ELC2021/grades/upload`)
                .set('x-auth-token', token)

            expect(res.status).toBe(400);
            expect(res.body.message).toContain('invalid file');
        })

        it('should return 400 if email is not valid', async () => {
            const filepath = path.join(__dirname, '../fixtures/MOCK_DATA.csv')
            const res = await request(server)
                .post(`/api/courses/ELC2021/grades/upload`)
                .set('x-auth-token', token)
                .field('email', 'osa')
                .attach('file', filepath);

            expect(res.status).toBe(400);
            expect(res.body.message).toContain('invalid email');
        })


        it('should return 200 if file uploaded successfully', async () => {
            const filepath = path.join(__dirname, '../fixtures/MOCK_DATA.csv')
            const res = await request(server)
                .post(`/api/courses/ELC2021/grades/upload`)
                .set('x-auth-token', token)
                .field('email', 'osama.mn@live.com')
                .attach('file', filepath);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('jobid');
            expect(res.body).toHaveProperty('statusUrl');
        })
    })
})