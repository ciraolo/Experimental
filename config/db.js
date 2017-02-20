var mongoose = require('mongoose');

module.exports = {
  url: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ya_auth'
}
