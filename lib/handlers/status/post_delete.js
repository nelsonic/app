'use strict';

const deleteStatus = require('../../database-helpers/elasticsearch/delete_status');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  } else {

    const status = {
      idCandidate: request.payload.idCandidate,
      timestamp: request.payload.timestamp
    };
    console.log(status);

    deleteStatus(request.payload.idCandidate, status, function (err, response) {

      return reply.redirect('/candidate/' + request.payload.idCandidate);
    });
  }
}
