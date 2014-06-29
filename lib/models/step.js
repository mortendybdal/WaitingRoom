'use strict';

var mongoose = require('mongoose'),
    Question = require('./question'),
    Schema = mongoose.Schema;

/**
 * Scheme Schema
 */
var Step = new Schema({
    Title: String,
    Questions: [Question.schema]
});

exports = mongoose.model('Step', Step);
