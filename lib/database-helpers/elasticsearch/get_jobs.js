'use strict';

const clientES = require('../../es.js');

module.exports = function (id, callback) {

  clientES.get({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_GM_JOBS,
    id: id
  }, function (error, response) {

    var job = response._source;
    job.id = response._id;

    return callback(error, job);
  });
}
