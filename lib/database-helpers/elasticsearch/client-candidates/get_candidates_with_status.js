'use strict';

const clientES = require('../../../es.js');

/**
* Return list of candidates with statusCurrent belonging to one client
* @param {String} idClient - specific id of the client(ES)
* @param {Function} callback - function with error and the list of candidates
*/


module.exports = function (idClient, callback) {

  var numberCandidates = 0;

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE,
    scroll: '30s',
    search_type: 'scan',
    size: 1000,
    _source: ['fullname', 'picture', 'statusCurrent'],
    body: {
      query: {
        term: {
          "statusCurrent.idClient": idClient
        }
      }
    }
  }, function getMoreUntilDone(error, response) {

    var result = [];

    response.hits.hits.forEach(function (candidate) {

      candidate._source.id = candidate._id;
      result.push(candidate._source);
      numberCandidates += 1;
    });

    if (response.hits.total !== numberCandidates) {
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
