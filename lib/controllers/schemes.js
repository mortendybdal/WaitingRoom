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

    return Scheme.find({}, function (err, schemes) {
        if (!err) {
            return res.json(schemes);
        } else {
            return res.send(err);
        }
    });
};

/**
 * Get question and answers for scheme
 */

exports.getSchemeWithAnswers = function(req, res) {
    //Find steps for scheme
    console.log("Scheme id", req.params.scheme_id);
    console.log("Patient id", req.params.patient_id);

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