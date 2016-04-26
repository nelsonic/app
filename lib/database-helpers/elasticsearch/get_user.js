'use strict';

const clientES = require('../../es.js');

module.exports = function (id, callback) {

  clientES.get({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_GM_USERS,
    id: id
  }, function (error, response) {

    const user = response._source;
    user.id = response._id;

    return callback(error, user);
  });
}
