const { StudentGrade } = require("../models/studentGrade");
const scoreCalculator = require("./ScoreCalculator")


// Calculate the student course score Pass/Fail from his grade and store them in
// the database with the teacher’s name.
// params:
//      course id
//      teacherName
//      dataMap : map of [studentid, grade]
//      reportProgress: function to call to report progress
exports.processGrades = async (courseId, teacherName, dataMap, reportProgress) => {
    if (!dataMap) throw new Error('no data to process');

    let size = dataMap.size;

    let index = 0;
    for (const [id, grade] of dataMap.entries()) {

        // calculate score
        let score = scoreCalculator.calculateScore(grade);

        // save to db
        await StudentGrade.findOneAndUpdate({ studentId: id },
            {
                grade: grade,
                score: score,
                courseId: courseId,
                teacherName: teacherName

            }, { upsert: true, writeConcern: false });


        // report progress
        if (reportProgress)
            await reportProgress(Math.ceil(((index + 1) / size) * 100));

        index++;
    }

}
