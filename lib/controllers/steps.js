'use strict';

var mongoose = require('mongoose'),
    _ = require('lodash'),
    Patient = mongoose.model('Patient'),
    Scheme = mongoose.model('Scheme'),
    Step = mongoose.model('Step'),
    Question = mongoose.model('Question'),
    Answer = mongoose.model('Answer'),
    passport = require('passport');

/**
 * Save Answer
 */

exports.createStep = function(req, res) {
    //Create Patient

    Step.count({ Scheme_id: req.body.Scheme_id }, function (err, count) {
        var new_step = new Step(req.body);
        new_step.SortOrder = count;
        new_step.save(function(err, step) {
            if (!err) {
                return res.json(step);
            } else {
                return res.send(err);
            }
        });
    });

};

exports.getSteps = function (req, res) {
    if (req.params.step_id) {
        Step.findById(req.params.step_id, function (err, step) {
            if (!err) {
                return res.json(step);
            } else {
                return res.send(err);
            }
        });
    } else {
        return res.json(null);
    }
};

exports.updateSteps = function (req, res) {
    var step = new Step(req.body);
    var upsertData = step.toObject();
    delete upsertData._id;

    Step.findOneAndUpdate(
        {"_id": req.body._id},
        upsertData,
        {
            upsert: true
        }, function (err, step) {
            if (!err) {
                return res.json(step);
            } else {
                return res.send(err);
            }
        }
    );
};

//Deletes one Step plus questions

exports.deleteStep = function (req, res) {
    console.log("deleteStep");
    console.log(req.params.step_id);

    Step.findById(req.params.step_id, function (err, step) {
        if (!err) {
            if (step) {
                var id = step._id;
                step.remove();

                Question.find({'Step': id}).exec(function (err, questions) {
                    if (!err) {
                        if (questions) {
                            var question_ids = _.pluck(questions, '_id');

                            _.forEach(questions, function (question) {
                                question.remove();
                            });

                            Question.find({'ParentQuestion': { $in: question_ids}}).exec(function (err, questions) {
                                if (!err) {
                                    if (questions) {
                                        var subquestion_ids = _.pluck(questions, '_id');

                                        _.forEach(questions, function (question) {
                                            question.remove();
                                        });

                                        Answer.find({'Question_id': { $in: subquestion_ids}}).exec(function (err, answers) {
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
                                    }
                                } else {
                                    return res.send(err);
                                }
                            });

                            Answer.find({'Question_id': { $in: question_ids}}).exec(function (err, answers) {
                                if (!err) {
                                    if (answers) {
                                        _.forEach(answers, function (answer) {
                                            answer.remove();
                                        });
                                    }
                                } else {
                                    return res.send(err);
                                }
                            });

                        } else {
                            return res.json({success: true});
                        }
                    } else {
                        return res.send(err);
                    }

                });
            } else {
                return res.json({success: true, message: "No steps to be deleted"});
            }
        } else {
            return res.send(err);
        }
    });
};