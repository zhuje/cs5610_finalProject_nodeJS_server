// const quizzes = require('./quizzes')

const quizzesDao = require('../daos/quizzes.dao.server')

findAllQuizzes = () => quizzesDao.findAllQuizzes()
findQuizById = (quizId) => quizzesDao.findQuizById(quizId)

module.exports = {
    findAllQuizzes,
    findQuizById
}
