'use strict';

var mongoose = require('mongoose'),
    _ = require('lodash'),
    User = mongoose.model('User'),
    Patient = mongoose.model('Patient'),
    Scheme = mongoose.model('Scheme'),
    Question = mongoose.model('Question'),
    Step = mongoose.model('Step'),
    Answer = mongoose.model('Answer'),
    Option = mongoose.model('Option');

/**
 * Populate database with sample application data
 */

function createTable() {
    var schemes = [
            {
                Title: "Mave Onde",
                SortOrder: 0
            },
            {
                Title: "Øre betændelse",
                SortOrder: 1
            }
        ],
        stepTitles = ["Subjective", "Objective", "Assessment", "Plan"],
        questions = [
            {
                QuestionText: "Alder?",
                SortOrder: 0,
                Type: { Label: 'Single Text', Value: "single-text" },
                JournalText: "{{}} år"
            },
            {
                QuestionText: "Køn?",
                SortOrder: 1,
                Type: { Label: 'Radio List', Value: "radio-list" },
                JournalText: "{{}}"
            },
            {
                QuestionText: "Har du haft feber?",
                SortOrder: 2,
                Type: { Label: 'Radio List', Value: "radio-list" },
                JournalText: "Feber: {{}}"
            },
            {
                QuestionText: "Har du andre kommentar?",
                SortOrder: 4,
                Type: { Label: 'Multi Text', Value: "multi-text" },
                JournalText: "Patient tilføjer: {{}}"
            },
            {
                QuestionText: "Lægens egen kommentar?",
                JournalText: "{{}}",
                SortOrder: 5,
                Type: { Label: 'Multi Text', Value: "multi-text" }
            }
        ],

        subquestions = [
            {
                QuestionText: "Hvor længe har du haft feber?",
                SortOrder: 0,
                Type: { Label: 'Radio List', Value: "radio-list" },
                JournalText: "{{}}"
            },
            {
                QuestionText: "Har du målt din feber i dag?",
                SortOrder: 1,
                Type: { Label: 'Radio List', Value: "radio-list" },
                JournalText: "Målt feber: {{}}"
            }
        ],

        optionType1 = [
            {
                Key: "0",
                Value: "Kvinde"
            },
            {
                Key: "1",
                Value: "Mand"
            }
        ],

        optionType2 = [
            {
                Key: "0",
                Value: "Ja"
            },
            {
                Key: "1",
                Value: "Nej"
            }
        ],

        optionType3 = [
            {
                Key: "1 dage",
                Value: "1 dage"
            },
            {
                Key: "2 dage",
                Value: "2 dage"
            },
            {
                Key: "3 dage",
                Value: "3 dage"
            },
            {
                Key: "4 dage",
                Value: "4 dage"
            },
            {
                Key: "5 dage",
                Value: "5 dage"
            }
        ];


    Patient.find({}).remove(function () {
        Scheme.find({}).remove(function () {
            Step.find({}).remove(function () {
                Question.find({}).remove(function () {
                    Answer.find({}).remove(function () {

                        console.log("=============STARTING TO REBUILD DUMMYDATA==============");
                        _.forEach(schemes, function (scheme) {

                            Scheme.create(scheme, function (err, scheme) {
                                var sort_order = 0;
                                _.forEach(stepTitles, function (step_title) {

                                    Step.create({Title: step_title, SortOrder: sort_order, Scheme_id: scheme._id}, function (err, step) {
                                        _.forEach(questions, function (question) {
                                            var q = new Question(question),
                                                options = [];
                                            q.Step = step._id;

                                            if (q.SortOrder === 1) {
                                                options = optionType1;
                                            }

                                            if (q.SortOrder === 2) {
                                                options = optionType2;
                                            }

                                            if (options) {
                                                _.forEach(options, function (opt) {
                                                    var o = new Option(opt);
                                                    q.Options.push(o);
                                                });
                                            }

                                            Question.create(q, function (err, question) {
                                                if(!err){
                                                    _.forEach(subquestions, function (subquestion) {
                                                        var q = new Question(subquestion),
                                                            options = [];

                                                        if (q.SortOrder === 0) {
                                                            options = optionType3;
                                                        }

                                                        if (q.SortOrder === 1) {
                                                            options = optionType2;
                                                        }

                                                        if (options) {
                                                            _.forEach(options, function (opt) {
                                                                var o = new Option(opt);
                                                                q.Options.push(o);
                                                            });
                                                        }

                                                        q.ParentQuestion = question._id;

                                                        Question.create(q, function () {

                                                        });

                                                    });
                                                }

                                            });
                                        });
                                    });
                                    sort_order++;
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    // Clear old users, then add a default user
    User.find({}).remove(function () {
        User.create({
                provider: 'local',
                name: 'Morten',
                email: 'mortenlunddybdal@gmail.com',
                password: 'kontrabas'
            }, function () {
                console.log('finished populating users');
            }
        );


        User.create({
                provider: 'local',
                name: 'Mathias',
                email: 'mathias.kaastrup@gmail.com',
                password: 'Mathias'
            }, function () {
                console.log('finished populating users');
            }
        );

        User.create({
                provider: 'local',
                name: 'Jakob',
                email: 'jafunch@gmail.com',
                password: 'Start123'
            }, function () {
                console.log('finished populating users');
            }
        );

        User.create({
                provider: 'local',
                name: 'Ole',
                email: 'ole@maegbaek.dk',
                password: '1234'
            }, function () {
                console.log('finished populating users');
            }
        );
    });
}

//createTable();


