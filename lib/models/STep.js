'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Thing Schema
 */
var Step = new Schema({
    Title: String,
    SortOrder: Number,
    Scheme_id: Schema.Types.ObjectId
});

mongoose.model('Step', Step);