'use strict';

var mongoose = require('mongoose'),
    passport = require('passport'),
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