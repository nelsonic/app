'use strict';

/**
* Index a list into ES
* @param {String} listName - the name of the list
* @param {Function} callback - err or response
*/

const clientES = require('../../../es.js');

module.exports = function (listName, callback) {

  clientES.index({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_CSV_LIST,
    body: {listName: listName}
  }, function (errorSave, responseSave) {

    return callback(errorSave, responseSave);
  });
}
