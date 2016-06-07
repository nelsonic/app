'use strict';

/**
* Get a candidate
* @param {String} idCandidate -  the id of the candidate
*/


const clientES = require('../../../es.js');

module.exports = function (idCandidate, callback) {

  clientES.get({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE,
    id: idCandidate,
   }, function (error, response) {

      const candidate = response._source;
      candidate.id = response._id;
      return callback(error, candidate);

   })

}
