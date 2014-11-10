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


/**
 * Get patient list
 */
exports.getPatients = function (req, res) {
    Patient.find({Doctor: req.user._id})
        .populate('Schemes')
        .exec(function (err, patients) {
            if (!err) {
                return res.json(patients);
            } else {
                return res.send(err);
            }
        });
};

/**
 * Create patient
 */

exports.createOrUpdatePatient = function (req, res) {
    //Create Patient
    var new_patient;
    if(req.body._id) {
        Patient.findById(req.body._id, function (err, patient) {
            if (!err) {
                patient.Doctor = req.body.Doctor;
                patient.Schemes = req.body.Schemes;
                patient.TimeOfAppointment = req.body.TimeOfAppointment;
                patient.Status = req.body.Status;
                patient.save();
                return res.json(patient);
            } else {
                return res.send(err);
            }
        });
    } else {
        new_patient = new Patient(req.body);
        new_patient.save(function (err, patient) {
            if (!err) {
                return res.json(patient);
            } else {
                return res.send(err);
            }
        });
    }
};

/**
 * Get patient
 */

exports.getPatient = function (req, res) {
    Patient.findById(req.params.id)
        .populate('Schemes')
        .exec(function (err, patient) {
            if (!err) {
                return res.json(patient);
            } else {
                return res.send(err);
            }
        });
};

exports.getPatientAndScheme = function (req, res) {
    Patient.findById(req.params.id)
        .populate('Schemes')
        .exec(function (err, patient) {
            if (!err) {
                return res.json(patient);
            } else {
                return res.send(err);
            }
        });
};

/**
 * Find all subjective questions from scheme and append scheme to patient
 */

exports.updatePatient = function (req, res) {
    var patient = new Patient(req.body);
    var upsertData = patient.toObject();
    delete upsertData._id;

    Patient.findOneAndUpdate(
        {"_id": req.body._id},
        upsertData,
        function (err, patient) {
            if (!err) {
                return res.json(patient);
            } else {
                return res.send(err);
            }
        }
    );
};

exports.setPatientStatus = function (req, res) {

    console.log('MY LOG', req.params.status);
    var status = req.params.status;

    if(!status) return res.json({success: false});

    Patient.findById(req.body.id, function (err, patient) {
            if (!err) {
                patient.Status = status;

                patient.save();

                return res.json(patient);
            } else {
                return res.send(err);
            }
        }
    );
};

exports.getPatientWithScheme = function (req, res) {
    //Find steps for scheme
    if (!req.params.scheme_number && isNaN(parseInt(req.params.scheme_number)) || !req.params.patient_id) {
        return res.send(null);
    }

    var scheme_number = parseInt(req.params.scheme_number),
        findPatientById = function () {
            var deferred = Q.defer();
            Patient.findById(req.params.patient_id)
                .populate('Schemes')
                .exec(function (err, patient) {
                    if (!err) {
                        console.log(patient);
                        deferred.resolve(patient);
                    } else {
                        deferred.reject(err);
                    }
                });

            return deferred.promise;
        },
        findStepsById = function (patient) {
            var deferred = Q.defer();
            if (patient.Schemes[scheme_number]) {
                Step.find({Scheme_id: patient.Schemes[scheme_number]}, function (err, steps) {
                    if (!err) {
                        var step_ids = _.pluck(steps, '_id');
                        deferred.resolve({patient: patient, steps: step_ids});
                    } else {
                        deferred.reject(err);
                    }
                });
            } else {
                deferred.reject('Scheme does not exist');
            }

            return deferred.promise;
        },
        findQuestions = function (data) {
            var deferred = Q.defer();

            Question.find({
                'Step': { $in: data.steps}
            }).populate('Step')
                .lean()
                .exec(function (err, questions) {
                    if (!err) {
                        deferred.resolve({patient: data.patient, questions: questions});
                    } else {
                        deferred.reject(err);
                    }
                });

            return deferred.promise;
        },
        findAnswers = function (data) {
            var deferred = Q.defer(),
                question_ids = _.pluck(data.questions, '_id');

            Answer.find({'Question_id': {$in: question_ids}, 'Patient_id': req.params.patient_id}, function (err, answers) {
                if (!err) {
                    var questions = _.forEach(data.questions, function (question) {
                        var answer = _.find(answers, {Question_id: question._id});

                        if (answer) {
                            question.Answer = answer.AnswerText;
                        }
                    });
                    deferred.resolve({patient: data.patient, questions: questions});
                } else {
                    deferred.reject(err);
                }
            });

            return deferred.promise;
        },
        findSubquestions = function (data) {
            var deferred = Q.defer(),
                question_ids = _.pluck(data.questions, '_id');
            Question.find({'ParentQuestion': { $in: question_ids}})
                .populate('ParentQuestion')
                .lean()
                .exec(function (err, subquestions) {
                    if (!err) {
                        _.forEach(data.questions, function (q) {
                            q.questions = [];
                            _.forEach(subquestions, function (sq) {
                                if (q._id.equals(sq.ParentQuestion._id)) {
                                    q.questions.push(sq);
                                }
                            });
                        });
                        deferred.resolve({patient: data.patient, questions: data.questions, subquestions: subquestions});
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
                    var response = _.forEach(data.questions, function (question) {
                        _.forEach(question.questions, function (subquestion) {
                            var answer = _.find(answers, {Question_id: subquestion._id});

                            if (answer) {
                                subquestion.Answer = answer.AnswerText;
                            }
                        });
                    });

                    deferred.resolve({patient: data.patient, questions: response});
                } else {
                    deferred.reject(err);
                }
            });

            return deferred.promise;
        };

    findPatientById()
        .then(findStepsById)
        .then(findQuestions)
        .then(findAnswers)
        .then(findSubquestions)
        .then(findSubanswers)
        .then(function (response) {
            console.log(response);
            return res.json(response);
        }, function (err) {
            return res.json(err);
        });
};
