const request = require('supertest');
const { generateAuthToken } = require('../../services/TokenService');
const { queue}= require('../../worker/grades-queue');

let server;

describe('/api/status', () => {

    describe('GET /api/status/jobid', () => {
        beforeEach(async () => {
            server = require('../../index');
           
        })

        afterEach(async () => {
            await server.close();
        })


        it('should return 401 if not authenticated', async () => {
            const res = await request(server)
                .get(`/api/status/2`)

            expect(res.status).toBe(401);
        })

        it('should return 422 if job failed', async () => {
            const token = generateAuthToken({username : 'osama'});
            queue.getJob = jest.fn().mockReturnValue({
                getState : async () => {
                    return 'failed'
                }
            });

            const res = await request(server)
                .get(`/api/status/2`)
                .set('x-auth-token', token)

            expect(res.status).toBe(422);
        })

        it('should return error if failedReason is popuated', async () => {
            const token = generateAuthToken({username : 'osama'});
            queue.getJob = jest.fn().mockReturnValue({
                getState : async () => {
                    return 'failed'
                },
                failedReason: 'error'
            });

            const res = await request(server)
                .get(`/api/status/2`)
                .set('x-auth-token', token)

            expect(res.body).toHaveProperty('error');
        })

        it('should return 400 if job not found', async () => {
            const token = generateAuthToken({username : 'osama'});
            queue.getJob = jest.fn().mockReturnValue(undefined);

            const res = await request(server)
                .get(`/api/status/2`)
                .set('x-auth-token', token)

            expect(res.status).toBe(404);
            expect(res.body.message).toContain('job not found');
        })

    })
})