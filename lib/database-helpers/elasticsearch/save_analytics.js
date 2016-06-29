'use strict';

/**
* Return ES response the document has been saved
* @param {Object} analytics
* Example:
{
  idUser: '',
  queryUrl: '',
  timestamp: Date.now(),
  query: {
    headline: '',
    fullname: '',
    current: '',
    location: '',
    skills: []
  },
  nbResults: 0
}
* @param {Function} callback - function with ES error and ES response
* Example:
{ _index: index,
  _type: type,
  _id: 'some id',
  _version: 1,
  created: true }
*/

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
