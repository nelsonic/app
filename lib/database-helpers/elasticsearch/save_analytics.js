'use strict';

const clientES = require('../../es.js');
const getUserByIdGoogle = require('./get_user_by_id_google');

module.exports = function (analytics, callback) {

  getUserByIdGoogle(analytics.idUser, function (err, user) {

    analytics.userName = user.names.firstname;

    clientES.index({
      index: process.env.ES_INDEX,
      type: process.env.ES_TYPE_ANALYTICS,
      body: analytics
    }, function(errorAnalytics, responseAnalytics) {

       return callback(errorAnalytics, responseAnalytics)
    });
  })
}
