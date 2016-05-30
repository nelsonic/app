'use strict';

/**
* Return true if a user exists with a given email otherwise reutrn false
* @param {String} email - email to search on
* @param {Function} callback - callback with true or false
*/


const clientES = require('../../../es.js');

module.exports = function (email, callback) {

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_GM_CLIENT_USERS,
    body: {
        query: {
            term: { email: email}
        }
   }

 }, function (error, response) {

   return response.hits.hits.length > 0 ? callback(true) : callback(false);

 })

}
