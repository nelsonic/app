'use strict';

const clientES = require('../../es.js');

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
