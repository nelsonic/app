'use strict';

/**
* Get and update the statusCurrent of the specific candidate
* @param {String} id - candidate ES id
* @param {Object} status
* Example of status:
{
idCandidate: 'ES id',
idClient: '45454',
idJob: '233',
idUser: 'use idGoogle ',
idStage: '4',
timestamp: 67678787878
}
* @param {Function} callback - returns error or response
*/

var clientES = require('../../es.js');

module.exports = function (id, status, callback) {

  clientES.get({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE,
    id: id,
    _source: ['statusCurrent']
  }, function (errGet, responseGet) {

    const currentStatus = responseGet._source.statusCurrent;
    currentStatus.push(status);

    clientES.update({
      index: process.env.ES_INDEX,
      type: process.env.ES_TYPE,
      id: id,
      body: {
        doc: {
          statusCurrent: currentStatus
        }
      }
    }, function (errUpdate, responseUpdate) {

      return callback(errUpdate, responseUpdate);
    });
  });
}
