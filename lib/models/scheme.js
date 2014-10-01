'use strict';

var mongoose = require('mongoose'),
    Question = require('./question'),
    Schema = mongoose.Schema;

/**
 * Scheme Schema
 */
var Scheme = new Schema({
    Title: String,
    SortOrder: Number,
    Clinic: { type: Schema.Types.ObjectId, ref: 'Clinic' }
});

exports = mongoose.model('Scheme', Scheme);
