const quizzesService = require('../services/quizzes.service.server')

module.exports = function (app) {
    app.get('/api/quizzes/:qid', (req, res) =>
        res.json(quizzesService
            .findQuizById(req.params['qid']))
    )
    app.get('/api/quizzes', (req, res) =>
        res.send(quizzesService
            .findAllQuizzes()))
}
