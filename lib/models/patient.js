'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Thing Schema
 */
var PatientSchema = new Schema({
    scheme: String,
    appointment: { type : Date, default: Date.now },
    submitted: { type : Date, default: Date.now }
});

mongoose.model('Patient', PatientSchema);
