'use strict';

const clientES = require('../../es.js');

/**
* Return list of candidates with statusCurrent on specific job
* @param {String} idJob - specific id of the job (ES)
* @param {Function} callback - function with error and the list of candidates
*/


module.exports = function (idJob, callback) {

  var numberCandidates = 0;

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE,
    scroll: '30s',
    search_type: 'scan',
    size: 1000,
    _source: ['statusCurrent'],
    body: {
      query: {
        term: {
          "statusCurrent.idJob": idJob
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
