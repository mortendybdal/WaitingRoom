'use strict';

var mongoose = require('mongoose'),
    _ = require('lodash'),
    Answer = mongoose.model('Answer'),
    passport = require('passport');

/**
 * Save Answer
 */

exports.saveAnswer = function(req, res) {
    var answer = new Answer(req.body.answer);
    var upsertData = answer.toObject();
    delete upsertData._id;

    Answer.findOneAndUpdate(
        {
            Patient_id: req.body.answer.Patient_id,
            Question_id: req.body.answer.Question_id
        },
        upsertData,
        {
            upsert: true
        }, function (err, answer) {
            console.log("Err", err);
            console.log("Answer", answer);
        }
    );

    //var new_answer = new Answer(req.body.answer);


    /*Answer.create(new_answer, function (err, answer) {
        if (!err) {
            return res.json(answer);
        } else {
            return res.send(err);
        }
    });
    */

};