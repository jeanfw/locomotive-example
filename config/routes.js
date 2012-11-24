var passport = require('passport');

module.exports = function routes() {
  this.root('account#show');
  this.resource('account');
  this.match('register', 'account#new', { via: 'get'});
  this.match('login', 'account#loginForm', { via: 'get' });
  this.match('login', passport.authenticate('local', { 
  	successRedirect: '/account',
  	failureRedirect: '/login', 
  	failureFlash: true
  }), { via: 'post' });
  this.match('logout', 'account#logout');
};
