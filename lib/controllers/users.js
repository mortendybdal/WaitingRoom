'use strict';

var mongoose = require('mongoose'),
    _ = require('lodash'),
    User = mongoose.model('User'),
    passport = require('passport');

/**
 * Create user
 */
exports.create = function (req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.save(function (err) {
        if (err) return res.json(400, err);

        req.logIn(newUser, function (err) {
            if (err) return next(err);

            return res.json(req.user.userInfo);
        });
    });
};

exports.updateUserByClinic = function (req, res, next) {
    var userId = req.body._id;
    var name = String(req.body.name);
    var role = String(req.body.role);

    User.findById(userId, function (err, user) {
        if (!err) {
            user.name = name;
            user.role = role;
            user.save(function (err) {
                if (err) return res.send(400);

                res.send(200);
            });
        } else {
            res.send(400);
        }
    });
};

/**
 *  Get profile of specified user
 */
exports.show = function (req, res, next) {
    var userId = req.params.id;

    User.findById(userId, function (err, user) {
        if (err) return next(err);
        if (!user) return res.send(404);

        res.send({ profile: user.profile });
    });
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

        res.send(users);
    });
};

/**
 * Change password
 */
exports.changePassword = function (req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    User.findById(userId, function (err, user) {
        if (user.authenticate(oldPass)) {
            user.password = newPass;
            user.save(function (err) {
                if (err) return res.send(400);

                res.send(200);
            });
        } else {
            res.send(403);
        }
    });
};

exports.deleteUser = function (req, res, next) {
    var current_user_id = req.params.user_id;

    User.findById(current_user_id).remove(function () {
        return res.send({success: true});
    });
};

/**
 * Get current user
 */
exports.me = function (req, res) {
    res.json(req.user || null);
};