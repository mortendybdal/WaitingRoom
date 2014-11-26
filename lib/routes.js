'use strict';

var patients = require('./controllers/patients'),
    schemes = require('./controllers/schemes'),
    clinics = require('./controllers/clinics'),
    questions = require('./controllers/questions'),
    answers = require('./controllers/answers'),
    steps = require('./controllers/steps'),
    tablets = require('./controllers/tablets'),
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
    app.get('/api/patients', auth.ensureAuthenticated(['User','Editor','Admin']), patients.getPatients);
    app.post('/api/patients', auth.ensureAuthenticated(['Tablet']), patients.createPatient);
    app.post('/api/patients/:patient_id/:status', auth.ensureAuthenticated(['User', 'Editor', 'Admin', 'Tablet']), patients.setPatientStatus);
    app.get('/api/patients/:id', auth.ensureAuthenticated(['User','Editor','Admin']), patients.getPatient);
    app.put('/api/patients', auth.ensureAuthenticated(['Tablet']), patients.updatePatient);
    app.get('/api/patients/:patient_id/scheme/:scheme_number', auth.ensureAuthenticated(['User','Editor','Admin']), patients.getPatientWithScheme);
    app.delete('/api/patients/:patient_id', auth.ensureAuthenticated(['Tablet']), patients.submitOrDeletePatient);

    //============Scheme Routes==============
    app.get('/api/schemes/:scheme_id', schemes.getSchemes);
    app.put('/api/schemes', auth.ensureAuthenticated(['Editor','Admin']),  schemes.updateSchemes);
    app.post('/api/schemes', auth.ensureAuthenticated(['Editor','Admin']), schemes.createScheme);
    app.delete('/api/schemes/:scheme_id', auth.ensureAuthenticated(['Editor','Admin']), schemes.deleteScheme);
    app.get('/api/schemes', auth.ensureAuthenticated(['Editor', 'Admin']), schemes.getContentTree);

    //============Step Routes==============
    app.post('/api/steps', auth.ensureAuthenticated(['Editor','Admin']), steps.createStep);
    app.put('/api/steps', auth.ensureAuthenticated(['Editor','Admin']), steps.updateSteps);
    app.get('/api/steps/:step_id', auth.ensureAuthenticated(['Editor','Admin']), steps.getSteps);
    app.delete('/api/steps/:step_id', auth.ensureAuthenticated(['Editor','Admin']), steps.deleteStep);

    //============Question Routes==============
    app.post('/api/questions', auth.ensureAuthenticated(['Editor','Admin']), questions.createQuestion);
    app.get('/api/questions/:question_id', auth.ensureAuthenticated(['Editor','Admin']), questions.getQuestions);
    app.put('/api/questions', auth.ensureAuthenticated(['Editor','Admin']), questions.updateQuestions);
    app.delete('/api/questions/:question_id', auth.ensureAuthenticated(['Editor','Admin']), questions.deleteQuestion);

    //============Clinic Routes==============
    app.get('/api/clinics', auth.ensureAuthenticated(['Admin']), clinics.getClinics);
    app.get('/api/clinics/:clinic_id', auth.ensureAuthenticated(['Admin']), clinics.getClinic);
    app.put('/api/clinics', auth.ensureAuthenticated(['Admin']), clinics.updateClinic);
    app.post('/api/clinics', auth.ensureAuthenticated(['Admin']), clinics.createClinic);
    app.delete('/api/clinics/:clinic_id', auth.ensureAuthenticated(['Admin']), clinics.deleteClinic);

    //============Answer Routes==============
    app.post('/api/answers', auth.ensureAuthenticated(['Tablet']), answers.createAnswer);
    app.put('/api/answers', answers.updateAnswer);

    //============Tablet Routes==============
    app.get('/api/tablets', auth.ensureAuthenticated(['Tablet']), tablets.getTabletData);


    //============Authentication==============
    app.get('/api/loggedin', function (req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    //============User Routes==============
    app.post('/api/users', auth.ensureAuthenticated(['Admin']), users.create);
    app.delete('/api/users/:user_id', auth.ensureAuthenticated(['Admin']), users.deleteUser);
    app.put('/api/users', auth.ensureAuthenticated(['Admin']), users.updateUser);
    app.get('/api/users/me', auth.ensureAuthenticated(), users.me);
    app.get('/api/users', auth.ensureAuthenticated(['Admin']), users.getUsers);

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