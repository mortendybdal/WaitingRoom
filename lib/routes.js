'use strict';

var patients = require('./controllers/patients'),
    schemes = require('./controllers/schemes'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

    // Server API Routes
    app.route('/api/patients/all')
        .get(patients.getAllPatients);

    app.route('/api/patients/create')
        .post(patients.createPatientAndScheme);

    app.route('/api/patients/answer')
        .post(patients.savePatientsAnswer);

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