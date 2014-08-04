'use strict';

var mongoose = require('mongoose'),
    _ = require('lodash'),
    Patient = mongoose.model('Patient'),
    Scheme = mongoose.model('Scheme'),
    Step = mongoose.model('Step'),
    Question = mongoose.model('Question'),
    Answer = mongoose.model('Answer'),
    passport = require('passport');

exports.getSchemes = function(req, res) {

    console.log("Got in here!!");
    if(req.params.scheme_id) {
        Scheme.findById(req.params.scheme_id, function (err, schemes) {
            if(!err) {
                return res.json(schemes);
            }else {
                return res.send(err);
            }
        });
    }else {
        return res.json(null);
    }
};

exports.updateSchemes = function(req, res) {
    console.log(req.body)

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

exports.createScheme = function(req, res) {
    //Create Patient
    var new_scheme = new Scheme(req.body);
    new_scheme.save(function(err, scheme) {
        if (!err) {
            return res.json(scheme);
        } else {
            return res.send(err);
        }
    });
};

exports.getContentTree = function(req, res) {

    var  scheme_response = [];
    Scheme.find({}).lean().exec(function(err, schemes) {
        if(!err){
            scheme_response = schemes;
            var scheme_ids = _.pluck(schemes, '_id');

            Step.find({'Scheme_id': { $in: scheme_ids}}).lean().exec(function (err, steps) {
                if(!err) {

                    _.forEach(scheme_response, function(scheme) {
                        scheme.steps = _.sortBy(_.filter(steps, { 'Scheme_id': scheme._id }), 'SortOrder');

                    });


                    var step_ids = _.pluck(steps, '_id');

                    //Find questions for step
                    Question.find({'Step': { $in: step_ids}}).lean().exec(function (err, questions) {
                        _.forEach(scheme_response, function(scheme) {
                            _.forEach(scheme.steps, function(step) {
                                step.questions = _.sortBy(_.filter(questions, { 'Step': step._id }), 'SortOrder');

                            });
                        });

                        return res.json(scheme_response);

                    });
                }else {
                    return res.send(err);
                }
            });

        }else {
            return res.send(err);
        }

    });
};
/**
 * Get question and answers for scheme
 */

exports.getSchemeWithAnswers = function(req, res) {
    //Find steps for scheme

    if(!req.params.scheme_id) {
        return res.send(null);
    }

    if(!req.params.patient_id) {
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

                            if(answer) {
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

