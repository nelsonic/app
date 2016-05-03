'use strict';

const clientES = require('../../es.js');

module.exports = function (idCandidate, info, callback) {

  clientES.update({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE,
    id: idCandidate,
    body: {doc: {info: info}}
  }, function (err, response) {

    return callback (err, response);
  });
}
