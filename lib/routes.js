'use strict';

var patients = require('./controllers/patients'),
    schemes = require('./controllers/schemes'),
    questions = require('./controllers/questions'),
    answers = require('./controllers/answers'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    middleware = require('./middleware');


var auth = function(req, res, next){
    if (!req.isAuthenticated())
        res.send(401);
    else
        next();
};

/**
 * Application routes
 */
module.exports = function(app) {

    // Server API Routes

    //============Patient Routes==============
    app.route('/api/patients', auth)
        .get(patients.getPatients)
        .post(patients.createPatient);

    app.route('/api/patients/:id', auth)
        .get(patients.getPatient, auth);
    app.route('/api/patients/:patient_id/schemes/:scheme_id')
        .get(patients.appendSchemeToPatient );

    //============Answer Routes==============
    app.route('/api/answers', auth)
        .post(answers.saveAnswer);


    //============Scheme Routes==============
    app.route('/api/schemes', auth)
        .get(schemes.getSchemes);
    app.route('/api/schemes/:scheme_id/patient/:patient_id', auth)
        .get(schemes.getSchemeWithAnswers);


    //============Authentication==============
    app.get('/api/loggedin', function(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });


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