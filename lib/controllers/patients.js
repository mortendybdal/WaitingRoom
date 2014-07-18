'use strict';

var mongoose = require('mongoose'),
    _ = require('lodash'),
    Patient = mongoose.model('Patient'),
    Scheme = mongoose.model('Scheme'),
    Step = mongoose.model('Step'),
    Question = mongoose.model('Question'),
    Answer = mongoose.model('Question'),
    passport = require('passport');



/**
 * Get patient list
 */
exports.getPatients = function(req, res) {

    console.log("Auth", req.isAuthenticated());

    Patient.find({})
        .populate('Schemes')
        .exec(function (err, patients) {
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

exports.createPatient = function(req, res) {
    //Create Patient - TODO: Check to see if patient exist
    var new_patient = new Patient();
    new_patient.save(function(err, patient) {
        if (!err) {
            return res.json(patient);
        } else {
            return res.send(err);
        }
    });
};

/**
 * Get patient
 */

exports.getPatient = function(req, res) {
    Patient.findById(req.params.id)
        .populate('Schemes')
        .exec(function (err, patient) {
            if (!err) {
                return res.json(patient);
            } else {
                return res.send(err);
            }
        });
};

/**
 * Find all subjective questions from scheme and append scheme to patient
 */

exports.appendSchemeToPatient = function(req, res) {

    Scheme.findById(req.params.scheme_id, function (err, scheme) {
        Step.findOne({Scheme_id: scheme._id, Title: 'Subjective'}, function (err, step) {
            console.log(step);
            Question.find({Step: step._id}).sort({ SortOrder: 'asc'}).exec(function (err, question) {

                Patient.findOneAndUpdate(
                    req.params.patient_id,
                    {$push: {Schemes: req.params.scheme_id}},
                    {upsert: true},
                    function(err, model) {
                        if (!err) {
                            return res.json(question);
                        } else {
                            return res.send(err);
                        }
                    }
                );
            });
        });
    });
};