const bcrypt = require('bcrypt')


exports.validatePassword = async (requestPassword, storedPassword) =>{
    return bcrypt.compare(requestPassword, storedPassword)
}

exports.generatePasswordHash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}