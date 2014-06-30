'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Patient Schema
 */
var Answer = new Schema({
    AnswerText: String,
    Question_id: Schema.Types.ObjectId,
    Patient_id: Schema.Types.ObjectId
});

mongoose.model('Answer', Answer);
