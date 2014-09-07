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


exports.createScheme = function (req, res) {
    Scheme.count({}, function (err, count) {
        var new_scheme = new Scheme(req.body);
        new_scheme.SortOrder = count;
        new_scheme.save(function (err, scheme) {
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
        function (err, scheme) {
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


exports.getContentTree = function (req, res) {


    var response = [],
        generateFindFunction = function (collection, queryKey, sorter) {
            return function (data) {
                var deferred = Q.defer(),
                    orderAndPopulate = function (err, result) {
                        if (!err) {
                            if (typeof sorter === 'function') {
                                sorter(data, result);
                            }

                            var ids = _.pluck(result, '_id');
                            deferred.resolve({response: response, ids: ids});
                        } else {
                            deferred.reject(err);
                        }
                    };

                var query = {};
                query[queryKey] = { $in: data.ids};
                collection.find(query).lean().exec(orderAndPopulate);

                return deferred.promise;
            };
        },
        findScheme = function () {
            var deferred = Q.defer(),
                orderAndPopulate = function (err, result) {
                    if (!err) {
                        response = _.sortBy(result, 'SortOrder');
                        var ids = _.pluck(result, '_id');
                        deferred.resolve({response: response, ids: ids});
                    } else {
                        deferred.reject(err);
                    }
                };

            Scheme.find({}).lean().exec(orderAndPopulate);

            return deferred.promise;
        },
        findSteps = generateFindFunction(Step, 'Scheme_id', function (data, result) {
            _.forEach(data.response, function (r) {
                r.steps = _.sortBy(_.filter(result, { 'Scheme_id': r._id }), 'SortOrder');

            });
        }),
        findQuestions = generateFindFunction(Question, 'Step', function (data, result) {
            _.forEach(data.response, function (r) {
                _.forEach(r.steps, function (s) {
                    s.questions = _.sortBy(_.filter(result, { 'Step': s._id }), 'SortOrder');
                });
            });
        }),
        findSubquestions = generateFindFunction(Question, 'ParentQuestion', function (data, result) {
            _.forEach(data.response, function (r) {
                _.forEach(r.steps, function (s) {
                    _.forEach(s.questions, function (q) {
                        q.questions = _.sortBy(_.filter(result, { 'ParentQuestion': q._id }), 'SortOrder');
                    });
                });
            });
        });

    findScheme()
        .then(findSteps)
        .then(findQuestions)
        .then(findSubquestions)
        .then(function (data) {
            return res.json(data.response);
        }, function (err) {
            return res.send(err);
        });
}
;
/**
 * Get question and answers for scheme
 */

exports.getSchemeWithAnswers = function (req, res) {
    //Find steps for scheme

    if (!req.params.scheme_id || !req.params.patient_id) {
        return res.send(null);
    }

    var findStepsById = function (scheme_id) {
            var deferred = Q.defer();
            Step.find({Scheme_id: scheme_id}, function (err, steps) {
                if (!err) {
                    var step_ids = _.pluck(steps, '_id');
                    deferred.resolve(step_ids);
                } else {
                    deferred.reject(err);
                }
            });

            return deferred.promise;
        },
        findQuestions = function (step_ids) {
            var deferred = Q.defer();
            Question.find({
                'Step': { $in: step_ids}
            }).populate('Step')
                .lean()
                .exec(function (err, questions) {
                    if (!err) {
                        deferred.resolve(questions);
                    } else {
                        deferred.reject(err);
                    }
                });

            return deferred.promise;
        },
        findAnswers = function (questions) {
            var deferred = Q.defer(),
                question_ids = _.pluck(questions, '_id');


            Answer.find({'Question_id': {$in: question_ids}, 'Patient_id': req.params.patient_id}, function (err, answers) {
                if (!err) {
                    var questions_response = _.forEach(questions, function (question) {
                        var answer = _.find(answers, {Question_id: question._id});

                        if (answer) {
                            question.Answer = answer.AnswerText;
                        }
                    });

                    deferred.resolve(questions_response);
                } else {
                    deferred.reject(err);
                }
            });

            return deferred.promise;
        },
        findSubquestions = function (questions) {
            var deferred = Q.defer(),
                question_ids = _.pluck(questions, '_id');
            Question.find({'ParentQuestion': { $in: question_ids}})
                .populate('ParentQuestion')
                .lean()
                .exec(function (err, subquestions) {
                    if (!err) {
                        _.forEach(questions, function (q) {
                            q.questions = [];
                            _.forEach(subquestions, function (sq) {
                                if(q._id.equals(sq.ParentQuestion._id)) {
                                    q.questions.push(sq);
                                }
                            });
                        });
                        deferred.resolve({response: questions, subquestions: subquestions});
                    } else {
                        deferred.reject(err);
                    }
                });


            return deferred.promise;
        },
        findSubanswers = function (data) {
            var deferred = Q.defer(),
                subquestion_ids = _.pluck(data.subquestions, '_id');

            Answer.find({'Question_id': {$in: subquestion_ids}, 'Patient_id': req.params.patient_id}, function (err, answers) {
                if (!err) {
                    var response = _.forEach(data.response, function (question) {
                        _.forEach(question.questions, function (subquestion) {
                            var answer = _.find(answers, {Question_id: subquestion._id});

                            if (answer) {
                                subquestion.Answer = answer.AnswerText;
                            }
                        });
                    });

                    deferred.resolve(response);
                } else {
                    deferred.reject(err);
                }
            });

            return deferred.promise;
        };

    findStepsById(req.params.scheme_id)
        .then(findQuestions)
        .then(findAnswers)
        .then(findSubquestions)
        .then(findSubanswers)
        .then(function (response) {
            return res.json(response);
        });
};

//Deletes on scheme plus stepes and questions
exports.deleteScheme = function (req, res) {
    var current_scheme_id = req.params.scheme_id;

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
        },
        deletePatient = function (scheme_ids) {
            var deferred = Q.defer();

            Patient.find({}, function (err, patients) {
                if (!err) {
                    var ids = patients.map(function (p) {
                        return p._id;
                    });
                    _.forEach(scheme_ids, function (scheme_id) {
                        _.forEach(patients, function (patient) {
                            patient.Schemes.pull(scheme_id);
                            patient.save();

                            if (_.size(patient.Schemes) === 0) {
                                patient.remove();
                            }
                        });
                    });

                    deferred.resolve(ids);
                } else {
                    deferred.reject(err);
                }
            });

            return deferred.promise;
        };


    var removeSchemes = function () {
        return findAndRemove(Scheme, {_id: current_scheme_id});
    };

    var removeSteps = function (schemeIds) {
        return findAndRemove(Step, {'Scheme_id': { $in: schemeIds}});
    };

    var removeQuestions = function (stepIds) {
        return findAndRemove(Question, {'Step': { $in: stepIds}});
    };

    var removeSubQuestions = function (questionIds) {
        return findAndRemove(Question, {'ParentQuestion': { $in: questionIds}});
    };
    var removeAnswers = function (subquestionId) {
        return findAndRemove(Answer, {'Question_id': { $in: subquestionId}});
    };

    removeSchemes()
        .then(function (result) {
            var deferred = Q.defer();
            Q.all([removeSteps(result), deletePatient(result)]).spread(function (steps_ids, patients_ids) {
                console.log(patients_ids);
                deferred.resolve(steps_ids);
            }, function () {
                deferred.reject();
            });

            return deferred.promise;
        })
        .then(removeQuestions)
        .then(function (result) {
            var deferred = Q.defer();
            Q.all([removeSubQuestions(result), removeAnswers(result)]).spread(function (subquestion_id, answer_id) {
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