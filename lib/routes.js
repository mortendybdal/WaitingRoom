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
    console.log(req.isAuthenticated());

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
    app.get('/api/patients', auth, patients.getPatients);
    app.post('/api/patients', patients.createPatient);
    app.get('/api/patients/:id', auth, patients.getPatient);
    app.put('/api/patients', patients.updatePatient);

    //============Answer Routes==============
    app.post('/api/answers', answers.saveAnswer);


    //============Scheme Routes==============
    app.get('/api/schemes', schemes.getSchemes);
    app.get('/api/schemes/:scheme_id/patient/:patient_id', auth, schemes.getSchemeWithAnswers);


    //============Authentication==============
    app.get('/api/loggedin', function(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });


  app.post('/api/users', auth, users.create);
  app.put('/api/users', auth, users.changePassword);
  app.get('/api/users/me', auth, users.me);
  app.get('/api/users/:id', auth, users.show);

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