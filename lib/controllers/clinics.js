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

exports.getUsersByClinic = function (req, res, next) {
    var clinic_id = req.params.clinic_id;

    User.find({clinic: clinic_id}, function (err, users) {
        if (err) return next(err);
        if (!users) return res.send(404);

        var user_profil = [];

        _.forEach(users, function (user) {
            user_profil.push(user.profile);
        });

        res.send(user_profil);
    });
};

exports.getClinics = function (req, res) {

    var numberOfDoctors = function(err, clinics) {
        if (!err) {
            User.aggregate()
                .group({
                    _id: '$clinic',
                    numberOfUsers: { $sum: 1 }
                })
                .exec(function (err, aggregatedResult) {
                    if(!err) {
                        _.forEach(clinics, function (clinic) {

                            var result = _.find(aggregatedResult, {_id: clinic._id });

                            if(result) {
                                clinic.NumberOfUsers = result.numberOfUsers;
                            }else {
                                clinic.NumberOfUsers = 0;
                            }

                        });

                        return res.json(clinics);
                    }else {
                        return res.json(err);
                    }
                });
        } else {
            return res.json(err);
        }
    };


    Clinic.find({ })
        .lean()
        .exec(numberOfDoctors);
};