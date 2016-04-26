'use strict';

const clientES = require('../../es.js');

module.exports = function (user, callback) {

  clientES.index({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_GM_USERS,
    body: user
  }, function (errorSave, responseSave) {

    return callback(errorSave, responseSave);
  });
}
