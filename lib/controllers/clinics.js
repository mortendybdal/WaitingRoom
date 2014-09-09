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

exports.deleteClinic = function (req, res) {
    console.log(req.user);
    var clinic_id = req.params.clinic_id;

    function removeRelatedUsers (err, clinic) {
        if (!err) {

            User.find({clinic: clinic_id}).remove(function (err) {
                if(!err) {
                    return res.send({success: true});
                }else {
                    return res.send({success: false});
                }
            });
        } else {
            return res.send(err);
        }
    }

    if (req.params.clinic_id) {
        Clinic.findById(clinic_id).remove(removeRelatedUsers);
    } else {
        return res.json(null);
    }
};

exports.getClinic = function (req, res) {

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