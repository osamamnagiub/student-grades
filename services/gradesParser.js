const fs = require('fs')
const csv = require('fast-csv')
const uuid = require('uuid')

// read and validate the csv file, if any invalid data is supplied (examples: invalid
// csv format, duplicated student ids, grades not between 0 and 100)
exports.parseGrades = async (filepath) => {

    // create the read stream, read file in chunks
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(filepath)) {
            reject(new Error('file not found'));
            return;
        }

        let errors = [];
        let rowNumber = 1; // the header is considered a row
        let rowsMap = new Map();
        csv.parseFile(filepath, { headers: true, trim: true, ignoreEmpty: true })
            .on("data", function (data) {
                rowNumber++;
                let { id, grade } = data // row

                if (!uuid.validate(id))
                    errors.push(`Invalid student id at line ${rowNumber}`);

                if (rowsMap.has(id))
                    errors.push(`Duplicated student id at line ${rowNumber}`);

                // validate that grade is within allowed range
                if (grade < 0 || grade > 100) {
                    errors.push("Invalid grade at line " + rowNumber);
                }

                rowsMap.set(id, grade);
            }).on('end', () => {
            if (errors.length > 0)
                reject(new Error(errors));
            else
                resolve(rowsMap);

        }).on('error', (err) => {
            reject(new Error(err));
        })
    });
}
