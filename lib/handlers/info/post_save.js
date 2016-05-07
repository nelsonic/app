'use strict';

const updateInfo = require('../../database-helpers/elasticsearch/update_info');

module.exports = function (request, reply) {

  updateInfo(request.payload.idCandidate, request.payload, function (err, response) {
    // $lab:coverage:off$
    if (err) {
      return reply({code: 500});
    }
    // $lab:coverage:on$
    return reply({code:200, info: request.payload});
  });

}
