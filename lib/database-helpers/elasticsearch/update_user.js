'use strict';

const clientES = require('../../es.js');

module.exports = function (id, user, callback) {

  clientES.update({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_GM_USERS,
    id: id,
    body: {
      doc: user //{names: {fullname: -}, role: -,...}
    }
  }, function (errorUpdate, responseUpdate) {

    return callback(errorUpdate, responseUpdate);
  });
}
