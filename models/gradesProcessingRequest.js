class GradesProcessingRequest {
    constructor(teacherName, courseId, email, filepath){
        this.teacherName = teacherName;
        this.uploadDate = Date.now;
        this.courseId = courseId;
        this.filepath = filepath;
        this.gradesUrl = `/api/courses/${courseId}/grades` 
        this.email = email;
    }
}

module.exports = GradesProcessingRequest;

