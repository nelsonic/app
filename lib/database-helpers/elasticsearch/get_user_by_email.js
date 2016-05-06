'use strict';

const clientES = require('../../es.js');

module.exports = function (email, callback) {

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_GM_USERS,
    body: {
      query: {
        match_phrase: {
          email: email
        }
      }
    }
  }, function (err, response) {

    let user = response.hits.hits.length > 0 ? true : false;

    let result;

    if (user) {
      result = response.hits.hits[0]._source;
    }

    return callback(err, result);
  });
};
