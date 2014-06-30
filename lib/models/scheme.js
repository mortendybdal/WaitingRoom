'use strict';

var mongoose = require('mongoose'),
    Question = require('./question'),
    Schema = mongoose.Schema;

/**
 * Scheme Schema
 */
var Scheme = new Schema({
    Title: String
});

exports = mongoose.model('Scheme', Scheme);
