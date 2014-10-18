'use strict';

var mongoose = require('mongoose'),
    Scheme = require('./scheme'),
    User = require('./user'),
    Schema = mongoose.Schema;

/**
 * Patient Schema
 */
var Patient = new Schema({
    TimeOfAppointment: { type : Date, default: Date.now },
    Submitted: { type : Date, default: Date.now },
    Schemes: [{ type: Schema.Types.ObjectId, ref: 'Scheme' }],
    Doctor: { type: Schema.Types.ObjectId, ref: 'User' },
    Status: { type : String, default: ''}
});

mongoose.model('Patient', Patient);
