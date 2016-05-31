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

    if(response.hits.hits.length > 0) {

      const user = response.hits.hits[0]._source;
      user.id = response.hits.hits[0]._id;
      return callback(error, user)
    } else {

      return callback(error, null);
    }

  });
}
