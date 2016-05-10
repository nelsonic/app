'use strict';

const clientES = require('../../es.js');

module.exports = function (idGoogle, callback) {

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_GM_USERS,
    size: 100,
    body: {
      query: {
        match_phrase: {
          idGoogle: idGoogle
        }
      },
    }

    }, function (err, response) {

      const user = response.hits.hits[0] ? response.hits.hits[0]._source : undefined;

      if (user) {
        user.id = response.hits.hits[0]._id;
      }

      return callback(err, user);
  });
}
