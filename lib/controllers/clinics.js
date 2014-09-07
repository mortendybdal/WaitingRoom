'use strict';

var mongoose = require('mongoose'),
    _ = require('lodash'),
    Q = require('q'),
    Clinic = mongoose.model('Clinic'),
    User = mongoose.model('User');

exports.createClinic = function (req, res) {
    Clinic.count({}, function (err, count) {
        var new_clinic = new Clinic(req.body);
        new_clinic.SortOrder = count;
        new_clinic.save(function (err, clinic) {
            if (!err) {
                return res.json(clinic);
            } else {
                return res.send(err);
            }
        });
    });
};

exports.updateClinic = function (req, res) {
    var clinic = new Clinic(req.body);
    var upsertData = clinic.toObject();
    delete upsertData._id;

    Clinic.findOneAndUpdate(
        {"_id": req.body._id},
        upsertData,
        function (err, clinic) {
            if (!err) {
                return res.json(clinic);
            } else {
                return res.send(err);
            }
        }
    );
};

exports.getClinic = function (req, res) {
    console.log(req.user);

    if (req.params.clinic_id) {
        Clinic.findById(req.params.clinic_id, function (err, clinic) {
            if (!err) {
                return res.json(clinic);
            } else {
                return res.send(err);
            }
        });
    } else {
        return res.json(null);
    }
};

exports.getClinics = function (req, res) {
    Clinic.find({}, function (err, clinics) {
        if (!err) {
            return res.json(clinics);
        } else {
            return res.send(err);
        }
    });
};