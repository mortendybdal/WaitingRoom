'use strict';

var mongoose = require('mongoose'),
    _ = require('lodash'),
    Answer = mongoose.model('Answer'),
    passport = require('passport');

/**
 * Save Answer
 */

exports.createAnswer = function(req, res) {
    console.log(req.body);
    Answer.create(req.body, function (err, answer) {
        if (!err) {
            return res.json(answer);
        } else {
            return res.send(err);
        }
    });
};

exports.updateAnswer = function(req, res) {
    console.log(req.query);
    var answer = new Answer(req.query);
    var upsertData = answer.toObject();
    delete upsertData._id;

    Answer.findOneAndUpdate(
        {
            Patient_id: req.query.Patient_id,
            Question_id: req.query.Question_id
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