'use strict';

/**
* Search a client-user by email
*/

const clientES = require('../../../es.js');

module.exports = function (email, callback) {

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_GM_CLIENT_USERS,
    body: {
      query: {
        match_phrase: {
         email: email
        }
      }
    }
  }, function (error, response) {

    const user = response.hits.hits.length > 0 ? response.hits.hits[0]._source : null;

    return callback(error, user);
  });
}
