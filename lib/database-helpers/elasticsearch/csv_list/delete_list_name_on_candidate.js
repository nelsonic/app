'use strict';

const clientES = require('../../../es.js');

/**
* Update the current listNames by removing the listName received from payload
* @param {String} idCandidate - The id of the candidate
* @param {String} listName
* @param {Function} callback - error or response from ES
*/

module.exports = function (id, listName, callback) {

  clientES.get({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE,
    id: id,
    _source: ['listNames']
  }, function (errGet, responseGet) {

    const currentList = responseGet._source.listNames;

    const filtered = currentList.filter(function (name) {
      return name !== listName;
    });

    clientES.update({
      index: process.env.ES_INDEX,
      type: process.env.ES_TYPE,
      id: id,
      body: {
        doc: { listNames: filtered}
      }
    }, function(errorUpdate, responseUpdate) {

      return callback(errorUpdate, responseUpdate);
    });
  });
}
