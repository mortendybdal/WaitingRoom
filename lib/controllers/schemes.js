'use strict';

var mongoose = require('mongoose'),
    passport = require('passport'),
    Patient = mongoose.model('Patient'),
    Scheme = mongoose.model('Scheme');


exports.getAllSchemes = function(req, res) {

    return Scheme.find({}, function (err, schemes) {
        if (!err) {
            return res.json(schemes);
        } else {
            return res.send(err);
        }
    });
};

