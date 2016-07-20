'use strict';

var clientES = require('../../es.js');

/**
* Return list of stages
* @param {Function} callback - function with error and result - list of stages
* Example:
[ { id: 1, name: 'Submitted', order: 1 },
  { id: 2, name: 'Phone Screen', order: 2 },
  { id: 3, name: 'Interview Stage 1', order: 3 }
  ...
 ]
*/

module.exports = function (callback) {

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_STATUS,
    size: 100,
    body: {
      query: {
        match_all: {},
      },
      sort: { order: {"order": "asc"}}
    }
  }, function (error, response) {

    var result = [];

    response.hits.hits.forEach(function (status) {
        result.push(status._source);
    });
  
    return callback(error, result);

    });
}
