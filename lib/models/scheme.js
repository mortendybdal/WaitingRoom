'use strict';

var mongoose = require('mongoose'),
    Step = require('./step'),
    Schema = mongoose.Schema;

/**
 * Scheme Schema
 */
var Scheme = new Schema({
    Title: String,
	Steps: [Step.schema]
});

exports = mongoose.model('Scheme', Scheme);
