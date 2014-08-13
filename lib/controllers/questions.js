'use strict';

var mongoose = require('mongoose'),
    _ = require('lodash'),
    Patient = mongoose.model('Patient'),
    Scheme = mongoose.model('Scheme'),
    Step = mongoose.model('Step'),
    Question = mongoose.model('Question'),
    Answer = mongoose.model('Answer'),
    passport = require('passport');

exports.createQuestion = function (req, res) {
    Question.count({ Step: req.body.Step }, function (err, count) {
        var new_question = new Question(req.body);
        new_question.SortOrder = count;
        new_question.save(function(err, question) {
            if (!err) {
                return res.json(question);
            } else {
                return res.send(err);
            }
        });
    });
};

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

//Deletes one Question plus options and related answers

exports.deleteQuestion = function (req, res) {
    console.log("deleteQuestion");
    console.log(req.params.question_id);

    Question.findById(req.params.question_id, function (err, question) {
        if (!err) {
            if (question) {
                console.log(question);
                var id = question._id;
                question.remove();

                Answer.find({'Question_id': id}).exec(function (err, answers) {
                    if (!err) {
                        if (answers) {
                            console.log(answers.length);
                            _.forEach(answers, function (answer) {
                                answer.remove();
                            });

                            return res.json({success: true});
                        }
                    } else {
                        return res.send(err);
                    }
                });

                return res.json({success: true});
            } else {
                return res.json({success: true, message: "No question to be deleted!"});
            }
        } else {
            return res.send(err);
        }

    });
};