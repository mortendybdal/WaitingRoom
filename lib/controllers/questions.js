'use strict';

var mongoose = require('mongoose'),
    _ = require('lodash'),
    Q = require('q'),
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
        new_question.save(function (err, question) {
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
        Question.findById(req.params.question_id)
            .populate('ParentQuestion')
            .exec(function (err, question) {
                if (!err) {
                    console.log(question);
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
        function (err, question) {
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
    var current_question_id = req.params.question_id;

    var findAndRemove = function (collection, query) {
            var deferred = Q.defer(),
                remove = function (err, result) {
                    var ids = [];

                    if (err) {
                        deferred.resolve(err);
                        return;
                    }

                    ids = result.map(function (s) {
                        return s._id;
                    });

                    collection.remove(query, function (err, res) {
                        if (!err) {
                            deferred.resolve(ids);
                        } else {
                            deferred.reject(err);
                        }
                    });
                };

            collection.find(query, remove);

            return deferred.promise;
        };

    var removeQuestions = function (question_id) {
        return findAndRemove(Question, {'_id': question_id});
    };

    var removeSubQuestions = function (questionIds) {
        return findAndRemove(Question, {'ParentQuestion': { $in: questionIds}});
    };
    var removeAnswers = function (subquestionId) {
        return findAndRemove(Answer, {'Question_id': { $in: subquestionId}});
    };

    removeQuestions(current_question_id)
        .then(function (result) {
            var deferred = Q.defer();
            Q.all([removeSubQuestions(result), removeAnswers(result)]).spread(function (subquestion_id, answer_id) {
                console.log(subquestion_id);
                console.log(answer_id);
                deferred.resolve(subquestion_id);
            }, function () {
                deferred.reject();
            });

            return deferred.promise;
        })
        .then(removeAnswers)
        .then(function () {
            console.log("All nodes should now be deleted");
            return res.send({success: true});
        });
};