'use strict';

var mongoose = require('mongoose'),
    _ = require('lodash'),
    Q = require('q'),
    Scheme = mongoose.model('Scheme'),
    Step = mongoose.model('Step'),
    Question = mongoose.model('Question'),
    Answer = mongoose.model('Answer'),
    User = mongoose.model('User');

exports.getTabletData = function (req, res) {
    var response = {},
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
                        response.schemes = _.sortBy(result, 'SortOrder');
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
            _.forEach(data.response.schemes, function (r) {
                r.steps = _.sortBy(_.filter(result, { 'Scheme_id': r._id }), 'SortOrder');

            });
        }),
        findQuestions = generateFindFunction(Question, 'Step', function (data, result) {
            _.forEach(data.response.schemes, function (r) {
                _.forEach(r.steps, function (s) {
                    s.questions = _.sortBy(_.filter(result, { 'Step': s._id }), 'SortOrder');
                });
            });
        }),
        findSubquestions = generateFindFunction(Question, 'ParentQuestion', function (data, result) {
            _.forEach(data.response.schemes, function (r) {
                _.forEach(r.steps, function (s) {
                    _.forEach(s.questions, function (q) {
                        q.questions = _.sortBy(_.filter(result, { 'ParentQuestion': q._id }), 'SortOrder');
                    });
                });
            });
        }),
        getDoctorsByClinic = function (data) {
            var deferred = Q.defer();

            User.find({clinic: req.user.clinic}, function (err, users) {
                if (!err) {
                    var user_profil = [];

                    _.forEach(users, function (user) {
                        user_profil.push(user.profile);
                    });

                    data.response.doctors = user_profil;

                    deferred.resolve({response: response, ids: null});
                } else {
                    deferred.reject(err);
                }
            });

            return deferred.promise;
        };

    findScheme()
        .then(findSteps)
        .then(findQuestions)
        .then(findSubquestions)
        .then(getDoctorsByClinic)
        .then(function (data) {
            return res.json(data.response);
        }, function (err) {
            return res.send(err);
        });
};