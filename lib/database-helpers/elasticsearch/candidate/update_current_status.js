'use strict';

/**
* Update the current stages of the candidate
* @param {String} idCandidate - The id of the candidate
* @param {Array} statusCurrent - The list of the new statuses
*/


const clientES = require('../../../es.js');

module.exports = function (idCandidate, statusCurrent, callback) {

  clientES.update({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE,
    id: idCandidate,
    body: {
      doc: {
        statusCurrent: statusCurrent
      }
    }
   }, function (error, response) {

      return callback(error, response);

   })

}
