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
exports.getPatients = function (req, res) {
    Patient.find({Doctor: req.user._id})
        .populate('Schemes')
        .exec(function (err, patients) {
            if (!err) {
                console.log(patients);
                return res.json(patients);
            } else {
                return res.send(err);
            }
        });
};

/**
 * Create patient
 */

exports.createPatient = function (req, res) {
    //Create Patient
    console.log(req.body);
    var new_patient = new Patient();
    new_patient.Doctor = req.body.Doctor;
    new_patient.save(function (err, patient) {
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

exports.getPatient = function (req, res) {
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

exports.updatePatient = function (req, res) {
    var patient = new Patient(req.body);
    var upsertData = patient.toObject();
    delete upsertData._id;

    Patient.findOneAndUpdate(
        {"_id": req.body._id},
        upsertData,
        function (err, patient) {
            if (!err) {
                return res.json(patient);
            } else {
                return res.send(err);
            }
        }
    );
};