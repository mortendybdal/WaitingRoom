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
 * Get patient list
 */

exports.getQuestionsForScheme = function(req, res) {
    //Find steps for scheme
    console.log("Patient id", req.body.patient_id);
    console.log("Scheme id", req.body.scheme_id);

    Step.find({Scheme_id: req.body.scheme_id}, function (err, steps) {
        var step_ids = _.pluck(steps, '_id');

        //Find questions for stes
        Question.find({
            'Step': { $in: step_ids}
        }).populate('Step')
            .exec(function (err, questions) {
                if (!err) {
                    var question_ids = _.pluck(questions, '_id');
                    Answer.find({'Question_id': {$in: question_ids}, 'Patient_id': req.body.patient_id}, function (err, answers) {
                        var questions_with_answers = _.forEach(questions, function (question) {
                            var answer = _.find(answers, {Question_id: question._id});

                            if(answer) {
                                console.log(answer.AnswerText);
                                question.Answer = answer.AnswerText;
                            }
                        });

                        console.log(questions);

                        return res.json(questions_with_answers);
                    });
                } else {
                    return res.send(err);
                }
            });
    });
};