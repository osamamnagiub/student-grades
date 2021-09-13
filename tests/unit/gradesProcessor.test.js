const {processGrades} = require("../../services/gradesProcessor");


describe('scoreCalculator', () => {
    it('should fail if no data is provided', async () => {
        return processGrades('ELC2021', 'osama', undefined, undefined)
            .catch(e => expect(e.message).toContain('no data'));

    })
})