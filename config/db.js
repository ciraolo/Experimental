var mongoose = require('mongoose');

module.exports = {
  url: process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/ya_auth'
}
