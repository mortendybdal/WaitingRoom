'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Option = new Schema({
    Value: String,
    Key: String
});

mongoose.model('Option', Option);

var Question = new Schema({
    QuestionText: String,
    SortOrder: Number,
    Type: String,
    JournalText: String,
    Step_id: Schema.Types.ObjectId,
    Options: [Option.scheme]
});

exports = mongoose.model('Question', Question);
