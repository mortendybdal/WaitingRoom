'use strict';

var mongoose = require('mongoose'),
    Question = require('./question'),
    Schema = mongoose.Schema;

/**
 * Scheme Schema
 */
var Scheme = new Schema({
    Title: String,
    SortOrder: Number
});

exports = mongoose.model('Scheme', Scheme);
