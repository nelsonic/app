'use strict';

/**
* Update the current status and the rejected proeprties of the candidate
* @param {String} idCandidate - The id of the candidate
* @param {Array} statusCurrent - The list of the new statuses
* @param {Array} rejected - The list of the rejected job
*/

const clientES = require('../../../es.js');

module.exports = function (idCandidate, statusCurrent, rejected, callback) {

  clientES.update({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE,
    id: idCandidate,
    body: {
      doc: {
        statusCurrent: statusCurrent,
        rejected: rejected
      }
    }
   }, function (error, response) {

      return callback(error, response);

   })

}
