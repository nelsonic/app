'use strict';

/**
* Update the client user document with the sid when a client create a jwt token
* @param {String} sid - the sid of the client
* @param {String} idClientUser - the id of the client user
* @param {Function} callback - callback with error and response
*/


const clientES = require('../../../es.js');

module.exports = function (sid, idClientUser, callback) {

  clientES.update({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_GM_CLIENT_USERS,
    id: idClientUser,
    body: {
        doc: {
            sid: sid
        }
   }

 }, function (error, response) {

   return callback(error, response);

 })

}
