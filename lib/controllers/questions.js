'use strict';

var mongoose = require('mongoose'),
    _ = require('lodash'),
    Patient = mongoose.model('Patient'),
    Scheme = mongoose.model('Scheme'),
    Step = mongoose.model('Step'),
    Question = mongoose.model('Question'),
    Answer = mongoose.model('Answer'),
    passport = require('passport');


exports.getQuestions = function (req, res) {
    if (req.params.question_id) {
        Question.findById(req.params.question_id, function (err, question) {
            if (!err) {
                return res.json(question);
            } else {
                return res.send(err);
            }
        });
    } else {
        return res.json(null);
    }
};

exports.updateQuestions = function (req, res) {
    var question = new Question(req.body);
    var upsertData = question.toObject();
    delete upsertData._id;

    Question.findOneAndUpdate(
        {"_id": req.body._id},
        upsertData,
        {
            upsert: true
        }, function (err, question) {
            if (!err) {
                return res.json(question);
            } else {
                return res.send(err);
            }
        }
    );
};