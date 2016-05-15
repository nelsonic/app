'use strict';

const editStatus = require('../../database-helpers/elasticsearch/edit_status');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  } else {

    const status = {
      idCandidate: request.payload.idCandidate,
      idClient: request.payload.idClient,
      idJob: request.payload.idJob,
      idUser: request.auth.credentials.id,
      idStage: request.payload.idStage,
      timestamp: request.payload.timestamp
    };

    editStatus(request.payload.idCandidate, status, function (err, response) {

      return reply.redirect('/candidate/' + request.payload.idCandidate);
    });
  }
}
