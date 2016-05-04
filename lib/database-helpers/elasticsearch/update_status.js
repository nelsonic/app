'use strict';

var clientES = require('../../es.js');

module.exports = function (id, status, callback) {

  clientES.get({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE,
    id: id,
    _source: ['statusHistory']
  }, function (errGet, responseGet) {
  
    const currentStatus = responseGet._source.statusHistory || [];
    currentStatus.push(status);

    clientES.update({
      index: process.env.ES_INDEX,
      type: process.env.ES_TYPE,
      id: id,
      body: {
        doc: {
          statusHistory: currentStatus
        }
      }
    }, function (errUpdate, responseUpdate) {

      return callback(errUpdate, responseUpdate);
    });
  });
}
