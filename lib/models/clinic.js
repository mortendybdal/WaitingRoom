'use strict';

var mongoose = require('mongoose'),
    Scheme = require('./scheme'),
    Schema = mongoose.Schema;

/**
 * Customer Schema
 */
var Clinic = new Schema({
    Name: String,
    SortOrder: Number
});

mongoose.model('Clinic', Clinic);
