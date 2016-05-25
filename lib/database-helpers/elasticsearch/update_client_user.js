'use strict';

const clientES = require('../../es.js');

/**
* Update clientUser in ES
* @param {String} id - client id in ES
* @param {Object} clientUser
* @param {Function} callback with params: err or response
*/
module.exports = function (id, clientUser, callback) {

  clientES.update({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_GM_CLIENT_USERS,
    id: id,
    body: {
      doc: clientUser
    }
  }, function (errorUpdate, responseUpdate) {

    return callback(errorUpdate, responseUpdate);
  });
}
