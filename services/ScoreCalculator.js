exports.calculateScore = (grade) => {
    if (!grade) return '';

    return +grade > 50 ? 'PASS' : 'FAIL';
}