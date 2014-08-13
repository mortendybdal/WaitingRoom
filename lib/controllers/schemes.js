'use strict';

var mongoose = require('mongoose'),
    _ = require('lodash'),
    Patient = mongoose.model('Patient'),
    Scheme = mongoose.model('Scheme'),
    Step = mongoose.model('Step'),
    Question = mongoose.model('Question'),
    Answer = mongoose.model('Answer'),
    passport = require('passport');



exports.createScheme = function (req, res) {
    Scheme.count({}, function (err, count) {
        var new_scheme = new Scheme(req.body);
        new_scheme.SortOrder = count;
        new_scheme.save(function(err, scheme) {
            if (!err) {
                return res.json(scheme);
            } else {
                return res.send(err);
            }
        });
    });
};


exports.updateSchemes = function (req, res) {
    var scheme = new Scheme(req.body);
    var upsertData = scheme.toObject();
    delete upsertData._id;

    Scheme.findOneAndUpdate(
        {"_id": req.body._id},
        upsertData,
        {
            upsert: true
        }, function (err, scheme) {
            if (!err) {
                return res.json(scheme);
            } else {
                return res.send(err);
            }
        }
    );
};

exports.getSchemes = function (req, res) {
    if (req.params.scheme_id) {
        Scheme.findById(req.params.scheme_id, function (err, schemes) {
            if (!err) {
                return res.json(schemes);
            } else {
                return res.send(err);
            }
        });
    } else {
        return res.json(null);
    }
};


//Deletes on scheme plus stepes and questions

exports.deleteScheme = function (req, res) {
    console.log("deleteScheme");
    console.log(req.params.scheme_id);

    Scheme.findById(req.params.scheme_id, function (err, scheme) {
        if (!err) {
            console.log(scheme);

            Step.find({'Scheme_id': scheme._id}).exec(function (err, steps) {
                if (!err) {
                    if (steps) {
                        console.log(steps.length);
                        var step_ids = _.pluck(steps, '_id');

                        _.forEach(steps, function (step) {
                            step.remove();
                        });
                        Question.find({'Step': { $in: step_ids}}).exec(function (err, questions) {
                            if (!err) {
                                if (questions) {
                                    var question_ids = _.pluck(questions, '_id');

                                    _.forEach(questions, function (question) {
                                        question.remove();
                                    });

                                    Answer.find({'Question_id': { $in: question_ids}}).exec(function (err, answers) {
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
                                    return res.json({success: true});
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

            Patient.find({}, function (err, patients) {
                if (!err) {
                    _.forEach(patients, function (patient) {
                        patient.Schemes.pull(scheme._id);
                        patient.save();

                        console.log(_.size(patient.Schemes));

                        if(_.size(patient.Schemes) === 0) {
                            patient.remove();
                        }
                    });
                } else {
                    return res.send(err);
                }
            });

            scheme.remove();
        } else {
            return res.send(err);
        }
    });
};

exports.getContentTree = function (req, res) {

    var scheme_response = [];
    Scheme.find({}).lean().exec(function (err, schemes) {
        if (!err) {
            scheme_response = _.sortBy(schemes, 'SortOrder');
            var scheme_ids = _.pluck(schemes, '_id');

            Step.find({'Scheme_id': { $in: scheme_ids}}).lean().exec(function (err, steps) {
                if (!err) {

                    _.forEach(scheme_response, function (scheme) {
                        scheme.steps = _.sortBy(_.filter(steps, { 'Scheme_id': scheme._id }), 'SortOrder');

                    });


                    var step_ids = _.pluck(steps, '_id');

                    //Find questions for step
                    Question.find({'Step': { $in: step_ids}}).lean().exec(function (err, questions) {
                        _.forEach(scheme_response, function (scheme) {
                            _.forEach(scheme.steps, function (step) {
                                step.questions = _.sortBy(_.filter(questions, { 'Step': step._id }), 'SortOrder');

                            });
                        });

                        return res.json(scheme_response);

                    });
                } else {
                    return res.send(err);
                }
            });

        } else {
            return res.send(err);
        }

    });
};
/**
 * Get question and answers for scheme
 */

exports.getSchemeWithAnswers = function (req, res) {
    //Find steps for scheme

    if (!req.params.scheme_id) {
        return res.send(null);
    }

    if (!req.params.patient_id) {
        return res.send(null);
    }

    Step.find({Scheme_id: req.params.scheme_id}, function (err, steps) {
        var step_ids = _.pluck(steps, '_id');

        //Find questions for step
        Question.find({
            'Step': { $in: step_ids}
        }).populate('Step')
            .exec(function (err, questions) {
                if (!err) {
                    var question_ids = _.pluck(questions, '_id');

                    //Append answer
                    Answer.find({'Question_id': {$in: question_ids}, 'Patient_id': req.params.patient_id}, function (err, answers) {
                        var questions_with_answers = _.forEach(questions, function (question) {
                            var answer = _.find(answers, {Question_id: question._id});

                            if (answer) {
                                question.Answer = answer.AnswerText;
                            }
                        });

                        return res.json(questions_with_answers);
                    });
                } else {
                    return res.send(err);
                }
            });
    });
};

