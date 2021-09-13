const request = require('supertest');
const grades = require('../fixtures/grades.json')
const {StudentGrade} = require("../../models/studentGrade");

let server;

describe('/api/student', () => {

    describe('GET /api/student/studentId/grades/courseId', () => {
        let courseId;
        let studentId;
        const exec = () => {
            return request(server)
                .get(`/api/student/${studentId}/grades/${courseId}`)
                .send();
        }


        beforeEach(async () => {
            server = require('../../index');

            await StudentGrade.remove({})
            await StudentGrade.collection.insertMany(grades)

            courseId = "ELC2021";
            studentId = "7e841850-9881-40be-bb7a-6b70fc537ff8"
        })

        afterEach(async () => {
            await server.close();
            await StudentGrade.remove({})
        })

        it('should return 400 if course id is not valid', async () => {
            courseId = 'elc2021'

            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.message).toContain('courseId');
        })

        it('should return 400 if student id is not valid', async () => {
            studentId = "123";

            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.message).toContain('invalid student id');
        })



        it('should return grade object if input is valid', async () => {
            const res = await exec();

            const grade = {
                grade: 19,
                score: "FAIL",
                uploadedBy: "osama"
            }
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject(grade);
        })

        it('should return 404 if grade not found', async () => {
            studentId = "7e841850-9881-40be-bb7a-6b70fc537ff9"

            const res = await exec();

            expect(res.status).toBe(404);
            expect(res.body.message).toContain('grade was not found');
        })


    })

})