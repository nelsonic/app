'use strict';

/**
* Return true if the name of the list exists otherwise return false
* @param {String} listName - the name of the list
* @param {Function} callback - callback with true or false
*/


const clientES = require('../../../es.js');

module.exports = function (listName, callback) {

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_CSV_LIST,
    body: {
        query: {
            term: { listName: listName}
        }
   }

 }, function (error, response) {

   return response.hits.hits.length > 0 ? callback(error, true) : callback(error, false);

 })

}
