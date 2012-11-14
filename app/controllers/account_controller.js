var locomotive = require('locomotive');
var passport = require('passport');
var Controller = locomotive.Controller;

var Account = require('../models/account');

var AccountController = new Controller();

AccountController.show = function() {
  console.log("Account#show called.");
  if (!this.req.isAuthenticated()) {
    console.log("isAuthenticated returned false, redirecting...");
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
  this.render();
};

AccountController.create = function() {
  var account = new Account();
  console.log("Trying to create account for " + email);

  account.email = this.param('email');
  account.password = this.param('password');
  account.name.first = this.param('name.first');
  account.name.last = this.param('name.last');

  account.save(function (err) {
    if (err)
      return this.redirect(this.urlFor({ action: 'new' }));
    console.log("Successfully created account for " + email);
    return this.redirect(this.urlFor({ action: 'loginForm' }));
  });
};

/* 
AccountController.login = function() {
  passport.authenticate('local', {
    successRedirect: this.urlFor({ action: 'show' }),
    failureRedirect: this.urlFor({ action: 'loginForm' }) }
  )(this.__req, this.__res, this.__next);
};
*/

AccountController.logout = function() {
  this.req.logout();
  this.redirect('/');
};

module.exports = AccountController;
