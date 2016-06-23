'use strict';

/**
* Aggreate by listNames
* @param {Function} callback - err or response
*/

const clientES = require('../../../es.js');

module.exports = function (callback) {

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE,
    size: 0,
    body: {
      aggs: {
        listNamesAggs: {
          terms: { field: "listNames"}
        }
      }
    }
  }, function (errorSave, responseSave) {

    return callback(errorSave, responseSave);
  });
}
