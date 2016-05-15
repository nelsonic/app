'use strict';

var clientES = require('../../es.js');

module.exports = function (id, status, callback) {

  clientES.get({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE,
    id: id,
    _source: ['statusCurrent', 'statusHistory']
  }, function (errGet, responseGet) {

    const currentStatus = responseGet._source.statusCurrent;
    const statusHistory = responseGet._source.statusHistory;

    //filtered status
    const filtered = currentStatus.filter(function (current) {
      return current.timestamp.toString() !== status.timestamp.toString();
    }); //update to statusCurrent

    //status we want to delete based on the same timestamp
    const deletedStatus = currentStatus.filter(function (current) {
      return current.timestamp.toString() === status.timestamp.toString();
    });

    const newStatusHistory = statusHistory.concat(deletedStatus);

    const bulk = [
      { update: { _index: process.env.ES_INDEX, _type: process.env.ES_TYPE, _id: id } },
    // the document to update
      { doc: { statusCurrent: filtered } },
      { update: { _index: process.env.ES_INDEX, _type: process.env.ES_TYPE, _id: id } },
    // the document to update
      { doc: { statusHistory: newStatusHistory } }
    ];

    clientES.bulk({
      body: bulk
    }, function (err, response) {

      return callback(err, response);
    });
  });
}
