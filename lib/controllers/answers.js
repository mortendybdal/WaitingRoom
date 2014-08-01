'use strict';

var mongoose = require('mongoose'),
    _ = require('lodash'),
    Answer = mongoose.model('Answer'),
    passport = require('passport');

/**
 * Save Answer
 */

exports.saveAnswer = function(req, res) {
    console.log(req.body);
    var answer = new Answer(req.body);
    var upsertData = answer.toObject();
    delete upsertData._id;

    Answer.findOneAndUpdate(
        {
            Patient_id: req.body.Patient_id,
            Question_id: req.body.Question_id
        },
        upsertData,
        {
            upsert: true
        }, function (err, answer) {
            if (!err) {
                return res.json(answer);
            } else {
                return res.send(err);
            }
        }
    );
};