'use strict';

var clientES = require('../../es.js');

module.exports = function (callback) {

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_STATUS,
    size: 100,
    body: {
      query: {
        match_all: {},
      },
      sort: { "id": {"order": "asc"}}
    }
  }, function (error, response) {

    var result = [];

    response.hits.hits.forEach(function (status) {
        result.push(status._source);
    });

    return callback(error, result);

    });
}
