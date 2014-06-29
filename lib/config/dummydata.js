'use strict';

var mongoose = require('mongoose'),
    _ = require('lodash'),
    User = mongoose.model('User'),
    Patient = mongoose.model('Patient'),
    Scheme = mongoose.model('Scheme'),
    Question = mongoose.model('Question'),
    Option = mongoose.model('Option'),
    Step = mongoose.model('Step');

/**
 * Populate database with sample application data
 */

var scheme = new Scheme({Title: "Maveonde - test"}),
    stepTitles = ["Subjective", "Objective", "Assessment", "Plan"],
    questions = [
        {
            QuestionText: "Alder?",
            SortOrder: 0,
            Type: "single-text",
            JournalText: "{{}} år"
        },
        {
            QuestionText: "Køn?",
            SortOrder: 1,
            Type: "radio-list",
            JournalText: "{{}}"
        },
        {
            QuestionText: "Har du haft feber?",
            SortOrder: 2,
            Type: "radio-list",
            JournalText: "Feber: {{}}"
        },
        {
            QuestionText: "Hvor længe har du haft feber?",
            SortOrder: 3,
            Type: "select-list",
            JournalText: "{{}}"
        },
        {
            QuestionText: "Har du målt din feber i dag?",
            SortOrder: 4,
            Type: "radio-list",
            JournalText: "Målt feber: {{}}"
        },
        {
            QuestionText: "Har du andre kommentar?",
            SortOrder: 5,
            Type: "multi-text",
            JournalText: "Patient tilføjer: {{}}"
        },
        {
            QuestionText: "Lægens egen kommentar?",
            JournalText: "{{}}",
            SortOrder: 6,
            type: "multi-text"
        }
    ],

optionType1 =   [
                        {
                            Key: "0",
                            Value: "Kvinde"
                        },
                        {
                            Key: "1",
                            Value: "Mand"
                        }
],

 optionType2 =   [
                        {
                            Key: "0",
                            Value: "Ja"
                        },
                        {
                            Key: "1",
                            Value: "Nej"
                        }
 ],

 optionType3 =   [
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
    console.log("Patients removed");
    Scheme.find({}).remove(function () {
        console.log("Patients removed");
        Question.find({}).remove(function () {
            var question_index = 1;

            _.forEach(stepTitles, function (title) {
                var s = new Step({Title: title});

                _.forEach(questions, function (question) {
                    var q = new Question(question);
                    q.QuestionText = question.QuestionText + " - Question " + question_index;

                    var currentOption;

                    if(question.SortOrder === 1) {
                        currentOption = optionType1;
                    }

                    if(question.SortOrder === 2 || question.SortOrder === 4) {
                        currentOption = optionType2;
                    }

                    if(question.SortOrder === 3) {
                        currentOption = optionType3;
                    }

                    _.forEach(currentOption, function (option) {

                       var o = new Option(option);
                        q.Options.push(o);
                    });
                    s.Questions.push(q);
                    question_index++;
                });
                scheme.Steps.push(s);
            });

            scheme.save(function (err, scheme) {
                console.log(scheme);
            });
        });
    });
});






// Clear old users, then add a default user
User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, function() {
      console.log('finished populating users');
    }
  );
});