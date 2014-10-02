'use strict';

var _ = require('lodash');
/**
 *  Route middleware to ensure user is authenticated.
 */
exports.ensureAuthenticated = function (roles) {
    return function (req, res, next) {

        console.log(roles);
        if (req.isAuthenticated()) {
            if (_.contains(roles, req.user.role)) {
                return next();
            } else {
                res.send(403);
            }
        } else {
            res.send(401);
        }
    };
};


/**
 * Blog authorizations routing middleware

exports.blog = {
    hasAuthorization: function(req, res, next) {
        if (req.blog.creator._id.toString() !== req.user._id.toString()) {
            return res.send(403);
        }
        next();
    }
}; */