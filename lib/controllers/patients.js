'use strict';

var mongoose = require('mongoose'),
    Patient = mongoose.model('Patient'),
    passport = require('passport');

/**
 * Get patient list
 */

exports.getAllPatients = function(req, res) {
    return Patient.find(function (err, patients) {
        if (!err) {
            return res.json(patients);
        } else {
            return res.send(err);
        }
    });
};