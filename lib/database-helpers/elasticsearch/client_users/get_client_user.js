'use strict';

/**
* Return a client user
* @param {String} id - the Elasticsearch id of the client user
* @param {Function} callback - callback with error and the client user object
*/

const clientES = require('../../../es.js');

module.exports = function (id, callback) {

  clientES.get({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_GM_CLIENT_USERS,
    id: id
  }, function (error, response) {

    let clientUser;

    if (response.found) {
      clientUser = response._source;
      clientUser.id = response._id;
    }

    return callback(error, clientUser);
  });
}
