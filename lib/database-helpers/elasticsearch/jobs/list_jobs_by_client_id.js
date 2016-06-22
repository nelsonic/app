'use strict';

/**
* Return a list of active jobs which belongs to the particular client
* @param {String} idClient - the id on clientUser object
* @param {Function} callback - callback with error and the result which is a jobs array
*/


const clientES = require('../../../es.js');

module.exports = function (idClient, callback) {

  let numberJobs = 0;

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_GM_JOBS,
    scroll: '30s',
    search_type: 'scan',
    size: 1000,
    body: {
      query: {
        filtered: {
          filter: {
            bool: {
              must: [
                {term: {active: true}},
                {term: {client: idClient}}
              ]
            }
          }
        }
      }
    }
  }, function getMoreUntilDone(error, response) {

    var result = [];

    response.hits.hits.forEach(function (jobObject) {
      const job = jobObject._source;
      job.id = jobObject._id;
      result.push(job);
      numberJobs += 1;
    });

    if (response.hits.total !== numberJobs) {
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
