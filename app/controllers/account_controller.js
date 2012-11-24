var locomotive = require('locomotive');
var passport = require('passport');
var Controller = locomotive.Controller;

var Account = require('../models/account');

var AccountController = new Controller();

AccountController.show = function() {
  console.log("Account#show called.");
  if (!this.req.isAuthenticated()) {
    console.log("isAuthenticated returned false, redirecting...");
    this.req.flash('info', 'Please login or register first.');
    return this.res.redirect(this.urlFor({ action: 'loginForm' }));
  }
  console.log("User is authenticated.");
  this.user = this.req.user;
  this.render();
};

AccountController.new = function() {
  this.render();
};

AccountController.loginForm = function() {
  this.render('login_form', { info: this.req.flash('info'), warning: this.req.flash('error') });
};

AccountController.create = function() {
  var account = new Account();
  console.log("Trying to create account for " + this.param('email'));

  account.email = this.param('email');
  account.password = this.param('password');
  account.name.first = this.param('name.first');
  account.name.last = this.param('name.last');

  account.save(function (err) {
    if (err) {
      throw err;
    }
    console.log("Successfully created account for " + account.email);
  });
  
  this.redirect('/login');
};

AccountController.logout = function() {
  this.req.logout();
  this.req.flash('info', 'You have successfully logged out.')
  this.redirect('/login');
};

module.exports = AccountController;
