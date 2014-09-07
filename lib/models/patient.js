'use strict';

var mongoose = require('mongoose'),
    Scheme = require('./scheme'),
    Schema = mongoose.Schema;

/**
 * Patient Schema
 */
var Patient = new Schema({
    TimeOfAppointment: { type : Date, default: Date.now },
    Submitted: { type : Date, default: Date.now },
    Schemes: [{ type: Schema.Types.ObjectId, ref: 'Scheme' }]
});

mongoose.model('Patient', Patient);
