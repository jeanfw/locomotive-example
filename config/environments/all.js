var express = require('express');
var passport = require('passport');
var flash = require('connect-flash');
var engines = require('consolidate');

module.exports = function() {
  this.set('views', __dirname + '/../../app/views');
  this.set('view engine', 'hjs');
  this.set('layout', 'layout');
  this.engine('hjs', engines.hogan);

  this.use(express.logger({ format: '\x1b[1m:method\x1b[0m \x1b[33m:url\x1b[0m :response-time ms' }));
  this.use(express.cookieParser());
  this.use(express.bodyParser());
  
  // Critical addition! Otherwise req.user isn't set
  this.use(express.session({ secret: 'locoloco' }));
  
  // Initialize Passport
  this.use(passport.initialize());
  this.use(passport.session());
  
  // Restore flash message functionality removed from Express 3.x
  // Uses jaredhanson/connect-flash
  this.use(flash());

  this.use(this.router);
  this.use(express.static(require('path').resolve(__dirname + "/../../public")));

  this.datastore(require('locomotive-mongoose'));
};
