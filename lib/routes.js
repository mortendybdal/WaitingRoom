'use strict';

var patients = require('./controllers/patients'),
    schemes = require('./controllers/schemes'),
    questions = require('./controllers/questions'),
    answers = require('./controllers/answers'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

    // Server API Routes

    //============Patient Routes==============
    app.route('/api/patients/all')
        .get(patients.getAllPatients);

    app.route('/api/patients/create')
        .post(patients.createPatient);

    app.route('/api/patients/appendscheme')
        .post(patients.appendSchemeToPatient );

    app.route('/api/patients/get/:id')
        .get(patients.getPatient );

    //============Question Routes==============
    app.route('/api/questions/all')
        .post(questions.getQuestionsForScheme);

    //============Answer Routes==============
    app.route('/api/answers/save')
        .post(answers.saveAnswer);


    //============Scheme Routes==============
    app.route('/api/schemes/all')
        .get(schemes.getAllSchemes);





  app.route('/api/users')
    .post(users.create)
    .put(users.changePassword);
  app.route('/api/users/me')
    .get(users.me);
  app.route('/api/users/:id')
    .get(users.show);

  app.route('/api/session')
    .post(session.login)
    .delete(session.logout);

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get( middleware.setUserCookie, index.index);
};