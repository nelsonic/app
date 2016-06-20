'use strict';

const updateLi = require('../../database-helpers/elasticsearch/li/updateLI');

module.exports = function (request, reply) {

  updateLi(request.payload.idCandidate, request.payload.li, function (err, response) {
    // $lab:coverage:off$
    if (err) {
      return reply({code: 500});
    }
    // $lab:coverage:on$
    console.log(request.payload.li);
    return reply({code:200, url: request.payload.li});
  });

}
