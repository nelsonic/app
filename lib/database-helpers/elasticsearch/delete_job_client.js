'use strict';

var clientES = require('../../es.js');

module.exports = function (idClient, idJob, next) {

  if(idClient) {

    clientES.get({
      index: process.env.ES_INDEX,
      type: process.env.ES_TYPE_GM_CLIENTS,
      id: idClient,
      _source: ['jobs']
    }, function (errClient, responseClient) {

      let jobs = new Set(responseClient._source.jobs);
      jobs.delete(idJob);

      clientES.update({
        index: process.env.ES_INDEX,
        type: process.env.ES_TYPE_GM_CLIENTS,
        id: idClient,
        body: {doc: {jobs: Array.from(jobs)}}
      }, function(errUpdate, responseUpdate) {

        return next(errUpdate, responseUpdate);
      })
    })
  } else {
    return next(null, 'no previous id');
  }

}
