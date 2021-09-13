const { parseGrades}  = require('../../services/gradesParser')
const path = require("path");


describe('gradesParser', () => {
    it('should fail if duplicate ids found', async () => {
        let filepath =  path.join(__dirname , '../fixtures/duplicateIds.csv')

        return parseGrades(filepath).catch(e => expect(e.message).toContain('Duplicated student id'));
    })

    it('should fail if invalid grades found', async () => {
        let filepath =  path.join(__dirname , '../fixtures/invalidGrade.csv')

        return parseGrades(filepath).catch(e => expect(e.message).toContain('Invalid grade'));
    })

    it('should fail if invalid student id found', async () => {
        let filepath =  path.join(__dirname , '../fixtures/invalidStudentId.csv')

        return parseGrades(filepath).catch(e => expect(e.message).toContain('Invalid student id'));
    })

    it('should fail if file not found', async () => {
        let filepath = '';


        return parseGrades(filepath).catch(e => expect(e.message).toContain('file not found'));
    })

    it('should fail if file format is not csv', async () => {
        let filepath = path.join(__dirname ,  '../fixtures/grades.json');

        await expect(parseGrades(filepath)).rejects.toBeTruthy();
    })

    it('should return map of student ids with grades', async () => {
        let filepath = path.join(__dirname , '../fixtures/validFile.csv');

        const map = await parseGrades(filepath);

        expect(map.get('7a41645a-12d5-4cb7-ac87-7cc25ad4a084')).toBe("100")
        expect(map.get('7a41645a-12d5-4cb7-ac87-7cc25ad4a087')).toBe("40")
    })
})