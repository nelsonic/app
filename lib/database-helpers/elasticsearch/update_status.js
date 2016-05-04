'use strict';

var clientES = require('../../es.js');

module.exports = function (id, status, callback) {

  clientES.get({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE,
    id: id,
    _source: ['status']
  }, function (errGet, responseGet) {

    const currentStatus = responseGet._source.status || [];
    currentStatus.push(status);

    clientES.update({
      index: process.env.ES_INDEX,
      type: process.env.ES_TYPE,
      id: id,
      body: {
        doc: {
          status: currentStatus
        }
      }
    }, function (errUpdate, responseUpdate) {

      return callback(errUpdate, responseUpdate);
    });
  });
}
