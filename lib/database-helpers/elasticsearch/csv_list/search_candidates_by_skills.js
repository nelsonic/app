'use strict';

const clientES = require('../../../es.js');

/**
* Return list of candidates searched by skills on a list
* @param {String} listName
* @param {String} page - the page
* @param {Function} callback - function with error and the list of candidates
*/

module.exports = function (listName, skills, page, callback) {

  const perPage = Number(process.env.RESULTS_PER_PAGE);
  const must = [];
  skills.forEach(skill => {
    must.push({match: {"skills.skill": skill}});
  })

  must.push({term: {"listNames": listName}});

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE,
    from: page  * perPage,
    size: perPage,
    _source: ['id', 'picture','fullname', 'current', 'location', 'connectedTo', 'favourite', 'contacts.email', 'headline', 'statusCurrent', 'emails', 'viewedBy'],
    body: {
      query: {
        bool:{
          must: must
        }
      },
      sort: { "fullname.raw": {"order": "asc"}}
    }
  }, function (error, response) {

    const result = [];

    response.hits.hits.forEach(function (candidate) {

      candidate._source.id = candidate._id;
      result.push(candidate._source);
    });

    return callback({candidates: result, totalCandidates: response.hits.total});

 });
}
