'use strict';

var clientES = require('../../es.js');

// $lab:coverage:off$
const compare = function (stageA, stageB) {
  if (stageA.id < stageB.id)
    return -1;
  else if (stageA.id > stageB.id)
    return 1;
  else
    return 0;
}
// $lab:coverage:on$


module.exports = function (callback) {

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_STATUS,
    size: 100,
    body: {
      query: {
        match_all: {},
      }
      // sort: { id: {"order": "asc"}}
    }
  }, function (error, response) {


    var result = [];

    response.hits.hits.forEach(function (status) {
        result.push(status._source);
    });

    //sort result by id
    result = result.sort(compare)
    return callback(error, result);

    });
}
