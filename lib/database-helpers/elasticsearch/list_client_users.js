'use strict';

/**
* Seach for all the client users
* @param {Function} callback - function with error and the list of client uses
*/

var clientES = require('../../es.js');

module.exports = (callback) => {

  var numberClientUsers = 0;

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_GM_CLIENT_USERS,
    scroll: '30s',
    search_type: 'scan',
    size: 1000,
    body: {
      query: {
        match_all: {},
      },
      sort: { "email": {"order": "asc"}}
    }
  }, function getMoreUntilDone(error, response) {

      var result = [];

      response.hits.hits.forEach((clientObject) => {
        const client = clientObject._source;
        client.id = clientObject._id;
        result.push(client);
        numberClientUsers += 1;
      });

      if (response.hits.total !== numberClientUsers) {
        clientES.scroll({
          scrollId: response._scroll_id,
          scroll: '30s',
          size: 1000,
        }, getMoreUntilDone);
      } else {

        return callback(error, result);
      }
    });
}
