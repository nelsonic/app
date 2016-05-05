'use strict';

const clientES = require('../../es.js');

module.exports = function (id, callback) {

  clientES.get({
    
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_GM_CLIENTS,
    id: id
  }, function (error, response) {

    var client = response._source;
    client.id = response._id;

    return callback(error, client);
  });
}
