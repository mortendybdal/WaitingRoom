'use strict';

var mongoose = require('mongoose'),
    _ = require('lodash'),
    Step = mongoose.model('Step'),
    passport = require('passport');

/**
 * Save Answer
 */

exports.createStep = function(req, res) {
    //Create Patient
    var new_step = new Step(req.body);
    new_step.save(function(err, step) {
        if (!err) {
            return res.json(step);
        } else {
            return res.send(err);
        }
    });
};