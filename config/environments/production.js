var express = require('express');

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL; 

module.exports = function() {
  this.use(express.errorHandler());
  this.set('db-uri', mongoUri);
};
