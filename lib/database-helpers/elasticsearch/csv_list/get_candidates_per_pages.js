'use strict';

const clientES = require('../../../es.js');

/**
* Return list of candidates who belogs to specific listName
* @param {String} listName
* @param {String} page - the page
* @param {Function} callback - function with error and the list of candidates
*/

module.exports = function (listName, page, callback) {

  const perPage = Number(process.env.RESULTS_PER_PAGE);

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE,
    from: page  * perPage,
    size: perPage,
    _source: ['id', 'picture','fullname', 'current', 'location', 'connectedTo', 'favourite', 'contacts.email', 'headline', 'statusCurrent', 'emails', 'viewedBy'],
    body: {
      query: {
        term: {
          "listNames": listName
        }
      },
      sort: { "fullname.raw": {"order": "asc"}}
    }
  }, function (error, response) {

    console.log('###########');
    console.log(error);
    console.log('############');
    const result = [];

    response.hits.hits.forEach(function (candidate) {

      candidate._source.id = candidate._id;
      result.push(candidate._source);
    });

    return callback({candidates: result, totalCandidates: response.hits.total});

 });
}
