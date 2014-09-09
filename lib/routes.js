'use strict';

var patients = require('./controllers/patients'),
    schemes = require('./controllers/schemes'),
    clinics = require('./controllers/clinics'),
    questions = require('./controllers/questions'),
    answers = require('./controllers/answers'),
    steps = require('./controllers/steps'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    middleware = require('./middleware'),
    auth = require('./config/auth');


/**
 * Application routes
 */
module.exports = function (app) {

    // Server API Routes

    //============Patient Routes==============
    app.get('/api/patients', auth.ensureAuthenticated, patients.getPatients);
    app.post('/api/patients', patients.createPatient);
    app.get('/api/patients/:id', auth.ensureAuthenticated, patients.getPatient);
    app.put('/api/patients', patients.updatePatient);

    //============Scheme Routes==============
    app.get('/api/schemes/:scheme_id', schemes.getSchemes);
    app.put('/api/schemes', schemes.updateSchemes);
    app.post('/api/schemes', schemes.createScheme);
    app.delete('/api/schemes/:scheme_id', schemes.deleteScheme);
    app.get('/api/schemes', schemes.getContentTree);
    app.get('/api/schemes/:scheme_id/patient/:patient_id', auth.ensureAuthenticated, schemes.getSchemeWithAnswers);

    //============Step Routes==============
    app.post('/api/steps', auth.ensureAuthenticated, steps.createStep);
    app.put('/api/steps', auth.ensureAuthenticated, steps.updateSteps);
    app.get('/api/steps/:step_id', auth.ensureAuthenticated, steps.getSteps);
    app.delete('/api/steps/:step_id', auth.ensureAuthenticated, steps.deleteStep);

    //============Question Routes==============
    app.post('/api/questions', questions.createQuestion);
    app.get('/api/questions/:question_id', questions.getQuestions);
    app.put('/api/questions', questions.updateQuestions);
    app.delete('/api/questions/:question_id', questions.deleteQuestion);

    //============Clinic Routes==============
    app.get('/api/clinics', auth.ensureAuthenticated, clinics.getClinics);
    app.get('/api/clinics/:clinic_id', clinics.getClinic);
    app.put('/api/clinics', auth.ensureAuthenticated, clinics.updateClinic);
    app.post('/api/clinics', auth.ensureAuthenticated, clinics.createClinic);
    app.delete('/api/clinics/:clinic_id', auth.ensureAuthenticated, clinics.deleteClinic);
    app.get('/api/clinics/:clinic_id/users', auth.ensureAuthenticated, users.getUsersByClinic);
    app.put('/api/clinics/:clinic_id/users', auth.ensureAuthenticated, users.updateUserByClinic);

    //============Answer Routes==============
    app.post('/api/answers', answers.saveAnswer);


    //============Authentication==============
    app.get('/api/loggedin', function (req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    //============User Routes==============
    app.post('/api/users', auth.ensureAuthenticated, users.create);
    app.delete('/api/users/:user_id', auth.ensureAuthenticated, users.deleteUser);
    app.put('/api/users', auth.ensureAuthenticated, users.changePassword);
    app.get('/api/users/me', auth.ensureAuthenticated, users.me);
    //app.get('/api/users/:id', auth.ensureAuthenticated, users.show);

    app.route('/api/session')
        .post(session.login)
        .delete(session.logout);

    // All undefined api routes should return a 404
    app.route('/api/*')
        .get(function (req, res) {
            res.send(404);
        });

    // All other routes to use Angular routing in app/scripts/app.js
    app.route('/partials/*')
        .get(index.partials);
    app.route('/*')
        .get(middleware.setUserCookie, index.index);
};