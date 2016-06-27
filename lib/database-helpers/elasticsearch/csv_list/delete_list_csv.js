'use strict';

const clientES = require('../../../es.js');

/**
* Delete the list from the csv-iist type
* @param {String} listId - the id of the list to delete
* @param {Function} callback - function with error and the list of candidates
*/

module.exports = function (listId, callback) {

  clientES.delete({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_CSV_LIST,
    id: listId
  }, function (error, response) {

      callback(error, response);
  });

}
