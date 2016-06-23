'use strict';

const clientES = require('../../../es.js');

/**
* Return list of candidates who belogs to specific listNames
* @param {String} listNames
* @param {Function} callback - function with error and the list of candidates
*/

module.exports = function (listName, callback) {

  var numberCandidates = 0;

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE,
    scroll: '30s',
    search_type: 'scan',
    size: 1000,
    _source: ['id', 'picture','fullname', 'current', 'location', 'connectedTo', 'favourite', 'contacts', 'headline', 'statusCurrent', 'emails', 'viewedBy'],
    body: {
      query: {
        term: {
          "listNames": listName
        }
      }
    }
  }, function getMoreUntilDone(error, response) {

    if (error) {
      console.log(error);
    }

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
