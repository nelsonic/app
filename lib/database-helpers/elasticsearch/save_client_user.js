'use strict';

/*
* Index clientUser into ES
* @param {Object} clientUser
* @param {String} clientUser.idClient - client id
* @param {String} clientUser.email - client email
* @param {String} clientUser.password - hashed password
* @param {Boolean} clientUser.authorized - true or false
*/

const clientES = require('../../es.js');

module.exports = function (clientUser, callback) {

  clientES.index({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_GM_CLIENT_USERS,
    body: clientUser
  }, function (errorSave, responseSave) {

    return callback(errorSave, responseSave);
  });
}
