'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Patient = mongoose.model('Patient');

/**
 * Populate database with sample application data
 */

//Clear old things, then add things in
Patient.find({}).remove(function() {
  Patient.create({
    scheme: "Halssmerter"
  }, {
    scheme: "Øresmerter"
  }, {
    scheme: "Halssmerter"
  }, {
    scheme: "Maveonde"
  }, {
    scheme: "Halssmerter"
  }, function() {
      console.log('finished populating patients');
    }
  );
});

// Clear old users, then add a default user
User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, function() {
      console.log('finished populating users');
    }
  );
});
