'use strict';

var mongoose = require('mongoose'),
    Patient = mongoose.model('Patient'),
    passport = require('passport');

/**
 * Get patient list
 */

exports.getAllPatients = function(req, res) {

    return Patient.find({}).populate('Schemes').exec(function(err, patients){
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
    var newPatient = new Patient(req.body);
    newPatient.save(function(err) {
        if (!err) {
            return res.json({succes: true});
        } else {
            return res.send(err);
        }
    });
};