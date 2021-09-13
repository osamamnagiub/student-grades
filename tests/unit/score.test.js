const { calculateScore}  = require('../../services/ScoreCalculator')


describe('scoreCalculator', () => {
    it('should return FAIL if grade is less than 50', async () => {

        const score = calculateScore(40)

        expect(score).toBe("FAIL");
    })

    it('should return PASS if grade is bigger than 50', async () => {

        const score = calculateScore(60)

        expect(score).toBe("PASS");
    })

    it('should return empty if grade is empty', async () => {
        const score = calculateScore()

        expect(score).toBeFalsy()
    })
})