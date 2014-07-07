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
    Answer: { type: String, default: "" },
    SortOrder: Number,
    Type: String,
    JournalText: String,
    Step: { type: Schema.Types.ObjectId, ref: 'Step' },
    Options: [Option.scheme]
});

exports = mongoose.model('Question', Question);
