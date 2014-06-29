'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Thing Schema
 */
var Option = new Schema({
    Value: String,
    Key: String
});

mongoose.model('Option', Option);

var Question = new Schema({
    QuestionText: String,
    SortOrder: Number,
    Type: String,
    Answer: String,
    JournalText: String,
    Options: [Option.schema]
});

exports = mongoose.model('Question', Question);
