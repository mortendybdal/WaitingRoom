'use strict';

angular.module('waitingRoomApp')
    .factory('Auth', function Auth($location, $rootScope, $cookieStore, $http, $timeout, $q, Session, User) {

        // Get currentUser from cookie
        $rootScope.currentUser = $cookieStore.get('user') || null;
        $cookieStore.remove('user');

        return {

            /**
             * Authenticate user
             *
             * @param  {Object}   user     - login info
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            login: function (user, callback) {
                var cb = callback || angular.noop;

                return Session.save({
                    email: user.email,
                    password: user.password
                },function (user) {
                    $rootScope.currentUser = user;
                    return cb();
                },function (err) {
                    return cb(err);
                }).$promise;
            },

            /**
             * Unauthenticate user
             *
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            logout: function (callback) {
                var cb = callback || angular.noop;

                return Session.delete(function () {
                        $rootScope.currentUser = null;
                        return cb();
                    },
                    function (err) {
                        return cb(err);
                    }).$promise;
            },

            /**
             * Create a new user
             *
             * @param  {Object}   user     - user info
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            createUser: function (user, callback) {
                var cb = callback || angular.noop;

                return User.save(user,
                    function (user) {
                        $rootScope.currentUser = user;
                        return cb(user);
                    },
                    function (err) {
                        return cb(err);
                    }).$promise;
            },

            /**
             * Change password
             *
             * @param  {String}   oldPassword
             * @param  {String}   newPassword
             * @param  {Function} callback    - optional
             * @return {Promise}
             */
            changePassword: function (oldPassword, newPassword, callback) {
                var cb = callback || angular.noop;

                return User.update({
                    oldPassword: oldPassword,
                    newPassword: newPassword
                },function (user) {
                    return cb(user);
                },function (err) {
                    return cb(err);
                }).$promise;
            },

            /**
             * Gets all available info on authenticated user
             *
             * @return {Object} user
             */
            currentUser: function () {
                return User.get();
            },

            /**
             * Simple check to see if a user is logged in
             *
             * @return {Boolean}
             */
            isLoggedIn: function () {
                var user = $rootScope.currentUser;
                return !!user;
            },

            checkLoggedin: function () {
                // Initialize a new promise
                var deferred = $q.defer();

                // Make an AJAX call to check if the user is logged in
                $http.get('api/loggedin').success(function (user) {

                    console.log("USER", user);
                    // Authenticated
                    if (user !== '0') {
                        $rootScope.is_logged_in = true;
                        $timeout(deferred.resolve, 0);
                    } else { // Not Authenticated
                        $rootScope.is_logged_in = false;
                        $timeout(function () {
                            deferred.reject();
                        }, 0);
                        $location.url('/login');
                    }
                });

                return deferred.promise;
            }
        };
    });