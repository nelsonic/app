'use strict';

/**
* Update the job with the new allowedStages
* @param {String} id - the id of the job
* @param {Array} stages - allowedStages array
* @param {Function} callback - callback with error and the result
*/

const clientES = require('../../../es.js');
module.exports = function (id, stages, callback) {

  clientES.update({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_GM_JOBS,
    id: id,
    body: {
      doc: {
        stagesAllowed: stages
      }
    }
  }, function (err, response) {
    console.log('err',err);
    console.log('res', response);
    return callback(err,response);
  });
}
