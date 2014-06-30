'use strict';

var mongoose = require('mongoose'),
    _ = require('lodash'),
    Patient = mongoose.model('Patient'),
    Scheme = mongoose.model('Scheme'),
    Step = mongoose.model('Step'),
    Question = mongoose.model('Question'),
    passport = require('passport');

/**
 * Get patient list
 */

exports.getAllPatients = function(req, res) {

    return Patient.find({}, function (err, patients) {
        if (!err) {
            return res.json(patients);
        } else {
            return res.send(err);
        }
    });
};

/**
 * Create patient
 */

exports.createPatientAndScheme = function(req, res) {

    Scheme.findById(req.body.scheme_id, function (err, scheme) {
        Step.findOne({Scheme_id: scheme._id, Title: 'Subjective'}, function (err, step) {
            Question.find({Step_id: step._id}).sort({ SortOrder: 'asc'}).exec(function (err, question) {
                var data = {};

                //Create Patient - TODO: Check to see if patient exist
                var newPatient = new Patient();
                newPatient.Schemes.push(scheme);
                newPatient.save(function(err) {
                    if (!err) {
                        data.questions = question;
                        data.patient = newPatient;

                        return res.json(data);
                    } else {
                        return res.send(err);
                    }
                });
            });
        });
    });
};

exports.savePatientsAnswer = function(req, res) {
    console.log("SAVE FIRST STEP");
};